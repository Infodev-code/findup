import mongoose from 'mongoose';
import dns from 'dns';

// Augmenter le timeout DNS pour les connexions lentes
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']); // Utiliser des serveurs DNS publics fiables

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/findup';

if (!MONGODB_URI) {
  throw new Error(
    'Veuillez définir la variable d\'environnement MONGODB_URI dans le fichier .env.local'
  );
}

let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 5000; // 5 secondes

/**
 * Fonction pour se connecter à MongoDB avec mécanisme de reconnexion
 */
async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    const opts = {
      maxPoolSize: 5,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 60000, // Augmenter à 60 secondes
      socketTimeoutMS: 90000, // Augmenter à 90 secondes
      connectTimeoutMS: 60000, // Augmenter à 60 secondes
      family: 4,
      retryWrites: true,
      retryReads: true,
      heartbeatFrequencyMS: 30000, // Réduire la fréquence des heartbeats
      maxIdleTimeMS: 120000, // Augmenter le temps d'inactivité maximum
      autoIndex: true,
      compressors: 'zlib',
      bufferCommands: true
    };

    mongoose.set('strictQuery', true);

    // Attendre que la connexion soit établie
    await mongoose.connect(MONGODB_URI, opts);
    
    // Réinitialiser le compteur de tentatives après une connexion réussie
    reconnectAttempts = 0;
    isConnected = true;
    console.log('Connexion à MongoDB établie avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    
    // Tentative de reconnexion automatique
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      console.log(`Tentative de reconnexion ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} dans ${RECONNECT_INTERVAL/1000} secondes...`);
      
      // Attendre avant de réessayer
      setTimeout(async () => {
        try {
          await dbConnect();
        } catch (reconnectError) {
          console.error('Échec de la tentative de reconnexion:', reconnectError);
        }
      }, RECONNECT_INTERVAL);
    } else {
      console.error(`Échec après ${MAX_RECONNECT_ATTEMPTS} tentatives de reconnexion.`);
      throw error;
    }
  }
}

// Gestion des événements de connexion
mongoose.connection.on('connected', () => {
  console.log('MongoDB connecté');
  isConnected = true;
  reconnectAttempts = 0;
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion MongoDB:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB déconnecté');
  isConnected = false;
  
  // Tentative de reconnexion automatique en cas de déconnexion
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    console.log(`Tentative de reconnexion après déconnexion ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}...`);
    
    setTimeout(async () => {
      try {
        await dbConnect();
      } catch (reconnectError) {
        console.error('Échec de la tentative de reconnexion après déconnexion:', reconnectError);
      }
    }, RECONNECT_INTERVAL);
  }
});

// Gestion de la fermeture propre de la connexion lors de l'arrêt de l'application
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Connexion MongoDB fermée suite à l\'arrêt de l\'application');
  process.exit(0);
});

export default dbConnect; 
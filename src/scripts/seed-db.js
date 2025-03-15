// Script pour initialiser la base de données avec des données de test
const mongoose = require('mongoose');
const { hash } = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

// Définition du schéma utilisateur
const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
    },
    password: { 
      type: String, 
      required: true,
      minlength: 8,
      select: false
    },
    image: { 
      type: String,
      default: 'https://ui-avatars.com/api/?background=random'
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'],
      default: 'user'
    },
    phone: { 
      type: String 
    },
    bio: { 
      type: String 
    },
    education: { 
      type: String 
    },
    skills: { 
      type: String 
    },
    experience: { 
      type: String 
    },
    location: { 
      type: String 
    }
  },
  { 
    timestamps: true 
  }
);

const User = mongoose.model('User', UserSchema);

// Données utilisateurs de test
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'user',
    bio: 'Développeur web passionné',
    skills: 'JavaScript, React, Node.js',
    location: 'Paris, France'
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'admin',
    bio: 'Administrateur de la plateforme',
    skills: 'Gestion de projet, Marketing, SEO',
    location: 'Lyon, France'
  }
];

// Fonction pour initialiser la base de données
const seedDatabase = async () => {
  try {
    // Connexion à la base de données
    await connectDB();

    // Supprimer les utilisateurs existants
    await User.deleteMany({});
    console.log('Utilisateurs supprimés');

    // Créer les nouveaux utilisateurs avec mot de passe hashé
    const usersWithHashedPassword = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await hash(user.password, 12);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insérer les utilisateurs dans la base de données
    await User.insertMany(usersWithHashedPassword);
    console.log('Utilisateurs créés avec succès');

    // Déconnexion de la base de données
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB');

    console.log('Initialisation de la base de données terminée');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

// Exécuter la fonction d'initialisation
seedDatabase(); 
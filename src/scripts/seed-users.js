const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Vérification de la variable d'environnement MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Veuillez définir la variable d\'environnement MONGODB_URI dans le fichier .env.local');
  process.exit(1);
}

// Définition du schéma utilisateur
const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Le nom est requis'] 
    },
    email: { 
      type: String, 
      required: [true, 'L\'email est requis'], 
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
    },
    password: { 
      type: String, 
      required: [true, 'Le mot de passe est requis'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
      select: false // Ne pas inclure par défaut dans les requêtes
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

// Définition du schéma de candidature
const ApplicationSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, 'L\'identifiant de l\'utilisateur est requis']
    },
    jobId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Job',
      required: [true, 'L\'identifiant de l\'offre d\'emploi est requis']
    },
    status: { 
      type: String,
      enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
      default: 'pending'
    },
    coverLetter: { 
      type: String 
    },
    resumeUrl: { 
      type: String 
    },
    notes: { 
      type: String 
    },
    appliedAt: { 
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true 
  }
);

// Définition du schéma d'inscription à une formation
const ModuleProgressSchema = new mongoose.Schema({
  moduleId: { 
    type: String,
    required: true
  },
  completed: { 
    type: Boolean,
    default: false
  },
  completedDate: { 
    type: Date
  }
});

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, 'L\'identifiant de l\'utilisateur est requis']
    },
    formationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Formation',
      required: [true, 'L\'identifiant de la formation est requis']
    },
    status: { 
      type: String,
      enum: ['active', 'completed', 'cancelled', 'paused'],
      default: 'active'
    },
    progress: { 
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    startDate: { 
      type: Date,
      default: Date.now
    },
    completedDate: { 
      type: Date
    },
    lastAccessDate: { 
      type: Date
    },
    moduleProgress: [ModuleProgressSchema],
    certificateUrl: { 
      type: String 
    },
    notes: { 
      type: String 
    }
  },
  { 
    timestamps: true 
  }
);

// Création des modèles
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

// Données de test pour les utilisateurs
const usersData = [
  {
    name: 'Utilisateur Test',
    email: 'user@example.com',
    password: 'password123',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'user',
    phone: '0555123456',
    bio: 'Étudiant passionné par le développement web et mobile.',
    education: 'Licence en Informatique, Université d\'Alger',
    skills: 'JavaScript, React, Node.js, MongoDB',
    experience: '1 an de stage chez TechAlgeria',
    location: 'Alger, Algérie'
  },
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'admin',
    phone: '0555987654',
    bio: 'Administrateur de la plateforme FindUp.',
    education: 'Master en Informatique, École Nationale Supérieure d\'Informatique',
    skills: 'Administration système, Gestion de projet, Développement web',
    experience: '5 ans d\'expérience en tant que développeur full-stack',
    location: 'Alger, Algérie'
  }
];

// Fonction pour se connecter à MongoDB, supprimer les utilisateurs existants et en créer de nouveaux
async function seedUsers() {
  try {
    // Connexion à MongoDB
    console.log('Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion à MongoDB établie avec succès');

    // Suppression des données existantes
    console.log('Suppression des utilisateurs existants...');
    await User.deleteMany({});
    console.log('Utilisateurs existants supprimés avec succès');

    console.log('Suppression des candidatures existantes...');
    await Application.deleteMany({});
    console.log('Candidatures existantes supprimées avec succès');

    console.log('Suppression des inscriptions aux formations existantes...');
    await Enrollment.deleteMany({});
    console.log('Inscriptions aux formations existantes supprimées avec succès');

    // Création des nouveaux utilisateurs avec des mots de passe hachés
    console.log('Création des nouveaux utilisateurs...');
    const saltRounds = 10;
    const usersWithHashedPasswords = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.create(usersWithHashedPasswords);
    console.log(`${createdUsers.length} utilisateurs créés avec succès`);

    // Déconnexion de MongoDB
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB effectuée avec succès');

    console.log('Initialisation de la base de données terminée');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

// Exécution de la fonction d'initialisation
seedUsers(); 
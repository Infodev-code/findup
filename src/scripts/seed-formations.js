// Script pour initialiser la base de données avec des formations de test
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

// Définition du schéma de formation
const FormationSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    description: { 
      type: String, 
      required: true,
      trim: true
    },
    provider: { 
      type: String, 
      required: true,
      trim: true
    },
    image: { 
      type: String,
      required: true
    },
    price: { 
      type: Number,
      default: 0
    },
    duration: { 
      type: Number,
      required: true
    },
    level: { 
      type: String,
      enum: ['débutant', 'intermédiaire', 'avancé'],
      default: 'intermédiaire'
    },
    category: { 
      type: String,
      required: true
    },
    tags: [{ 
      type: String 
    }],
    modules: [{
      name: { type: String, required: true },
      description: { type: String },
      duration: { type: Number },
      completed: { type: Boolean, default: false }
    }],
    requirements: [{ 
      type: String 
    }],
    objectives: [{ 
      type: String 
    }],
    rating: { 
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviewCount: { 
      type: Number,
      default: 0
    },
    enrolledCount: { 
      type: Number,
      default: 0
    },
    startDate: { 
      type: Date 
    },
    endDate: { 
      type: Date 
    },
    isPublished: { 
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true 
  }
);

const Formation = mongoose.model('Formation', FormationSchema);

// Données de formations de test
const formations = [
  {
    title: 'Développement Web Avancé',
    description: 'Apprenez les techniques avancées de développement web avec les dernières technologies et frameworks.',
    provider: 'CodeAcademy',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=200&auto=format&fit=crop',
    price: 0,
    duration: 120,
    level: 'avancé',
    category: 'Développement Web',
    tags: ['JavaScript', 'React', 'Node.js', 'Next.js'],
    modules: [
      { name: 'HTML/CSS Avancé', description: 'Maîtrisez les techniques avancées de HTML5 et CSS3', duration: 10 },
      { name: 'JavaScript ES6+', description: 'Les fonctionnalités modernes de JavaScript', duration: 15 },
      { name: 'React Fondamentaux', description: 'Créer des applications avec React', duration: 20 },
      { name: 'React Hooks & Context', description: 'Gestion d\'état avancée avec React', duration: 15 },
      { name: 'Next.js', description: 'Développement d\'applications React avec Next.js', duration: 20 }
    ],
    requirements: ['Connaissances de base en HTML/CSS', 'Connaissances de base en JavaScript'],
    objectives: ['Maîtriser React et ses écosystèmes', 'Créer des applications web modernes', 'Comprendre les concepts avancés du développement frontend'],
    rating: 4.8,
    reviewCount: 120,
    enrolledCount: 350,
    startDate: new Date('2023-01-10'),
    endDate: new Date('2023-04-10'),
    isPublished: true
  },
  {
    title: 'UI/UX Design',
    description: 'Apprenez à créer des interfaces utilisateur attrayantes et des expériences utilisateur exceptionnelles.',
    provider: 'DesignSchool',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200&auto=format&fit=crop',
    price: 0,
    duration: 80,
    level: 'intermédiaire',
    category: 'Design',
    tags: ['UI', 'UX', 'Figma', 'Adobe XD'],
    modules: [
      { name: 'Principes de design', description: 'Les fondamentaux du design d\'interface', duration: 10 },
      { name: 'Wireframing', description: 'Création de maquettes filaires', duration: 15 },
      { name: 'Prototypage', description: 'Création de prototypes interactifs', duration: 20 },
      { name: 'Tests utilisateurs', description: 'Méthodes de test et d\'amélioration', duration: 15 },
      { name: 'Design System', description: 'Création d\'un système de design cohérent', duration: 20 }
    ],
    requirements: ['Aucune expérience préalable requise', 'Intérêt pour le design'],
    objectives: ['Maîtriser les outils de design modernes', 'Comprendre les principes de l\'UX', 'Créer des interfaces attrayantes et fonctionnelles'],
    rating: 4.9,
    reviewCount: 85,
    enrolledCount: 210,
    startDate: new Date('2022-10-05'),
    endDate: new Date('2022-12-20'),
    isPublished: true
  },
  {
    title: 'React Native',
    description: 'Développez des applications mobiles natives pour iOS et Android avec React Native.',
    provider: 'MobileDevs',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=200&auto=format&fit=crop',
    price: 0,
    duration: 90,
    level: 'intermédiaire',
    category: 'Développement Mobile',
    tags: ['React Native', 'JavaScript', 'Mobile', 'iOS', 'Android'],
    modules: [
      { name: 'Introduction à React Native', description: 'Les bases de React Native', duration: 10 },
      { name: 'Composants natifs', description: 'Utilisation des composants natifs', duration: 15 },
      { name: 'Navigation', description: 'Navigation entre écrans', duration: 20 },
      { name: 'État et API', description: 'Gestion d\'état et appels API', duration: 15 },
      { name: 'Publication d\'applications', description: 'Déploiement sur les stores', duration: 10 }
    ],
    requirements: ['Connaissances en JavaScript', 'Connaissances de base en React'],
    objectives: ['Créer des applications mobiles cross-platform', 'Maîtriser React Native', 'Publier des applications sur les stores'],
    rating: 4.7,
    reviewCount: 65,
    enrolledCount: 180,
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-06-01'),
    isPublished: true
  },
  {
    title: 'Data Science avec Python',
    description: 'Explorez le monde de la data science et de l\'analyse de données avec Python.',
    provider: 'DataLearn',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop',
    price: 0,
    duration: 150,
    level: 'débutant',
    category: 'Data Science',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy'],
    modules: [
      { name: 'Introduction à Python', description: 'Les bases de Python pour la data science', duration: 15 },
      { name: 'Pandas et NumPy', description: 'Manipulation de données avec Pandas et NumPy', duration: 25 },
      { name: 'Visualisation de données', description: 'Création de visualisations avec Matplotlib et Seaborn', duration: 20 },
      { name: 'Machine Learning', description: 'Introduction au machine learning avec scikit-learn', duration: 30 },
      { name: 'Projets pratiques', description: 'Application des connaissances sur des projets réels', duration: 20 }
    ],
    requirements: ['Aucune expérience préalable en programmation requise', 'Connaissances de base en mathématiques'],
    objectives: ['Maîtriser Python pour l\'analyse de données', 'Comprendre les concepts de base du machine learning', 'Créer des visualisations de données pertinentes'],
    rating: 4.6,
    reviewCount: 95,
    enrolledCount: 280,
    startDate: new Date('2023-04-15'),
    endDate: new Date('2023-07-15'),
    isPublished: true
  }
];

// Fonction pour initialiser la base de données
const seedDatabase = async () => {
  try {
    // Connexion à la base de données
    await connectDB();

    // Supprimer les formations existantes
    await Formation.deleteMany({});
    console.log('Formations supprimées');

    // Insérer les nouvelles formations
    await Formation.insertMany(formations);
    console.log('Formations créées avec succès');

    // Déconnexion de la base de données
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB');

    console.log('Initialisation des formations terminée');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des formations:', error);
    process.exit(1);
  }
};

// Exécuter la fonction d'initialisation
seedDatabase(); 
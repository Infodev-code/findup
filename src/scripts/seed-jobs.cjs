// Script pour initialiser la base de données avec des offres d'emploi de test
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Définition du schéma d'offre d'emploi
const JobSchema = new mongoose.Schema(
  {
    numericId: {
      type: Number,
      required: true,
      unique: true
    },
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    company: { 
      type: String, 
      required: true,
      trim: true
    },
    logo: { 
      type: String
    },
    location: { 
      type: String,
      required: true
    },
    type: { 
      type: String,
      enum: ['partTime', 'fullTime', 'internship', 'CDI', 'CDD', 'Stage', 'Alternance', 'Freelance'],
      required: true
    },
    category: { 
      type: String,
      required: true
    },
    description: { 
      type: String,
      required: true
    },
    requirements: [{ 
      type: String 
    }],
    responsibilities: [{ 
      type: String 
    }],
    benefits: [{ 
      type: String 
    }],
    salary: { 
      type: String,
      required: true
    },
    contactEmail: { 
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
    },
    applicationDeadline: { 
      type: Date 
    },
    isRemote: { 
      type: Boolean,
      default: false
    },
    experienceLevel: { 
      type: String,
      enum: ['junior', 'intermédiaire', 'senior', 'expert', 'aucun'],
      required: true
    },
    tags: [{ 
      type: String 
    }],
    isActive: { 
      type: Boolean,
      default: true
    },
    views: { 
      type: Number,
      default: 0
    },
    applicationsCount: { 
      type: Number,
      default: 0
    },
    posted: {
      type: String
    },
    companyInfo: {
      name: {
        type: String,
        required: true
      },
      logo: {
        type: String,
        required: true
      },
      coverImage: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      website: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      industry: {
        type: String,
        required: true
      }
    }
  },
  { 
    timestamps: true 
  }
);

// Création du modèle
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

// Données des offres d'emploi
const jobsData = [
  {
    numericId: 1,
    title: 'Serveur / Serveuse',
    company: 'Café Délices',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
    location: 'Alger, Algérie',
    type: 'partTime',
    category: 'Restauration',
    salary: '2200 DZD/h',
    posted: '2 jours',
    description: 'Nous recherchons un serveur ou une serveuse pour notre café. Horaires flexibles, ambiance conviviale. Aucune expérience requise, formation assurée.',
    responsibilities: [
      'Accueillir les clients et les installer à leur table',
      'Prendre les commandes et les transmettre à la cuisine',
      'Servir les boissons et les plats',
      'Encaisser les paiements',
      'Maintenir la propreté de la salle'
    ],
    requirements: [
      'Aucun diplôme requis',
      'Bonne présentation et sens du relationnel',
      'Capacité à travailler en équipe',
      'Dynamisme et réactivité',
      'Disponibilité les week-ends (en rotation)'
    ],
    benefits: [
      'Horaires flexibles adaptables à vos contraintes',
      'Repas offerts pendant le service',
      'Ambiance de travail conviviale',
      'Pourboires partagés entre le personnel',
      'Possibilité d\'évolution vers un poste de responsable'
    ],
    experienceLevel: 'aucun',
    isRemote: false,
    isActive: true,
    tags: ['service', 'restauration', 'café', 'temps partiel'],
    applicationDeadline: new Date('2023-06-30'),
    companyInfo: {
      name: 'Café Délices',
      logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2000&auto=format&fit=crop',
      description: 'Le Café Délices est un établissement convivial situé au cœur d\'Alger, proposant des boissons, pâtisseries et plats légers dans une ambiance chaleureuse. Ouvert depuis 2018, notre café est devenu un lieu de rencontre apprécié des habitants du quartier.',
      website: 'https://cafe-delices.dz',
      size: '10-20',
      industry: 'Restauration & Café'
    }
  },
  {
    numericId: 2,
    title: 'Vendeur / Vendeuse en Boutique',
    company: 'ModaStyle',
    logo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop',
    location: 'Oran, Algérie',
    type: 'partTime',
    category: 'Commerce',
    salary: '2000 DZD/h',
    posted: '1 semaine',
    description: 'Rejoignez notre équipe de vente pour conseiller les clients et gérer les stocks. Aucun diplôme requis, sens du service client apprécié.',
    responsibilities: [
      'Accueillir et conseiller les clients',
      'Gérer les stocks et le réapprovisionnement',
      'Maintenir la présentation du magasin',
      'Participer aux ventes et promotions',
      'Assurer l\'encaissement'
    ],
    requirements: [
      'Aucun diplôme requis',
      'Sens du service client',
      'Bonne présentation',
      'Dynamisme et esprit d\'équipe',
      'Disponibilité flexible'
    ],
    benefits: [
      'Horaires adaptés aux étudiants',
      'Réductions sur les produits',
      'Formation continue',
      'Environnement de travail dynamique',
      'Possibilité d\'évolution'
    ],
    experienceLevel: 'aucun',
    isRemote: false,
    isActive: true,
    tags: ['vente', 'commerce', 'boutique', 'temps partiel', 'oran'],
    applicationDeadline: new Date('2023-06-30'),
    companyInfo: {
      name: 'ModaStyle',
      logo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop',
      description: 'ModaStyle est une boutique de vêtements tendance située à Oran. Nous proposons des collections pour hommes et femmes, avec un accent sur la mode accessible et de qualité. Notre équipe dynamique est passionnée par la mode et le service client.',
      website: 'https://modastyle-dz.com',
      size: '10-20',
      industry: 'Mode & Retail'
    }
  },
  {
    numericId: 3,
    title: 'Caissier / Caissière en Supermarché',
    company: 'SuperMarché Plus',
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop',
    location: 'Constantine, Algérie',
    type: 'partTime',
    category: 'Commerce',
    salary: '1900 DZD/h',
    posted: '3 jours',
    description: 'Poste de caissier(ère) disponible immédiatement. Formation assurée sur place. Horaires flexibles adaptés aux étudiants.',
    responsibilities: [
      'Accueillir les clients avec courtoisie',
      'Scanner les articles et encaisser les paiements',
      'Gérer la caisse et les moyens de paiement',
      'Assister les clients pour l\'emballage',
      'Participer au rangement du magasin en fin de journée'
    ],
    requirements: [
      'Aucune expérience requise, formation assurée',
      'Sens du service client',
      'Rigueur et honnêteté',
      'Capacité à travailler en équipe',
      'Disponibilité les week-ends (en alternance)'
    ],
    benefits: [
      'Horaires flexibles compatibles avec les études',
      'Prime de panier',
      'Réductions sur les achats',
      'Environnement de travail dynamique',
      'Possibilité d\'évolution interne'
    ],
    experienceLevel: 'aucun',
    isRemote: false,
    isActive: true,
    tags: ['caisse', 'commerce', 'supermarché', 'temps partiel', 'constantine'],
    applicationDeadline: new Date('2023-06-30'),
    companyInfo: {
      name: 'SuperMarché Plus',
      logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2000&auto=format&fit=crop',
      description: 'SuperMarché Plus est une chaîne de distribution alimentaire présente dans plusieurs villes d\'Algérie. Notre enseigne propose une large gamme de produits alimentaires et non-alimentaires à des prix compétitifs, dans un environnement moderne et accueillant.',
      website: 'https://supermarcheplus.dz',
      size: '50-100',
      industry: 'Grande distribution'
    }
  },
  {
    numericId: 4,
    title: 'Assistant Marketing Digital',
    company: 'TechStart',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop',
    location: 'Alger, Algérie',
    type: 'partTime',
    category: 'Marketing & Communication',
    salary: '2500 DZD/h',
    posted: '4 jours',
    description: 'Nous recherchons un étudiant en marketing ou communication pour assister notre équipe dans la gestion des réseaux sociaux et des campagnes publicitaires.',
    responsibilities: [
      'Gérer les réseaux sociaux de l\'entreprise',
      'Créer du contenu engageant',
      'Assister dans la mise en place de campagnes publicitaires',
      'Analyser les performances des actions marketing',
      'Participer aux réunions d\'équipe'
    ],
    requirements: [
      'Étudiant en marketing, communication ou domaine connexe',
      'Maîtrise des réseaux sociaux',
      'Bonnes compétences rédactionnelles',
      'Créativité et sens de l\'organisation',
      'Connaissance des outils d\'analyse web (Google Analytics, etc.)'
    ],
    benefits: [
      'Horaires flexibles adaptés aux études',
      'Possibilité de télétravail partiel',
      'Environnement startup dynamique',
      'Formation continue',
      'Opportunités d\'évolution'
    ],
    experienceLevel: 'junior',
    isRemote: true,
    isActive: true,
    tags: ['marketing digital', 'réseaux sociaux', 'communication', 'temps partiel', 'alger'],
    applicationDeadline: new Date('2023-06-30'),
    companyInfo: {
      name: 'TechStart',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
      description: 'TechStart est une startup technologique basée à Alger, spécialisée dans le développement d\'applications mobiles et web innovantes. Notre équipe jeune et dynamique travaille sur des projets variés pour des clients locaux et internationaux.',
      website: 'https://techstart-dz.com',
      size: '10-30',
      industry: 'Technologie & Startups'
    }
  },
  {
    numericId: 5,
    title: 'Développeur Web Junior',
    company: 'WebSolutions',
    logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop',
    location: 'Oran, Algérie',
    type: 'partTime',
    category: 'Informatique',
    salary: '2800 DZD/h',
    posted: '1 semaine',
    description: 'Poste pour étudiant en informatique. Développement d\'interfaces utilisateur avec HTML, CSS et JavaScript. Connaissances en React appréciées.',
    responsibilities: [
      'Développer des interfaces utilisateur avec HTML, CSS et JavaScript',
      'Intégrer des maquettes fournies par l\'équipe design',
      'Participer à l\'amélioration de sites web existants',
      'Tester et déboguer les applications',
      'Collaborer avec l\'équipe de développement'
    ],
    requirements: [
      'Étudiant en informatique ou formation équivalente',
      'Connaissances en HTML, CSS et JavaScript',
      'Notions de base en React appréciées',
      'Capacité à travailler en équipe',
      'Disponibilité de 15-20h par semaine'
    ],
    benefits: [
      'Horaires flexibles compatibles avec vos études',
      'Possibilité de télétravail partiel',
      'Environnement de travail moderne et stimulant',
      'Opportunités d\'apprentissage et de développement professionnel',
      'Possibilité d\'embauche à temps plein après les études'
    ],
    experienceLevel: 'junior',
    isRemote: true,
    isActive: true,
    tags: ['développement web', 'frontend', 'javascript', 'react', 'temps partiel'],
    applicationDeadline: new Date('2023-06-30'),
    companyInfo: {
      name: 'WebSolutions',
      logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2000&auto=format&fit=crop',
      description: 'WebSolutions est une entreprise spécialisée dans le développement web et mobile basée à Oran. Fondée en 2018, nous travaillons avec des clients locaux et internationaux pour créer des solutions digitales innovantes.',
      website: 'https://websolutions-algerie.dz',
      size: '20-50',
      industry: 'Développement Web & Mobile'
    }
  },
  {
    numericId: 6,
    title: 'Chargé(e) de Communication',
    company: 'MediaGroup',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
    location: 'Constantine, Algérie',
    type: 'partTime',
    category: 'Marketing & Communication',
    salary: '2600 DZD/h',
    posted: '5 jours',
    description: 'Nous recherchons un(e) étudiant(e) en communication ou journalisme pour gérer nos réseaux sociaux et créer du contenu engageant pour notre audience.',
    responsibilities: [
      'Gérer les comptes de réseaux sociaux de l\'entreprise',
      'Créer du contenu engageant (textes, images, vidéos)',
      'Analyser les performances des publications',
      'Participer à l\'élaboration de la stratégie de communication',
      'Rédiger des articles pour le blog de l\'entreprise'
    ],
    requirements: [
      'Étudiant(e) en communication, journalisme ou marketing',
      'Excellentes compétences rédactionnelles',
      'Maîtrise des réseaux sociaux (Instagram, Facebook, LinkedIn, TikTok)',
      'Créativité et sens de l\'organisation',
      'Disponibilité de 15-20h par semaine'
    ],
    benefits: [
      'Horaires flexibles compatibles avec vos études',
      'Possibilité de télétravail partiel',
      'Environnement de travail moderne et stimulant',
      'Opportunités d\'apprentissage et de développement professionnel',
      'Possibilité d\'embauche à temps plein après les études'
    ],
    experienceLevel: 'junior',
    isRemote: true,
    isActive: true,
    tags: ['communication', 'réseaux sociaux', 'marketing digital', 'rédaction', 'temps partiel'],
    applicationDeadline: new Date('2023-06-30'),
    companyInfo: {
      name: 'MediaGroup',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2000&auto=format&fit=crop',
      description: 'MediaGroup est une agence de communication et de marketing digital basée à Constantine. Fondée en 2019, nous travaillons avec des clients de divers secteurs pour améliorer leur présence en ligne et leur stratégie de communication.',
      website: 'https://mediagroup-dz.com',
      size: '10-30',
      industry: 'Communication & Marketing Digital'
    }
  }
];

// Fonction pour insérer les données
async function seedJobs() {
  try {
    // Supprimer les données existantes
    await Job.deleteMany({});
    console.log('Anciennes données supprimées');

    // Insérer les nouvelles données
    const result = await Job.insertMany(jobsData);
    console.log(`${result.length} offres d'emploi insérées avec succès`);

    // Fermer la connexion
    mongoose.connection.close();
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données:', error);
    mongoose.connection.close();
  }
}

// Exécuter la fonction
seedJobs();
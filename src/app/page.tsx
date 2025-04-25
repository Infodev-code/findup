'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'formations' | 'jobs'>('formations');
  const [isLoaded, setIsLoaded] = useState(false);

  // Données pour les formations
  const formations = [
    {
      id: 1,
      title: "Formation Développement Web",
      category: "Développement Web",
      level: "Intermédiaire",
      price: "25000 DZD",
      duration: "6 mois",
      students: "1250",
      description: "Apprenez HTML, CSS, JavaScript et React pour créer des sites web modernes et réactifs.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Formation Data Science",
      category: "Data & IA",
      level: "Avancé",
      price: "30000 DZD",
      duration: "8 mois",
      students: "850",
      description: "Maîtrisez Python, Pandas, et les algorithmes de Machine Learning pour l'analyse de données.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Design UX/UI",
      category: "Design",
      level: "Débutant",
      price: "20000 DZD",
      duration: "4 mois",
      students: "720",
      description: "Concevez des interfaces utilisateur attrayantes et fonctionnelles avec Figma et Adobe XD.",
      image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  // Données pour les jobs
  const jobs = [
    {
      id: 5,
      title: "Développeur Web Junior",
      company: "WebSolutions",
      type: "Temps partiel",
      salary: "2800 DZD/h",
      location: "Oran, Algérie",
      posted: "1 semaine",
      description: "Poste pour étudiant en informatique. Développement d'interfaces utilisateur avec HTML, CSS et JavaScript. Connaissances en React appréciées.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Assistant Marketing Digital",
      company: "TechStart",
      type: "Temps partiel",
      salary: "2500 DZD/h",
      location: "Alger, Algérie",
      posted: "4 jours",
      description: "Nous recherchons un étudiant en marketing ou communication pour assister notre équipe dans la gestion des réseaux sociaux et des campagnes publicitaires.",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Chargé(e) de Communication",
      company: "MediaGroup",
      type: "Temps partiel",
      salary: "2600 DZD/h",
      location: "Constantine, Algérie",
      posted: "5 jours",
      description: "Nous recherchons un(e) étudiant(e) en communication ou journalisme pour gérer nos réseaux sociaux et créer du contenu engageant pour notre audience.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // Effet pour s'assurer que les composants sont correctement chargés
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Variantes d'animation pour les conteneurs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1
      }
    }
  };
  
  // Variantes d'animation pour les cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - Nouveau design moderne */}
      <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden pt-16 pb-16 md:pt-20 md:pb-24">
        {/* Fond avec gradient et formes géométriques */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/40 to-secondary-100/40 dark:from-primary-900/20 dark:to-secondary-900/20"></div>
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl"></div>
          
          {/* Motifs géométriques */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-primary-200 dark:border-primary-800 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-secondary-200 dark:border-secondary-800 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-primary-300 dark:border-primary-700 rounded-full opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            {/* Badge supérieur */}
            <div className="mb-10 text-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Plateforme n°1 des étudiants algériens
              </span>
            </div>
            
            {/* Section du titre avec étiquettes sur les côtés */}
            <div className="w-full mb-16 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4">
                {/* Colonne gauche - Étiquettes */}
                <div className="lg:col-span-3">
                  <div className="flex flex-col items-center lg:items-start gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Formations</div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">universités partenaires</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Titre central */}
                <div className="lg:col-span-6 text-center">
                  <h1 className="mb-6">
                    <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                      Développez vos compétences
                    </div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-400 to-secondary-600">
                      Construisez votre avenir
                    </div>
              </h1>
                </div>
                
                {/* Colonne droite - Étiquettes */}
                <div className="lg:col-span-3">
                  <div className="flex flex-col items-center lg:items-end gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-secondary-50 flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">200+</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Offres d'emploi</div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">1200+</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Étudiants actifs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Témoignages */}
            <div className="w-full mb-12 relative">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                {/* Carte flottante d'étudiant */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="lg:ml-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Sara, 22 ans</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Étudiante en informatique</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                    "FindUP m'a permis de trouver un job étudiant idéalement adapté à mon emploi du temps universitaire."
                  </div>
                </motion.div>
                
                {/* Carte flottante de certificat */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="lg:mr-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Certification UX/UI</div>
                      <div className="text-xs text-primary-600 dark:text-primary-400">92% de réussite</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-1">
                    <div className="w-1/3 h-1 rounded-full bg-primary-500"></div>
                    <div className="w-1/3 h-1 rounded-full bg-primary-500"></div>
                    <div className="w-1/3 h-1 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/formations" 
                className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full group hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="flex items-center">
                  Explorer les formations
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                </Link>
              
              <Link 
                href="/jobs" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="flex items-center">
                  Voir les offres
                  <svg className="w-5 h-5 ml-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                </Link>
            </div>

            {/* Image principale */}
            <div className="w-full max-w-4xl relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800"
              >
                <div className="aspect-w-21 aspect-h-9">
                <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                    alt="Étudiants collaborant"
                  fill
                  priority={true}
                  quality={90}
                  className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent"></div>
                
                {/* Badge sur l'image */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full py-1 px-3 shadow-md flex items-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-300">4.9/5 satisfaction</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Séparateur ondulé */}
        <div className="absolute bottom-0 left-0 right-0 h-12 text-white dark:text-gray-900">
          <svg className="absolute bottom-0 fill-current w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74">
            <path d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Découvrez nos opportunités</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Des formations et des jobs adaptés à vos besoins et à votre emploi du temps
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full shadow-sm p-1 bg-gray-100 dark:bg-gray-800">
              <button
                onClick={() => setActiveTab('formations')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === 'formations'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                Formations
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === 'jobs'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                Jobs Étudiants
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {activeTab === 'formations' && (
              <motion.div 
                key="formations-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {formations.map((formation, index) => (
                  <motion.div
                    key={formation.id}
                    variants={cardVariants}
                    custom={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer relative h-full border border-gray-200 dark:border-gray-700 flex flex-col max-w-sm mx-auto"
                  >
                    <Link href={`/formations/${formation.id}`} className="absolute inset-0 w-full h-full z-10">
                      <span className="sr-only">Voir les détails de {formation.title}</span>
                    </Link>
                    <div className="relative">
                      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <Image 
                          src={formation.image} 
                          alt={formation.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority={index < 2}
                        />
                      </div>
                      <div className="absolute top-3 left-3 z-20">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full">
                          {formation.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{formation.title}</h3>
                      <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formation.duration}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Niveau {formation.level}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                        {formation.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">4.8</span>
                          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({formation.students})</span>
                        </div>
                        <span className="font-bold text-primary-600 dark:text-primary-400">{formation.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div
                key="jobs-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    variants={cardVariants}
                    custom={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer relative h-full border border-gray-200 dark:border-gray-700 flex flex-col max-w-sm mx-auto"
                  >
                    <Link href={`/jobs/${job.id}`} className="absolute inset-0 w-full h-full z-10">
                      <span className="sr-only">Voir les détails de {job.title}</span>
                    </Link>
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <Image 
                          src={job.image} 
                          alt={job.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority={index < 2}
                        />
                      </div>
                      <div className="absolute top-3 left-3 z-20">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300 rounded-full">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{job.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">{job.company}</p>
                      <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Publié il y a {job.posted}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                        {job.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                            {job.type === 'Stage' ? 'Stage' : job.type === 'Temps plein' ? 'Temps plein' : 'Temps partiel'}
                          </span>
                        </div>
                        <span className="font-bold text-primary-600 dark:text-primary-400">{job.salary}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-12">
            <Link 
              href={activeTab === 'formations' ? '/formations' : '/jobs'} 
              className="px-8 py-3 text-base font-medium rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg transition-all"
            >
              Voir toutes les {activeTab === 'formations' ? 'formations' : 'offres'}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Pourquoi choisir FindUp ?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Nous vous offrons les meilleurs outils pour réussir votre parcours académique et professionnel
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={cardVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Formations de qualité</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Accédez à des formations sélectionnées et vérifiées par notre équipe d'experts.
              </p>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Jobs flexibles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Trouvez des emplois adaptés à votre emploi du temps d'étudiant.
              </p>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Communauté active</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rejoignez une communauté d'étudiants et de professionnels pour échanger et progresser.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer votre parcours ?</h2>
          <p className="text-xl text-white/80 mb-8">
            Inscrivez-vous gratuitement et accédez à toutes nos fonctionnalités
          </p>
          <Link 
            href="/auth/register" 
            className="px-8 py-3 text-base font-medium rounded-full bg-white text-primary-600 hover:bg-gray-100 transition-colors"
          >
            S'inscrire maintenant
          </Link>
        </div>
      </section>
    </main>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'formations' | 'jobs'>('formations');
  const [isLoaded, setIsLoaded] = useState(false);

  // Effet pour s'assurer que les composants sont correctement chargés
  useEffect(() => {
    // Marquer comme chargé après le montage du composant
    setIsLoaded(true);
    
    // Forcer un rafraîchissement des images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Déclencher un rechargement si l'image est déjà dans le cache
      if (img.complete) {
        const src = img.src;
        img.src = '';
        img.src = src;
      }
    });
    
    // Nettoyer lors du démontage
    return () => {
      setIsLoaded(false);
    };
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

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                <span className="block">Trouvez votre voie avec</span>
                <span className="block bg-clip-text text-transparent bg-white">FindUp</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto md:mx-0 text-xl">
                La plateforme qui connecte les étudiants algériens avec des formations de qualité et des opportunités d'emploi.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/formations" className="px-8 py-3 text-base font-medium rounded-full bg-white text-primary-600 hover:bg-gray-100 transition-colors">
                  Explorer les formations
                </Link>
                <Link href="/jobs" className="px-8 py-3 text-base font-medium rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors">
                  Voir les jobs
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden"
                style={{ position: 'relative' }}
              >
                {isLoaded && (
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Étudiants travaillant ensemble"
                    fill
                    priority={true}
                    loading="eager"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzNiODJmNiIvPjwvc3ZnPg=="
                    onLoad={() => {
                      // Assurer que l'image est bien chargée
                      if (!isLoaded) setIsLoaded(true);
                    }}
                  />
                )}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-primary-600 animate-pulse"></div>
                )}
              </motion.div>
            </div>
          </div>
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
                animate={isLoaded ? "visible" : "hidden"}
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
                      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700" style={{ position: 'relative' }}>
                        {isLoaded && (
                          <Image 
                            src={formation.image} 
                            alt={formation.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority={index < 2}
                          />
                        )}
                        {!isLoaded && (
                          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                        )}
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
                animate={isLoaded ? "visible" : "hidden"}
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
                      <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700" style={{ position: 'relative' }}>
                        {isLoaded && (
                          <Image 
                            src={job.image} 
                            alt={job.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority={index < 2}
                          />
                        )}
                        {!isLoaded && (
                          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                        )}
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
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'partTime' | 'fullTime' | 'internship'>('all');

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilter('all');
    setSearchTerm('');
  };

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    // La recherche est déjà en temps réel grâce à l'état searchTerm
    // Cette fonction peut être utilisée pour des fonctionnalités supplémentaires
    // comme le focus sur les résultats ou le défilement vers le bas
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Données fictives pour les jobs étudiants
  const jobs = [
    {
      id: 1,
      title: 'Serveur / Serveuse',
      company: 'Café Délices',
      companyLogo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
      location: 'Alger',
      type: 'partTime',
      salary: '2200 DZD/h',
      posted: '2 jours',
      description: 'Nous recherchons un serveur ou une serveuse pour notre café. Horaires flexibles, ambiance conviviale. Aucune expérience requise, formation assurée.',
    },
    {
      id: 2,
      title: 'Vendeur / Vendeuse en Boutique',
      company: 'ModaStyle',
      companyLogo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop',
      location: 'Oran',
      type: 'partTime',
      salary: '2000 DZD/h',
      posted: '1 semaine',
      description: 'Rejoignez notre équipe de vente pour conseiller les clients et gérer les stocks. Aucun diplôme requis, sens du service client apprécié.',
    },
    {
      id: 3,
      title: 'Caissier / Caissière en Supermarché',
      company: 'SuperMarché Plus',
      companyLogo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop',
      location: 'Constantine',
      type: 'partTime',
      salary: '1900 DZD/h',
      posted: '3 jours',
      description: 'Poste de caissier(ère) disponible immédiatement. Formation assurée sur place. Horaires flexibles adaptés aux étudiants.',
    },
    {
      id: 4,
      title: 'Assistant Marketing Digital',
      company: 'TechStart',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop',
      location: 'Alger',
      type: 'partTime',
      salary: '2500 DZD/h',
      posted: '4 jours',
      description: 'Nous recherchons un étudiant en marketing ou communication pour assister notre équipe dans la gestion des réseaux sociaux et des campagnes publicitaires.',
    },
    {
      id: 5,
      title: 'Développeur Web Junior',
      company: 'WebSolutions',
      companyLogo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop',
      location: 'Oran',
      type: 'partTime',
      salary: '2800 DZD/h',
      posted: '1 semaine',
      description: 'Poste pour étudiant en informatique. Développement d\'interfaces utilisateur avec HTML, CSS et JavaScript. Connaissances en React appréciées.',
    },
    {
      id: 6,
      title: 'Chargé(e) de Communication',
      company: 'MediaGroup',
      companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
      location: 'Constantine',
      type: 'partTime',
      salary: '2600 DZD/h',
      posted: '5 jours',
      description: 'Nous recherchons un(e) étudiant(e) en communication ou journalisme pour gérer nos réseaux sociaux et créer du contenu engageant pour notre audience.',
    }
  ];

  // Filtrer les jobs en fonction de la recherche et du filtre
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || job.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Fonction pour obtenir le libellé du type de job
  const getJobTypeLabel = (type: string) => {
    switch(type) {
      case 'partTime': return 'Temps partiel';
      case 'fullTime': return 'Temps plein';
      case 'internship': return 'Stage';
      default: return type;
    }
  };

  // Fonction pour obtenir la couleur du badge en fonction du type de job
  const getJobTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'partTime': return 'bg-secondary-100 text-secondary-800';
      case 'fullTime': return 'bg-primary-100 text-primary-800';
      case 'internship': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Trouvez l'emploi qui vous correspond</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Des opportunités pour tous, avec ou sans diplôme, adaptées à votre emploi du temps
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Rechercher par titre, entreprise ou lieu..."
                    className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-secondary-500 text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button 
                  className="btn-primary bg-white text-secondary-600 hover:bg-gray-100 px-6"
                  onClick={handleSearch}
                >
                  Rechercher
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Filtres</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type de contrat</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="all"
                      name="jobType"
                      type="radio"
                      checked={filter === 'all'}
                      onChange={() => setFilter('all')}
                      className="h-4 w-4 text-secondary-600 focus:ring-secondary-500"
                    />
                    <label htmlFor="all" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Tous les types
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="partTime"
                      name="jobType"
                      type="radio"
                      checked={filter === 'partTime'}
                      onChange={() => setFilter('partTime')}
                      className="h-4 w-4 text-secondary-600 focus:ring-secondary-500"
                    />
                    <label htmlFor="partTime" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Temps partiel
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="fullTime"
                      name="jobType"
                      type="radio"
                      checked={filter === 'fullTime'}
                      onChange={() => setFilter('fullTime')}
                      className="h-4 w-4 text-secondary-600 focus:ring-secondary-500"
                    />
                    <label htmlFor="fullTime" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Temps plein
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="internship"
                      name="jobType"
                      type="radio"
                      checked={filter === 'internship'}
                      onChange={() => setFilter('internship')}
                      className="h-4 w-4 text-secondary-600 focus:ring-secondary-500"
                    />
                    <label htmlFor="internship" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Stage
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={resetFilters}
                  className="text-secondary-600 hover:text-secondary-700 text-sm font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>

          {/* Liste des jobs */}
          <div className="flex-grow">
            <div className="mb-6 flex justify-between items-center">
              <h2 id="results-section" className="text-xl font-bold text-gray-900 dark:text-white">
                {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} disponible{filteredJobs.length > 1 ? 's' : ''}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Trier par: 
                <select className="ml-2 bg-transparent border-0 text-gray-500 dark:text-gray-400 focus:ring-0">
                  <option>Plus récent</option>
                  <option>Salaire (croissant)</option>
                  <option>Salaire (décroissant)</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-md flex-shrink-0 overflow-hidden bg-gray-100">
                            <img 
                              src={job.companyLogo} 
                              alt={job.company} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md mb-2 ${getJobTypeBadgeColor(job.type)}`}>
                              {getJobTypeLabel(job.type)}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                            <div className="mt-1 flex items-center text-gray-600 dark:text-gray-300">
                              <span>{job.company}</span>
                              <span className="mx-2">•</span>
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-secondary-600">{job.salary}</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Publié il y a {job.posted}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600 dark:text-gray-300">{job.description}</p>
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-secondary-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-secondary-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                        <Link href={`/jobs/${job.id}`} className="btn-secondary">
                          Voir les détails
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Aucun résultat trouvé</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
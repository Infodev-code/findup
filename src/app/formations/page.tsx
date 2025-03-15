'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Formations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'development' | 'business' | 'design' | 'languages'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setFilter('all');
    setPriceRange([0, 50000]);
    setDurationFilter('all');
    setSearchTerm('');
  };

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    // La recherche est déjà en temps réel grâce à l'état searchTerm
    // Cette fonction peut être utilisée pour des fonctionnalités supplémentaires
    // comme le focus sur les résultats ou le défilement vers le bas
    const resultsSection = document.getElementById('formations-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Données fictives pour les formations
  const formations = [
    {
      id: 1,
      title: 'Développement Web Fullstack',
      category: 'development',
      price: 25000,
      duration: '6 mois',
      level: 'Intermédiaire',
      rating: 4.8,
      students: 1250,
      instructor: 'Ahmed Benali',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop',
      description: 'Apprenez à créer des applications web complètes avec les technologies modernes comme React, Node.js et MongoDB.'
    },
    {
      id: 2,
      title: 'Marketing Digital',
      category: 'business',
      price: 18000,
      duration: '3 mois',
      level: 'Débutant',
      rating: 4.6,
      students: 980,
      instructor: 'Leila Hadj',
      image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2000&auto=format&fit=crop',
      description: 'Maîtrisez les stratégies de marketing digital pour promouvoir efficacement des produits et services en ligne.'
    },
    {
      id: 3,
      title: 'Design UX/UI',
      category: 'design',
      price: 22000,
      duration: '4 mois',
      level: 'Intermédiaire',
      rating: 4.9,
      students: 750,
      instructor: 'Karim Meziane',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop',
      description: 'Apprenez à concevoir des interfaces utilisateur intuitives et esthétiques pour applications web et mobile.'
    },
    {
      id: 4,
      title: 'Anglais des Affaires',
      category: 'languages',
      price: 15000,
      duration: '3 mois',
      level: 'Débutant à Avancé',
      rating: 4.7,
      students: 1100,
      instructor: 'Sarah Mansouri',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000&auto=format&fit=crop',
      description: 'Améliorez votre anglais professionnel pour exceller dans un environnement de travail international.'
    },
    {
      id: 5,
      title: 'Data Science et Intelligence Artificielle',
      category: 'development',
      price: 30000,
      duration: '8 mois',
      level: 'Avancé',
      rating: 4.9,
      students: 620,
      instructor: 'Mohamed Larbi',
      image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2000&auto=format&fit=crop',
      description: 'Plongez dans le monde de la data science et de l\'IA avec Python, TensorFlow et les techniques d\'analyse avancées.'
    },
    {
      id: 6,
      title: 'Gestion de Projet Agile',
      category: 'business',
      price: 20000,
      duration: '2 mois',
      level: 'Intermédiaire',
      rating: 4.5,
      students: 830,
      instructor: 'Amina Khelifi',
      image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2000&auto=format&fit=crop',
      description: 'Maîtrisez les méthodologies agiles pour gérer efficacement des projets dans un environnement dynamique.'
    },
  ];

  // Filtrer les formations en fonction de la recherche et des filtres
  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filter === 'all' || formation.category === filter;
    
    const matchesPrice = formation.price >= priceRange[0] && formation.price <= priceRange[1];
    
    let matchesDuration = true;
    if (durationFilter !== 'all') {
      const durationInMonths = parseInt(formation.duration.split(' ')[0]);
      if (durationFilter === 'short' && durationInMonths > 3) matchesDuration = false;
      if (durationFilter === 'medium' && (durationInMonths <= 3 || durationInMonths > 6)) matchesDuration = false;
      if (durationFilter === 'long' && durationInMonths <= 6) matchesDuration = false;
    }
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });

  // Fonction pour obtenir le libellé de la catégorie
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'development': return 'Développement';
      case 'business': return 'Business';
      case 'design': return 'Design';
      case 'languages': return 'Langues';
      default: return category;
    }
  };

  // Fonction pour obtenir la couleur du badge en fonction de la catégorie
  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'development': return 'bg-primary-100 text-primary-800';
      case 'business': return 'bg-secondary-100 text-secondary-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'languages': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Développez vos compétences avec nos formations</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Des formations de qualité pour booster votre carrière et réaliser vos ambitions
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary-500 text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button 
                  className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-6"
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
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="all"
                      name="category"
                      type="radio"
                      checked={filter === 'all'}
                      onChange={() => setFilter('all')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="all" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Toutes les catégories
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="development"
                      name="category"
                      type="radio"
                      checked={filter === 'development'}
                      onChange={() => setFilter('development')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="development" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Développement
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="business"
                      name="category"
                      type="radio"
                      checked={filter === 'business'}
                      onChange={() => setFilter('business')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="business" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Business
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="design"
                      name="category"
                      type="radio"
                      checked={filter === 'design'}
                      onChange={() => setFilter('design')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="design" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Design
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="languages"
                      name="category"
                      type="radio"
                      checked={filter === 'languages'}
                      onChange={() => setFilter('languages')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="languages" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Langues
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prix (DZD)</h3>
                <div className="mt-2 px-1">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>{priceRange[0]} DZD</span>
                    <span>{priceRange[1]} DZD</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Durée</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="duration-all"
                      name="duration"
                      type="radio"
                      checked={durationFilter === 'all'}
                      onChange={() => setDurationFilter('all')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="duration-all" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Toutes les durées
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="duration-short"
                      name="duration"
                      type="radio"
                      checked={durationFilter === 'short'}
                      onChange={() => setDurationFilter('short')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="duration-short" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Court (1-3 mois)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="duration-medium"
                      name="duration"
                      type="radio"
                      checked={durationFilter === 'medium'}
                      onChange={() => setDurationFilter('medium')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="duration-medium" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Moyen (4-6 mois)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="duration-long"
                      name="duration"
                      type="radio"
                      checked={durationFilter === 'long'}
                      onChange={() => setDurationFilter('long')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="duration-long" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Long (7+ mois)
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={resetFilters}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>

          {/* Liste des formations */}
          <div className="flex-grow">
            <div className="mb-6 flex justify-between items-center">
              <h2 id="formations-results" className="text-xl font-bold text-gray-900 dark:text-white">
                {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} disponible{filteredFormations.length > 1 ? 's' : ''}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Trier par: 
                <select className="ml-2 bg-transparent border-0 text-gray-500 dark:text-gray-400 focus:ring-0">
                  <option>Popularité</option>
                  <option>Prix (croissant)</option>
                  <option>Prix (décroissant)</option>
                  <option>Durée</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormations.length > 0 ? (
                filteredFormations.map((formation) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 group cursor-pointer relative"
                  >
                    <Link href={`/formations/${formation.id}`} className="absolute inset-0 w-full h-full z-10">
                      <span className="sr-only">Voir les détails de {formation.title}</span>
                    </Link>
                    <div className="relative">
                      <div className="h-52 overflow-hidden">
                        <img 
                          src={formation.image} 
                          alt={formation.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${getCategoryBadgeColor(formation.category)}`}>
                          {getCategoryLabel(formation.category)}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md z-20">
                        <div className="flex items-center px-2 py-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{formation.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{formation.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3 flex-grow">
                        {formation.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center mr-4 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
                          <svg className="w-4 h-4 mr-1 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formation.duration}
                        </div>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
                          <svg className="w-4 h-4 mr-1 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {formation.students}
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between relative z-20">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Prix</span>
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{formation.price} DZD</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
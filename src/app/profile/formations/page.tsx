'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

export default function Formations() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const progressControls = useAnimation();
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatedItems = useRef<Set<number>>(new Set());

  // Rediriger si non connecté
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/profile/formations');
    }
  }, [status, router]);

  // Données fictives pour les formations
  const formations = [
    {
      id: '1',
      title: 'Développement Web Avancé',
      provider: 'CodeAcademy',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=200&auto=format&fit=crop',
      progress: 75,
      startDate: '2023-01-10',
      endDate: '2023-04-10',
      status: 'in_progress',
      modules: [
        { name: 'HTML/CSS Avancé', completed: true },
        { name: 'JavaScript ES6+', completed: true },
        { name: 'React Fondamentaux', completed: true },
        { name: 'React Hooks & Context', completed: false },
        { name: 'Next.js', completed: false },
      ],
      nextLesson: {
        title: 'Utilisation des Hooks avancés',
        date: '2023-03-15',
        time: '14:00'
      }
    },
    {
      id: '2',
      title: 'UI/UX Design',
      provider: 'DesignSchool',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200&auto=format&fit=crop',
      progress: 100,
      startDate: '2022-10-05',
      endDate: '2022-12-20',
      status: 'completed',
      modules: [
        { name: 'Principes de design', completed: true },
        { name: 'Wireframing', completed: true },
        { name: 'Prototypage', completed: true },
        { name: 'Tests utilisateurs', completed: true },
        { name: 'Design System', completed: true },
      ],
      certificate: {
        id: 'CERT-UX-123456',
        issueDate: '2022-12-22'
      }
    },
    {
      id: '3',
      title: 'React Native',
      provider: 'MobileDevs',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=200&auto=format&fit=crop',
      progress: 30,
      startDate: '2023-03-01',
      endDate: '2023-06-01',
      status: 'in_progress',
      modules: [
        { name: 'Introduction à React Native', completed: true },
        { name: 'Composants natifs', completed: true },
        { name: 'Navigation', completed: false },
        { name: 'État et API', completed: false },
        { name: 'Publication d\'applications', completed: false },
      ],
      nextLesson: {
        title: 'Navigation entre écrans',
        date: '2023-03-18',
        time: '10:00'
      }
    },
    {
      id: '4',
      title: 'Data Science avec Python',
      provider: 'DataLearn',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop',
      progress: 0,
      startDate: '2023-04-15',
      endDate: '2023-07-15',
      status: 'not_started',
      modules: [
        { name: 'Introduction à Python', completed: false },
        { name: 'Pandas et NumPy', completed: false },
        { name: 'Visualisation de données', completed: false },
        { name: 'Machine Learning', completed: false },
        { name: 'Projets pratiques', completed: false },
      ],
      nextLesson: {
        title: 'Introduction à Python pour la Data Science',
        date: '2023-04-15',
        time: '09:00'
      }
    }
  ];

  // Filtrer les formations selon le statut
  const filteredFormations = filter === 'all' 
    ? formations 
    : formations.filter(formation => formation.status === filter);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminée';
      case 'in_progress': return 'En cours';
      case 'not_started': return 'À commencer';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'not_started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  useEffect(() => {
    const observers = progressRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animatedItems.current.has(index)) {
              // Marquer cet élément comme déjà animé
              animatedItems.current.add(index);
              
              // Déclencher l'animation
              progressControls.start((i) => {
                if (i === index) {
                  return {
                    width: `${filteredFormations[index].progress}%`,
                    transition: { duration: 1, ease: "easeOut" }
                  };
                }
                return {};
              });
              
              // Arrêter d'observer cet élément une fois qu'il a été animé
              observer.unobserve(ref);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [filteredFormations, progressControls]);

  // Réinitialiser les animations lorsque le filtre change
  useEffect(() => {
    animatedItems.current.clear();
  }, [filter]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mes formations</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Suivez votre progression dans les formations auxquelles vous êtes inscrit
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/formations" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Découvrir plus de formations
            </Link>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'all'
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'in_progress'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            En cours
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'completed'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Terminées
          </button>
          <button
            onClick={() => setFilter('not_started')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'not_started'
                ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            À commencer
          </button>
        </div>

        {/* Liste des formations */}
        {filteredFormations.length > 0 ? (
          <div className="space-y-6">
            {filteredFormations.map((formation, index) => (
              <div 
                key={formation.id} 
                className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 relative">
                      <Image
                        src={formation.image}
                        alt={formation.title}
                        fill
                        className="rounded-md object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {formation.title}
                        </h2>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(formation.status)}`}>
                          {getStatusLabel(formation.status)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{formation.provider}</span>
                        <span className="mx-1">•</span>
                        <span>
                          {new Date(formation.startDate).toLocaleDateString('fr-FR')} - {new Date(formation.endDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progression */}
                  <div className="mt-4" ref={el => {
                    progressRefs.current[index] = el;
                  }}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Progression</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{formation.progress}%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={progressControls}
                        custom={index}
                        className="h-2.5 rounded-full bg-primary-600"
                      />
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modules</h3>
                    <ul className="space-y-2">
                      {formation.modules.map((module, index) => (
                        <li key={index} className="flex items-center">
                          <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                            module.completed 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            {module.completed ? (
                              <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            )}
                          </div>
                          <span className={`ml-2 text-sm ${
                            module.completed 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {module.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prochaine leçon ou certificat */}
                  {formation.status !== 'completed' && formation.nextLesson && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Prochaine leçon</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{formation.nextLesson.title}</span> - {new Date(formation.nextLesson.date).toLocaleDateString('fr-FR')} à {formation.nextLesson.time}
                      </p>
                    </div>
                  )}

                  {formation.status === 'completed' && formation.certificate && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Certificat</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        ID: {formation.certificate.id} - Délivré le {new Date(formation.certificate.issueDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex justify-end space-x-3">
                    <Link
                      href={`/formations/${formation.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Détails
                    </Link>
                    {formation.status === 'in_progress' && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        Continuer
                      </button>
                    )}
                    {formation.status === 'not_started' && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        Commencer
                      </button>
                    )}
                    {formation.status === 'completed' && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Télécharger le certificat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Aucune formation trouvée</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {filter === 'all' 
                ? "Vous n'êtes inscrit à aucune formation pour le moment." 
                : `Vous n'avez pas de formation avec le statut "${getStatusLabel(filter)}".`}
            </p>
            <div className="mt-6">
              <Link
                href="/formations"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Découvrir les formations
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function FormationDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const id = params.id;

  // Sections pour la navigation
  const sections = [
    { id: 'description', label: 'Description' },
    { id: 'programme', label: 'Programme' },
    { id: 'formateur', label: 'Formateur' },
    { id: 'inscription', label: 'Inscription' }
  ];

  // Dans une application réelle, vous récupéreriez les données de la formation depuis une API
  const formation = {
    id,
    title: `Développement Web`,
    category: 'Développement Web',
    duration: '6 mois',
    level: 'Intermédiaire',
    price: '25000 DZD',
    rating: '4.8',
    students: '1250',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop',
    description: `Cette formation complète en développement web vous permettra d'acquérir toutes les compétences nécessaires pour créer des sites web modernes et des applications web interactives. Vous apprendrez les langages fondamentaux du web (HTML, CSS, JavaScript), ainsi que les frameworks et bibliothèques les plus demandés sur le marché du travail.

    Que vous soyez débutant ou que vous ayez déjà des bases en programmation, notre programme structuré vous guidera pas à pas vers la maîtrise des technologies web actuelles. Vous réaliserez de nombreux projets pratiques qui enrichiront votre portfolio et vous prépareront efficacement au monde professionnel.`,
    program: [
      {
        title: 'Module 1: Fondamentaux du web',
        content: 'HTML5, CSS3, principes de design responsive',
        icon: 'https://img.icons8.com/fluency/96/000000/html-5.png'
      },
      {
        title: 'Module 2: JavaScript moderne',
        content: 'ES6+, manipulation du DOM, asynchrone',
        icon: 'https://img.icons8.com/color/96/000000/javascript--v1.png'
      },
      {
        title: 'Module 3: Frameworks frontend',
        content: 'React.js, composants, état, hooks',
        icon: 'https://img.icons8.com/plasticine/100/000000/react.png'
      },
      {
        title: 'Module 4: Backend avec Node.js',
        content: 'Express, API REST, authentification',
        icon: 'https://img.icons8.com/fluency/96/000000/node-js.png'
      },
      {
        title: 'Module 5: Bases de données',
        content: 'MongoDB, SQL, modélisation de données',
        icon: 'https://img.icons8.com/color/96/000000/mongodb.png'
      },
      {
        title: 'Module 6: Projet final',
        content: 'Création d\'une application web complète de A à Z',
        icon: 'https://img.icons8.com/fluency/96/000000/graduation-cap.png'
      }
    ],
    instructor: {
      name: 'Ahmed Benali',
      title: 'Développeur Senior & Formateur',
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=400&auto=format&fit=crop',
      bio: 'Plus de 10 ans d\'expérience en développement web et 5 ans en tant que formateur. Spécialiste React et Node.js.'
    }
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsEnrolling(true);
      setMessage(null);

      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formationId: params.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Inscription réussie !'
        });
      } else {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'inscription');
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Une erreur est survenue lors de l\'inscription'
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Bouton de retour et nom de la plateforme */}
      <div className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Retour"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">ÉtuPortail</div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {/* En-tête de la formation */}
          <div className="relative h-64 md:h-80">
            <div className="absolute inset-0">
              <img 
                src={formation.image} 
                alt={formation.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-primary-800 dark:text-primary-100">
                    {formation.category}
                  </span>
                  <span className="bg-secondary-100 text-secondary-800 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-secondary-800 dark:text-secondary-100">
                    {formation.level}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-gray-300">
                    {formation.duration}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{formation.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>{formation.rating} (120 avis)</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span>{formation.students} étudiants</span>
                  </div>
                  <div className="flex items-center font-bold text-xl">
                    <span>{formation.price}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contenu de la formation */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <section id="description" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Description de la formation</h2>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                      <p>{formation.description}</p>
                    </div>
                  </section>

                  <section id="programme" className="mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Programme de la formation</h2>
                    <div className="space-y-6">
                      {formation.program.map((module, index) => (
                        <div key={index} className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex-shrink-0">
                            <img src={module.icon} alt={module.title} className="w-12 h-12" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{module.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{module.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="formateur" className="mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Votre formateur</h2>
                    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        <img 
                          src={formation.instructor.avatar} 
                          alt={formation.instructor.name} 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{formation.instructor.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 mb-3">{formation.instructor.title}</p>
                        <p className="text-gray-700 dark:text-gray-300">{formation.instructor.bio}</p>
                      </div>
                    </div>
                  </section>
                </motion.div>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg sticky top-24"
                  id="inscription"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">S'inscrire à cette formation</h3>
                  
                  {message && (
                    <div className={`mb-4 p-4 rounded-md ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Prix:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{formation.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Durée:</span>
                      <span className="text-gray-900 dark:text-white">{formation.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Niveau:</span>
                      <span className="text-gray-900 dark:text-white">{formation.level}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-colors ${
                      isEnrolling
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    }`}
                  >
                    {isEnrolling ? 'Inscription en cours...' : 'S\'inscrire maintenant'}
                  </button>

                  <button className="btn-outline w-full mt-4 mb-6">Télécharger la brochure</button>

                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accès à vie au contenu
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Certificat de réussite
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Support technique
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Projets pratiques inclus
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
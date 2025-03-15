'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null as File | null,
  });

  // Dans une application réelle, vous récupéreriez les données du job depuis une API
  const job = {
    id,
    title: `Développeur Web Frontend`,
    company: 'WebSolutions Algérie',
    companyLogo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
    location: 'Alger, Algérie',
    type: 'partTime',
    salary: '2500 DZD/h',
    posted: '3 jours',
    deadline: '30 juin 2023',
    description: `Nous recherchons un développeur web frontend talentueux pour rejoindre notre équipe dynamique à Alger. Vous serez responsable de la création d'interfaces utilisateur modernes et réactives pour nos clients.`,
    responsibilities: [
      'Développer des interfaces utilisateur réactives et intuitives',
      'Collaborer avec les designers UX/UI pour implémenter les maquettes',
      'Assurer la compatibilité cross-browser et la responsivité',
      'Optimiser les performances des applications web',
      'Participer aux revues de code et aux réunions d\'équipe'
    ],
    requirements: [
      'Expérience en développement frontend avec React, Vue.js ou Angular',
      'Maîtrise de HTML, CSS et JavaScript',
      'Connaissance des principes de design responsive',
      'Capacité à travailler en équipe et à communiquer efficacement',
      'Niveau d\'études : Bac+3 minimum en informatique ou équivalent'
    ],
    benefits: [
      'Horaires flexibles compatibles avec vos études',
      'Possibilité de télétravail partiel',
      'Environnement de travail moderne et stimulant',
      'Opportunités d\'apprentissage et de développement professionnel',
      'Prime de rendement trimestrielle'
    ],
    companyInfo: {
      name: 'WebSolutions Algérie',
      logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2000&auto=format&fit=crop',
      description: 'WebSolutions Algérie est une entreprise leader dans le développement web et mobile en Algérie. Fondée en 2015, notre mission est de fournir des solutions digitales innovantes aux entreprises algériennes et internationales.',
      website: 'https://websolutions-algerie.dz',
      employees: '50-100',
      industry: 'Développement Web & Mobile'
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        cv: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi de la candidature
    setTimeout(() => {
      setApplicationSubmitted(true);
    }, 1500);
  };

  const getJobTypeLabel = (type: string) => {
    switch(type) {
      case 'partTime': return 'Temps partiel';
      case 'fullTime': return 'Temps plein';
      case 'internship': return 'Stage';
      default: return type;
    }
  };

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
      {/* Bouton de retour et nom de la plateforme */}
      <div className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mr-4"
            aria-label="Retour"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex-1 text-center">
            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">FindUp</div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {/* En-tête du job */}
          <div className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white p-8 relative">
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: `url(${job.companyInfo.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center p-1">
                    <img 
                      src={job.companyLogo} 
                      alt={job.company}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md mb-4 ${getJobTypeBadgeColor(job.type)}`}>
                      {getJobTypeLabel(job.type)}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center text-lg">
                      <span>{job.company}</span>
                      <span className="mx-2">•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{job.salary}</div>
                  <p className="text-sm opacity-80">Publié il y a {job.posted}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contenu du job */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <section id="description" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Description du poste</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{job.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Responsabilités</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Exigences</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Avantages</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {job.benefits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section id="entreprise" className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 overflow-hidden">
                        <img 
                          src={job.companyInfo.logo} 
                          alt={job.companyInfo.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">À propos de {job.companyInfo.name}</h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{job.companyInfo.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Site web: </span>
                        <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          {job.companyInfo.website}
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Taille de l'entreprise: </span>
                        <span className="text-gray-700 dark:text-gray-300">{job.companyInfo.employees} employés</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Secteur: </span>
                        <span className="text-gray-700 dark:text-gray-300">{job.companyInfo.industry}</span>
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
                  id="postuler"
                >
                  {!isApplying && !applicationSubmitted ? (
                    <>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Postuler à cette offre</h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Date limite de candidature:</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{job.deadline}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsApplying(true)} 
                        className="btn-secondary w-full mb-4"
                      >
                        Postuler maintenant
                      </button>
                      <button className="btn-outline w-full mb-6">Sauvegarder l'offre</button>
                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Candidature rapide
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Réponse sous 48h
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Entretien à distance possible
                        </p>
                      </div>
                    </>
                  ) : applicationSubmitted ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Candidature envoyée !</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Votre candidature a été envoyée avec succès. L'entreprise vous contactera prochainement.
                      </p>
                      <button 
                        onClick={() => {
                          setIsApplying(false);
                          setApplicationSubmitted(false);
                        }} 
                        className="btn-outline"
                      >
                        Retour à l'offre
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Formulaire de candidature</h3>
                        <button 
                          onClick={() => setIsApplying(false)} 
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="cv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CV (PDF)
                          </label>
                          <input
                            type="file"
                            id="cv"
                            name="cv"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Lettre de motivation
                          </label>
                          <textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          ></textarea>
                        </div>
                        <button type="submit" className="btn-secondary w-full">
                          Envoyer ma candidature
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
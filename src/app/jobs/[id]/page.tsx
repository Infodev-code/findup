'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface JobData {
  _id: string;
  numericId: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyInfo: {
    name: string;
    logo: string;
    coverImage: string;
    description: string;
    website: string;
    size: string;
    industry: string;
  };
}

const JobDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const id = params.id as string;
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sections pour la navigation
  const sections = [
    { id: 'description', label: 'Description' },
    { id: 'entreprise', label: 'Entreprise' },
    { id: 'postuler', label: 'Postuler' }
  ];

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching job details for ID:', id);
        
        const response = await fetch(`/api/jobs/${id}`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Impossible de récupérer les détails de l\'offre d\'emploi');
        }
        
        const data = await response.json();
        console.log('Job data received:', data);
        
        if (!data.job) {
          throw new Error('Les données de l\'offre d\'emploi sont invalides');
        }
        
        setJob(data.job);
      } catch (err: any) {
        console.error('Erreur détaillée lors du chargement de l\'offre d\'emploi:', err);
        setError(err.message || 'Une erreur est survenue lors du chargement de l\'offre d\'emploi');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);

      // Envoi de la candidature
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: parseInt(id),
          coverLetter
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Candidature envoyée avec succès !'
        });
        // Fermer le formulaire après une candidature réussie
        setIsApplying(false);
        setCoverLetter('');
      } else {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi de la candidature');
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Une erreur est survenue lors de l\'envoi de la candidature'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getJobTypeLabel = (type: string) => {
    switch(type) {
      case 'partTime': return 'Temps partiel';
      case 'fullTime': return 'Temps plein';
      case 'internship': return 'Stage';
      case 'CDI': return 'CDI';
      case 'CDD': return 'CDD';
      case 'Stage': return 'Stage';
      case 'Alternance': return 'Alternance';
      case 'Freelance': return 'Freelance';
      default: return type;
    }
  };

  const getJobTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'partTime': return 'bg-secondary-100 text-secondary-800';
      case 'fullTime': return 'bg-primary-100 text-primary-800';
      case 'internship': return 'bg-green-100 text-green-800';
      case 'CDI': return 'bg-blue-100 text-blue-800';
      case 'CDD': return 'bg-purple-100 text-purple-800';
      case 'Stage': return 'bg-green-100 text-green-800';
      case 'Alternance': return 'bg-yellow-100 text-yellow-800';
      case 'Freelance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Chargement de l'offre d'emploi...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
            {error ? "Erreur lors du chargement" : "Offre d'emploi non trouvée"}
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {error || "Cette offre d'emploi n'existe pas ou a été supprimée. Veuillez vérifier l'URL ou réessayer plus tard."}
          </p>
          <div className="mt-6 space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Réessayer
            </button>
            <button 
              onClick={() => router.push('/jobs')} 
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Retour aux offres d'emploi
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                      src={job.companyInfo.logo} 
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
                        <span className="text-gray-700 dark:text-gray-300">{job.companyInfo.size} employés</span>
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
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Postuler à cette offre</h3>
                  
                  {message && (
                    <div className={`mb-4 p-4 rounded-md ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  {isApplying ? (
                    <form onSubmit={handleApply} className="space-y-4">
                      <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Lettre de motivation
                        </label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          rows={6}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                          placeholder="Expliquez pourquoi vous êtes intéressé(e) par ce poste..."
                          required
                        />
                      </div>
                      <div className="flex justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setIsApplying(false);
                            setCoverLetter('');
                            setMessage(null);
                          }}
                          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Envoi en cours...' : 'Candidater'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300">Type:</span>
                          <span className="text-gray-900 dark:text-white">{getJobTypeLabel(job.type)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300">Localisation:</span>
                          <span className="text-gray-900 dark:text-white">{job.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Salaire:</span>
                          <span className="text-gray-900 dark:text-white">{job.salary}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setIsApplying(true)} 
                        className="w-full px-6 py-3 text-white font-medium rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Postuler maintenant
                      </button>
                    </div>
                  )}

                  <div className="mt-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
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
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetail; 
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Applications() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  // Rediriger si non connecté
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/profile/applications');
    }
  }, [status, router]);

  // Données fictives pour les candidatures
  const applications = [
    {
      id: '1',
      job: 'Développeur Frontend',
      company: 'TechAlgeria',
      logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=200&auto=format&fit=crop',
      location: 'Alger, Algérie',
      type: 'Temps partiel',
      salary: '2500 DZD/h',
      date: '2023-02-15',
      status: 'accepted',
      feedback: 'Votre profil correspond parfaitement à nos besoins. Nous sommes ravis de vous accueillir dans notre équipe.',
      interviewDate: '2023-03-01'
    },
    {
      id: '2',
      job: 'Designer UI/UX',
      company: 'DesignStudio',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
      location: 'Oran, Algérie',
      type: 'Temps plein',
      salary: '45000 DZD/mois',
      date: '2023-03-10',
      status: 'pending',
      feedback: '',
      interviewDate: null
    },
    {
      id: '3',
      job: 'Développeur Mobile',
      company: 'AppMakers',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=200&auto=format&fit=crop',
      location: 'Constantine, Algérie',
      type: 'Freelance',
      salary: '3000 DZD/h',
      date: '2023-03-25',
      status: 'rejected',
      feedback: 'Nous avons reçu de nombreuses candidatures et avons sélectionné des profils avec plus d\'expérience dans le développement mobile.',
      interviewDate: null
    },
    {
      id: '4',
      job: 'Assistant Marketing',
      company: 'MarketPro',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=200&auto=format&fit=crop',
      location: 'Alger, Algérie',
      type: 'Stage',
      salary: '20000 DZD/mois',
      date: '2023-04-05',
      status: 'interview',
      feedback: 'Votre candidature a retenu notre attention. Nous aimerions vous rencontrer pour un entretien.',
      interviewDate: '2023-04-20'
    },
    {
      id: '3',
      company: 'TechAlgeria',
      position: 'Développeur Backend',
      status: 'rejected',
      date: '2023-02-15',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
      location: 'Oran, Algérie',
      type: 'Temps plein',
      salary: '45000 DZD/mois',
      feedback: 'Nous avons trouvé un candidat avec plus d\'expérience dans les technologies spécifiques requises.'
    }
  ];

  // Filtrer les candidatures selon le statut
  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      case 'pending': return 'En attente';
      case 'interview': return 'Entretien';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'interview': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mes candidatures</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Suivez l'état de vos candidatures aux offres d'emploi
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/jobs" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Découvrir plus d'offres
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
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            En attente
          </button>
          <button
            onClick={() => setFilter('interview')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'interview'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Entretien
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'accepted'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Acceptées
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'rejected'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Refusées
          </button>
        </div>

        {/* Liste des candidatures */}
        {filteredApplications.length > 0 ? (
          <div className="space-y-6">
            {filteredApplications.map((application) => (
              <div 
                key={application.id} 
                className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 relative">
                      <Image
                        src={application.logo}
                        alt={application.company}
                        fill
                        className="rounded-md object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {application.job}
                        </h2>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {getStatusLabel(application.status)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="truncate">{application.company}</span>
                        <span className="mx-1">•</span>
                        <span>{application.location}</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{application.type}</span>
                        <span className="mx-1">•</span>
                        <span>{application.salary}</span>
                        <span className="mx-1">•</span>
                        <span>Postulé le {new Date(application.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback ou détails supplémentaires */}
                  {(application.feedback || application.interviewDate) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {application.feedback && (
                        <div className="mb-2">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Feedback</h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{application.feedback}</p>
                        </div>
                      )}
                      {application.interviewDate && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Date d'entretien</h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(application.interviewDate).toLocaleDateString('fr-FR')} à {new Date(application.interviewDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex justify-end space-x-3">
                    <Link
                      href={`/jobs/${application.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Voir l'offre
                    </Link>
                    {application.status === 'accepted' && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Contacter l'entreprise
                      </button>
                    )}
                    {application.status === 'interview' && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Confirmer l'entretien
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Aucune candidature trouvée</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {filter === 'all' 
                ? "Vous n'avez pas encore postulé à des offres d'emploi." 
                : `Vous n'avez pas de candidature avec le statut "${getStatusLabel(filter)}".`}
            </p>
            <div className="mt-6">
              <Link
                href="/jobs"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Découvrir les offres d'emploi
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
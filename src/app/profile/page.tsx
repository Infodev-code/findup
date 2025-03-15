'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    education: '',
    skills: '',
    experience: '',
    location: '',
  });

  // État pour les candidatures et formations
  const [applications, setApplications] = useState<any[]>([]);
  const [formations, setFormations] = useState<any[]>([]);

  // Rediriger si non connecté
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/profile');
    }
  }, [status, router]);

  // Charger les données de l'utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/profile');
        if (response.ok) {
          const userData = await response.json();
          setFormData({
            name: userData.name || session?.user?.name || '',
            email: userData.email || session?.user?.email || '',
            phone: userData.phone || '',
            bio: userData.bio || '',
            education: userData.education || '',
            skills: userData.skills || '',
            experience: userData.experience || '',
            location: userData.location || '',
          });
        } else {
          console.error('Erreur lors de la récupération du profil');
          // Fallback to session data
          setFormData({
            name: session?.user?.name || '',
            email: session?.user?.email || '',
            phone: '',
            bio: '',
            education: '',
            skills: '',
            experience: '',
            location: '',
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        // Fallback to session data
        setFormData({
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          phone: '',
          bio: '',
          education: '',
          skills: '',
          experience: '',
          location: '',
        });
      }
    };

    const fetchUserApplications = async () => {
      try {
        const response = await fetch('/api/users/applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des candidatures:', error);
      }
    };

    const fetchUserFormations = async () => {
      try {
        const response = await fetch('/api/users/formations');
        if (response.ok) {
          const data = await response.json();
          setFormations(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    };

    if (session) {
      fetchUserProfile();
      fetchUserApplications();
      fetchUserFormations();
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Profil mis à jour avec succès !' 
        });
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du profil');
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Une erreur est survenue lors de la mise à jour du profil.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  // Fonction pour retirer une candidature
  const handleRemoveApplication = async (applicationId: string) => {
    try {
      setIsDeleting(applicationId);
      const response = await fetch(`/api/users/applications?id=${applicationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setApplications(applications.filter(app => app.id !== applicationId));
        setMessage({
          type: 'success',
          text: 'Candidature retirée avec succès'
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors du retrait de la candidature');
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Une erreur est survenue lors du retrait de la candidature'
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // Fonction pour retirer une formation
  const handleRemoveFormation = async (formationId: string) => {
    try {
      setIsDeleting(formationId);
      const response = await fetch(`/api/users/formations?id=${formationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFormations(formations.filter(form => form.id !== formationId));
        setMessage({
          type: 'success',
          text: 'Formation retirée avec succès'
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors du retrait de la formation');
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Une erreur est survenue lors du retrait de la formation'
      });
    } finally {
      setIsDeleting(null);
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* En-tête du profil */}
          <div className="relative h-48 bg-gradient-to-r from-primary-600 to-secondary-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                <Image 
                  src={session?.user?.image || 'https://ui-avatars.com/api/?name=User&background=random'} 
                  alt={session?.user?.name || 'Utilisateur'} 
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority={true}
                />
              </div>
            </div>
          </div>

          {/* Informations de base */}
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{formData.location}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isEditing ? 'Annuler' : 'Modifier le profil'}
              </button>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'applications'
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Candidatures
              </button>
              <button
                onClick={() => setActiveTab('formations')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'formations'
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Formations
              </button>
            </div>
          </div>

          {/* Contenu des onglets */}
          <div className="p-8">
            {/* Message de succès ou d'erreur */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-md ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {message.text}
              </div>
            )}

            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <div>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Localisation
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Biographie
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Éducation
                      </label>
                      <textarea
                        id="education"
                        name="education"
                        rows={2}
                        value={formData.education}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Compétences
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        rows={2}
                        value={formData.skills}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Expérience
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows={2}
                        value={formData.experience}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enregistrement...
                          </>
                        ) : 'Enregistrer les modifications'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Informations personnelles</h3>
                        <dl className="mt-2 space-y-3">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formData.email}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formData.phone}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Localisation</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formData.location}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">À propos</h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{formData.bio}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Éducation</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{formData.education}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Compétences</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.skills.split(',').map((skill, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Expérience</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{formData.experience}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Onglet Candidatures */}
            {activeTab === 'applications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Mes candidatures</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Poste</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entreprise</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Statut</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {applications.map((application) => (
                        <tr key={application.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{application.job}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{application.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(application.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                              {application.status === 'accepted' && 'Acceptée'}
                              {application.status === 'rejected' && 'Refusée'}
                              {application.status === 'pending' && 'En attente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleRemoveApplication(application.id)}
                              disabled={isDeleting === application.id}
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400 disabled:opacity-50"
                            >
                              {isDeleting === application.id ? (
                                <span className="flex items-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Retrait...
                                </span>
                              ) : 'Retirer'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Onglet Formations */}
            {activeTab === 'formations' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Mes formations</h3>
                <div className="space-y-6">
                  {formations.map((formation) => (
                    <div key={formation.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-md font-medium text-gray-900 dark:text-white">{formation.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formation.provider}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(formation.startDate).toLocaleDateString('fr-FR')} - {new Date(formation.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            formation.progress === 100 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}>
                            {formation.progress === 100 ? 'Terminée' : 'En cours'}
                          </span>
                          <button
                            onClick={() => handleRemoveFormation(formation.id)}
                            disabled={isDeleting === formation.id}
                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400 disabled:opacity-50 text-sm"
                          >
                            {isDeleting === formation.id ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Retrait...
                              </span>
                            ) : 'Retirer'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

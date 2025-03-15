'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'formations' | 'jobs' | 'users'>('formations');
  const [isAddingFormation, setIsAddingFormation] = useState(false);
  const [isAddingJob, setIsAddingJob] = useState(false);
  
  // Données fictives pour les formations
  const formations = [
    {
      id: 1,
      title: 'Développement Web Fullstack',
      category: 'development',
      price: 25000,
      duration: '6 mois',
      students: 1250,
      createdAt: '15/01/2023',
      status: 'active'
    },
    {
      id: 2,
      title: 'Marketing Digital',
      category: 'business',
      price: 18000,
      duration: '3 mois',
      students: 980,
      createdAt: '10/02/2023',
      status: 'active'
    },
    {
      id: 3,
      title: 'Design UX/UI',
      category: 'design',
      price: 22000,
      duration: '4 mois',
      students: 750,
      createdAt: '05/03/2023',
      status: 'active'
    },
    {
      id: 4,
      title: 'Anglais des Affaires',
      category: 'languages',
      price: 15000,
      duration: '3 mois',
      students: 1100,
      createdAt: '20/01/2023',
      status: 'inactive'
    },
  ];

  // Données fictives pour les jobs
  const jobs = [
    {
      id: 1,
      title: 'Développeur Frontend',
      company: 'WebSolutions Algérie',
      location: 'Alger',
      type: 'partTime',
      salary: '2500 DZD/h',
      applicants: 24,
      createdAt: '05/02/2023',
      status: 'active'
    },
    {
      id: 2,
      title: 'Développeur Web Frontend',
      company: 'TechStart',
      location: 'Oran',
      type: 'partTime',
      salary: '2000 DZD/h',
      applicants: 18,
      createdAt: '15/02/2023',
      status: 'active'
    },
    {
      id: 3,
      title: 'Stage Data Analyst',
      company: 'DataInsight',
      location: 'Constantine',
      type: 'internship',
      salary: '30000 DZD/mois',
      applicants: 15,
      createdAt: '01/03/2023',
      status: 'active'
    },
    {
      id: 4,
      title: 'Assistant Administratif',
      company: 'ConseilCo',
      location: 'Annaba',
      type: 'partTime',
      salary: '1800 DZD/h',
      applicants: 32,
      createdAt: '20/01/2023',
      status: 'closed'
    },
  ];

  // Données fictives pour les utilisateurs
  const users = [
    {
      id: 1,
      name: 'Amine Benabbou',
      email: 'amine.benabbou@email.com',
      role: 'student',
      enrolledCourses: 2,
      jobApplications: 3,
      joinDate: '10/01/2023',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sara Mansouri',
      email: 'sara.mansouri@email.com',
      role: 'student',
      enrolledCourses: 1,
      jobApplications: 2,
      joinDate: '15/01/2023',
      status: 'active'
    },
    {
      id: 3,
      name: 'Karim Meziane',
      email: 'karim.meziane@email.com',
      role: 'instructor',
      enrolledCourses: 0,
      jobApplications: 0,
      joinDate: '05/01/2023',
      status: 'active'
    },
    {
      id: 4,
      name: 'Leila Hadj',
      email: 'leila.hadj@email.com',
      role: 'employer',
      enrolledCourses: 0,
      jobApplications: 0,
      joinDate: '20/01/2023',
      status: 'inactive'
    },
  ];

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

  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': case 'closed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header avec navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">FindUp</h1>
              </Link>
              <nav className="ml-6 flex space-x-8">
                <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Accueil
                </Link>
                <Link href="/admin" className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-600 text-sm font-medium text-gray-900 dark:text-white">
                  Administration
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Notifications"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <div className="text-right mr-3">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Administrateur</div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                      <span className="text-xl font-medium text-white">A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Tableau de bord administrateur
            </h1>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 sm:px-6">
              <nav className="-mb-px flex space-x-6">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'formations'
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('formations')}
                >
                  Formations
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'jobs'
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('jobs')}
                >
                  Jobs
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('users')}
                >
                  Utilisateurs
                </button>
              </nav>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            {/* Section Formations */}
            {activeTab === 'formations' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="sm:flex sm:items-center sm:justify-between mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Formations</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Liste des formations disponibles sur la plateforme
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => setIsAddingFormation(true)}
                      className="btn-primary flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Ajouter une formation
                    </button>
                  </div>
                </div>

                {isAddingFormation ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ajouter une nouvelle formation</h3>
                      <button 
                        onClick={() => setIsAddingFormation(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Titre
                        </label>
                        <input type="text" name="title" id="title" className="mt-1 input" />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Catégorie
                        </label>
                        <select name="category" id="category" className="mt-1 input">
                          <option value="development">Développement</option>
                          <option value="business">Business</option>
                          <option value="design">Design</option>
                          <option value="languages">Langues</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Prix (DZD)
                        </label>
                        <input type="number" name="price" id="price" className="mt-1 input" />
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Durée
                        </label>
                        <input type="text" name="duration" id="duration" className="mt-1 input" placeholder="Ex: 3 mois" />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          className="mt-1 input"
                        ></textarea>
                      </div>
                      <div className="sm:col-span-2 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingFormation(false)}
                          className="btn-outline"
                        >
                          Annuler
                        </button>
                        <button type="submit" className="btn-primary">
                          Ajouter la formation
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : null}

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">ID</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Titre</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Catégorie</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Prix (DZD)</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Durée</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Étudiants</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Statut</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {formations.map((formation) => (
                        <tr key={formation.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{formation.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{formation.title}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{getCategoryLabel(formation.category)}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{formation.price}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{formation.duration}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{formation.students}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(formation.status)}`}>
                              {formation.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link href={`/admin/formations/${formation.id}`} className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4">
                              Éditer
                            </Link>
                            <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Section Jobs */}
            {activeTab === 'jobs' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="sm:flex sm:items-center sm:justify-between mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Jobs</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Liste des offres d'emploi disponibles sur la plateforme
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => setIsAddingJob(true)}
                      className="btn-primary flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Ajouter un job
                    </button>
                  </div>
                </div>

                {isAddingJob ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ajouter un nouveau job</h3>
                      <button 
                        onClick={() => setIsAddingJob(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Titre du poste
                        </label>
                        <input type="text" name="jobTitle" id="jobTitle" className="mt-1 input" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Entreprise
                        </label>
                        <input type="text" name="company" id="company" className="mt-1 input" />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Lieu
                        </label>
                        <input type="text" name="location" id="location" className="mt-1 input" />
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Type
                        </label>
                        <select name="type" id="type" className="mt-1 input">
                          <option value="partTime">Temps partiel</option>
                          <option value="fullTime">Temps plein</option>
                          <option value="internship">Stage</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Salaire
                        </label>
                        <input type="text" name="salary" id="salary" className="mt-1 input" placeholder="Ex: 2500 DZD/h" />
                      </div>
                      <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date limite de candidature
                        </label>
                        <input type="date" name="deadline" id="deadline" className="mt-1 input" />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description du poste
                        </label>
                        <textarea
                          name="jobDescription"
                          id="jobDescription"
                          rows={3}
                          className="mt-1 input"
                        ></textarea>
                      </div>
                      <div className="sm:col-span-2 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingJob(false)}
                          className="btn-outline"
                        >
                          Annuler
                        </button>
                        <button type="submit" className="btn-primary">
                          Ajouter le job
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : null}

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">ID</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Titre</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Entreprise</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Lieu</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Salaire</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Candidats</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Statut</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {jobs.map((job) => (
                        <tr key={job.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{job.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{job.title}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{job.company}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{job.location}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{job.salary}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{job.applicants}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link href={`/admin/jobs/${job.id}`} className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4">
                              Éditer
                            </Link>
                            <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Section Utilisateurs */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="sm:flex sm:items-center sm:justify-between mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Utilisateurs</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Liste des utilisateurs inscrits sur la plateforme
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">ID</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Nom</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Rôle</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Formations</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Candidatures</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Statut</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{user.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.enrolledCourses}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.jobApplications}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link href={`/admin/users/${user.id}`} className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4">
                              Voir détails
                            </Link>
                            <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                              Désactiver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
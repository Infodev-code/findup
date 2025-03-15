'use client';

import Image from 'next/image';

// Importation des images locales
import teamImage from '../../../public/images/team.jpg';
import workImage from '../../../public/images/work.jpg';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative py-16 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gray-50 dark:bg-gray-800" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              {/* Image d'équipe */}
              <div className="h-full w-full bg-gradient-to-r from-primary-600 to-secondary-600" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">À propos de FindUp</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Connecter les étudiants algériens aux meilleures opportunités de formation et d'emploi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Notre Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                FindUp est née d'une vision simple mais puissante : créer un pont entre les étudiants algériens et les opportunités qui façonneront leur avenir. Notre plateforme facilite l'accès à des formations de qualité et à des emplois étudiants enrichissants.
              </p>
              <div className="mt-8 sm:mt-10">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                  Nos Valeurs
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Excellence</h4>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Nous nous engageons à offrir un service de la plus haute qualité.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Innovation</h4>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Nous adoptons les dernières technologies pour améliorer l'expérience utilisateur.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Accessibilité</h4>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Nous rendons l'éducation et l'emploi accessibles à tous.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Communauté</h4>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Nous construisons une communauté forte d'étudiants et d'employeurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700" style={{ height: '300px' }}>
                {/* Image de travail d'équipe */}
                <div className="h-full w-full flex items-center justify-center">
                  <svg className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-primary-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Notre Impact en Chiffres
            </h2>
          </div>
          <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-primary-200">
                Étudiants Inscrits
              </dt>
              <dd className="order-1 text-5xl font-bold tracking-tight text-white">100K+</dd>
            </div>
            <div className="mt-10 flex flex-col sm:mt-0">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-primary-200">
                Formations Disponibles
              </dt>
              <dd className="order-1 text-5xl font-bold tracking-tight text-white">500+</dd>
            </div>
            <div className="mt-10 flex flex-col sm:mt-0">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-primary-200">
                Offres d'Emploi
              </dt>
              <dd className="order-1 text-5xl font-bold tracking-tight text-white">1000+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 
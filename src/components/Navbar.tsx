'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/app/config';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const pathname = usePathname();
  
  // Surveiller le défilement pour ajouter des effets lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effet pour s'assurer que les images sont chargées
  useEffect(() => {
    // Marquer comme chargé après le montage du composant
    setImagesLoaded(true);
    
    // Forcer un rafraîchissement des images de profil si la session est chargée
    if (status === 'authenticated' && session?.user?.image) {
      const profileImages = document.querySelectorAll('img[alt*="Utilisateur"]');
      profileImages.forEach(img => {
        // Déclencher un rechargement si l'image est déjà dans le cache
        const imgElement = img as HTMLImageElement;
        if (imgElement.complete) {
          const src = imgElement.src;
          imgElement.src = '';
          imgElement.src = src;
        }
      });
    }
  }, [status, session]);

  // Fermer les menus lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Fermer le menu utilisateur lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Vérifier si un lien est actif
  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') {
      return false;
    }
    return pathname?.startsWith(path);
  };

  // Gérer la déconnexion
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white dark:bg-gray-900 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo et nom du site */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              FindUp
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
            >
              {isActive('/') && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400"></span>
              )}
              Accueil
            </Link>
            <Link 
              href="/formations" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/formations') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
            >
              {isActive('/formations') && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400"></span>
              )}
              Formations
            </Link>
            <Link 
              href="/jobs" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/jobs') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
            >
              {isActive('/jobs') && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400"></span>
              )}
              Jobs Étudiants
            </Link>
            <Link 
              href="/about" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
            >
              {isActive('/about') && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400"></span>
              )}
              À propos
            </Link>
            <Link 
              href="/contact" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
            >
              {isActive('/contact') && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400"></span>
              )}
              Contact
            </Link>
          </nav>

          {/* Boutons d'authentification desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            ) : session && imagesLoaded ? (
              <div className="relative user-menu-container">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                    <Image 
                      src={session.user?.image || 'https://ui-avatars.com/api/?name=User&background=random'} 
                      alt={session.user?.name || 'Utilisateur'} 
                      fill
                      className="object-cover"
                      priority={true}
                      loading="eager"
                      sizes="40px"
                      onLoad={() => setImagesLoaded(true)}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                  <svg 
                    className={`h-5 w-5 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menu utilisateur */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Mon profil
                    </Link>
                    {session.user?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Administration
                      </Link>
                    )}
                    <Link 
                      href="/profile/applications" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Mes candidatures
                    </Link>
                    <Link 
                      href="/profile/formations" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Mes formations
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Connexion
                </Link>
                <Link 
                  href="/auth/register" 
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button 
            className="md:hidden flex items-center" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Accueil
          </Link>
          <Link 
            href="/formations" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/formations') 
                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Formations
          </Link>
          <Link 
            href="/jobs" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/jobs') 
                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Jobs Étudiants
          </Link>
          <Link 
            href="/about" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') 
                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            À propos
          </Link>
          <Link 
            href="/contact" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/contact') 
                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Contact
          </Link>
          
          {/* Section authentification mobile */}
          <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
            {status === 'loading' ? (
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              </div>
            ) : session && imagesLoaded ? (
              <div className="space-y-2">
                <div className="flex items-center px-3 py-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm mr-3">
                    <Image 
                      src={session.user?.image || 'https://ui-avatars.com/api/?name=User&background=random'} 
                      alt={session.user?.name || 'Utilisateur'} 
                      fill
                      className="object-cover"
                      priority={true}
                      loading="eager"
                      sizes="40px"
                      onLoad={() => setImagesLoaded(true)}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                </div>
                <Link 
                  href="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Mon profil
                </Link>
                {session.user?.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Administration
                  </Link>
                )}
                <Link 
                  href="/profile/applications" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Mes candidatures
                </Link>
                <Link 
                  href="/profile/formations" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Mes formations
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/auth/login" 
                  className="w-1/2 px-4 py-2 text-center text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700"
                >
                  Connexion
                </Link>
                <Link 
                  href="/auth/register" 
                  className="w-1/2 px-4 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-md hover:shadow-lg"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 
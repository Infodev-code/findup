/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimiser la compilation
  swcMinify: true,
  // Optimiser le chargement des images
  images: {
    // Faciliter le chargement d'images externes
    domains: ['images.unsplash.com', 'ui-avatars.com'],
    // Configuration avancée des patterns d'images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '**',
      },
    ],
    // Formats optimisés par défaut
    formats: ['image/avif', 'image/webp'],
    // Optimiser la taille des images chargées
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optimiser la qualité par défaut
    minimumCacheTTL: 60,
  },
  // Optimiser la compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimiser les performances avec experimental features
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
    // Désactiver le pré-rendu statique pour les pages d'authentification
    unstable_allowDynamic: [
      '/auth/login/**',
      '/auth/reset-password/**',
    ],
  },
};

module.exports = nextConfig; 
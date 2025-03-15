import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // Fonction qui s'exécute avant la vérification de l'authentification
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    // Vérifier si l'utilisateur est authentifié et essaie d'accéder aux pages d'authentification
    if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Vérifier si l'utilisateur est un administrateur pour les routes admin
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Retourne true si l'utilisateur est authentifié ou si la route ne nécessite pas d'authentification
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Routes qui ne nécessitent pas d'authentification
        if (
          pathname.startsWith('/auth/') ||
          pathname === '/' ||
          pathname.startsWith('/formations') ||
          pathname.startsWith('/jobs') ||
          pathname.startsWith('/about') ||
          pathname.startsWith('/contact') ||
          pathname.startsWith('/_next') ||
          pathname.includes('/api/auth') ||
          pathname.startsWith('/api/jobs')
        ) {
          return true;
        }
        
        // Toutes les autres routes nécessitent une authentification
        return !!token;
      },
    },
  }
);

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    /*
     * Correspond à toutes les routes sauf :
     * - Les fichiers statiques (images, polices, etc.)
     * - Les routes API publiques (/api/jobs, /api/auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api/jobs).*)',
  ],
}; 
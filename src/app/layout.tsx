'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import DetailNavbar from '@/components/DetailNavbar';
import AuthContext from '@/context/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Sections pour les pages de détail
  const formationSections = [
    { id: 'description', label: 'Description' },
    { id: 'programme', label: 'Programme' },
    { id: 'formateur', label: 'Formateur' },
    { id: 'inscription', label: 'Inscription' }
  ];

  const jobSections = [
    { id: 'description', label: 'Description' },
    { id: 'entreprise', label: 'Entreprise' },
    { id: 'postuler', label: 'Postuler' }
  ];

  // Vérifier si nous sommes sur une page de détail
  const isFormationDetail = pathname?.startsWith('/formations/') && pathname !== '/formations';
  const isJobDetail = pathname?.startsWith('/jobs/') && pathname !== '/jobs';
  const isDetailPage = isFormationDetail || isJobDetail;

  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans`}>
        <AuthContext>
          <div className="min-h-screen flex flex-col">
            {!isDetailPage && <Navbar />}
            
            {isFormationDetail && (
              <DetailNavbar type="formation" sections={formationSections} />
            )}
            {isJobDetail && (
              <DetailNavbar type="job" sections={jobSections} />
            )}
            
            <main className={`flex-grow ${isDetailPage ? '' : 'pt-16'}`}>
              {children}
            </main>
            <Footer />
          </div>
        </AuthContext>
      </body>
    </html>
  );
} 
'use client';

import { useState } from 'react';
import LogoExport from '@/components/LogoExport';

export default function LogoExportPage() {
  const [logoUrls, setLogoUrls] = useState<{ [key: number]: string }>({});
  const sizes = [16, 32, 64, 128, 256, 512, 1024];

  const handleExport = (size: number, dataUrl: string) => {
    setLogoUrls(prev => ({ ...prev, [size]: dataUrl }));
  };

  const downloadLogo = (size: number) => {
    const link = document.createElement('a');
    link.href = logoUrls[size];
    link.download = `findup-logo-${size}x${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Exporter le logo FindUp
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sizes.map(size => (
                <div key={size} className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  {/* Composant d'export caché */}
                  <LogoExport size={size} onExport={(dataUrl) => handleExport(size, dataUrl)} />
                  
                  {/* Aperçu du logo */}
                  {logoUrls[size] && (
                    <div className="mb-4">
                      <img 
                        src={logoUrls[size]} 
                        alt={`Logo ${size}x${size}`} 
                        style={{ width: Math.min(size, 128), height: Math.min(size, 128) }}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {size}x{size} pixels
                  </div>
                  
                  <button
                    onClick={() => downloadLogo(size)}
                    disabled={!logoUrls[size]}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Télécharger PNG
                  </button>
                </div>
              ))}
            </div>

            {/* Télécharger SVG */}
            <div className="mt-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Version vectorielle (SVG)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Le format SVG est idéal pour une utilisation à n'importe quelle taille sans perte de qualité.
              </p>
              <a 
                href="/images/logo.svg"
                download="findup-logo.svg"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Télécharger SVG
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
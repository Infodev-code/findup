import { useRef, useEffect } from 'react';

interface LogoExportProps {
  size?: number;
  onExport: (dataUrl: string) => void;
}

export default function LogoExport({ size = 512, onExport }: LogoExportProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Définir la taille du canvas
    canvas.width = size;
    canvas.height = size;

    // Créer le dégradé
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#0ea5e9'); // primary-500
    gradient.addColorStop(1, '#8b5cf6'); // secondary-500

    // Dessiner le fond avec coins arrondis
    const radius = size * 0.2; // 20% de la taille pour les coins arrondis
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Dessiner la lettre F
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F', size / 2, size / 2);

    // Exporter l'image
    onExport(canvas.toDataURL('image/png'));
  }, [size, onExport]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
} 
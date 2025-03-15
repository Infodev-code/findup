import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('API - Récupération du job avec ID:', params.id);
  
  try {
    await dbConnect();
    console.log('API - Connexion à la base de données établie');

    const id = params.id;
    
    // Rechercher le job par son numericId
    console.log('API - Recherche du job avec numericId:', parseInt(id));
    const job = await Job.findOne({ numericId: parseInt(id) });

    if (!job) {
      console.log('API - Job non trouvé pour l\'ID:', id);
      return NextResponse.json(
        { error: 'Offre d\'emploi non trouvée' },
        { status: 404 }
      );
    }

    console.log('API - Job trouvé:', job.title);
    return NextResponse.json({ job });
  } catch (error: any) {
    console.error('API - Erreur lors de la récupération de l\'offre d\'emploi:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erreur lors de la récupération de l\'offre d\'emploi',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 
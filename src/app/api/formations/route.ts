import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Formation from '@/models/Formation';

// Récupérer toutes les formations publiées
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const level = url.searchParams.get('level');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    await dbConnect();

    // Construire la requête
    let query: any = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (level) {
      query.level = level;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Exécuter la requête
    const totalFormations = await Formation.countDocuments(query);
    const formations = await Formation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Formater les résultats
    const formattedFormations = formations.map(formation => ({
      id: formation._id.toString(),
      title: formation.title,
      description: formation.description,
      provider: formation.provider,
      image: formation.image,
      price: formation.price,
      duration: formation.duration,
      level: formation.level,
      category: formation.category,
      tags: formation.tags,
      rating: formation.rating,
      reviewCount: formation.reviewCount,
      enrolledCount: formation.enrolledCount
    }));

    return NextResponse.json({
      formations: formattedFormations,
      pagination: {
        total: totalFormations,
        page,
        limit,
        pages: Math.ceil(totalFormations / limit)
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des formations:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des formations' },
      { status: 500 }
    );
  }
}

// Créer une nouvelle formation (admin uniquement)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const formationData = await req.json();

    await dbConnect();

    const formation = await Formation.create(formationData);

    return NextResponse.json(
      { 
        message: 'Formation créée avec succès',
        formation: {
          id: formation._id.toString(),
          title: formation.title,
          description: formation.description,
          provider: formation.provider,
          image: formation.image,
          price: formation.price,
          duration: formation.duration,
          level: formation.level,
          category: formation.category,
          tags: formation.tags,
          modules: formation.modules,
          isPublished: formation.isPublished
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la création de la formation:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la formation' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Formation from '@/models/Formation';
import mongoose from 'mongoose';

// Récupérer une formation par son ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de formation invalide' },
        { status: 400 }
      );
    }

    await dbConnect();

    const formation = await Formation.findById(id);

    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
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
        requirements: formation.requirements,
        objectives: formation.objectives,
        rating: formation.rating,
        reviewCount: formation.reviewCount,
        enrolledCount: formation.enrolledCount,
        startDate: formation.startDate,
        endDate: formation.endDate,
        isPublished: formation.isPublished,
        createdAt: formation.createdAt,
        updatedAt: formation.updatedAt
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération de la formation:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération de la formation' },
      { status: 500 }
    );
  }
}

// Mettre à jour une formation (admin uniquement)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id } = params;
    const formationData = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de formation invalide' },
        { status: 400 }
      );
    }

    await dbConnect();

    const formation = await Formation.findByIdAndUpdate(
      id,
      formationData,
      { new: true, runValidators: true }
    );

    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Formation mise à jour avec succès',
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
        isPublished: formation.isPublished,
        updatedAt: formation.updatedAt
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de la formation:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la mise à jour de la formation' },
      { status: 500 }
    );
  }
}

// Supprimer une formation (admin uniquement)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de formation invalide' },
        { status: 400 }
      );
    }

    await dbConnect();

    const formation = await Formation.findByIdAndDelete(id);

    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Formation supprimée avec succès'
    });
  } catch (error: any) {
    console.error('Erreur lors de la suppression de la formation:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la suppression de la formation' },
      { status: 500 }
    );
  }
} 
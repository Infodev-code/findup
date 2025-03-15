import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Enrollment from '@/models/Enrollment';
import Formation from '@/models/Formation';

// Récupérer les formations de l'utilisateur connecté
export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les inscriptions aux formations de l'utilisateur
    const enrollments = await Enrollment.find({ userId: user._id })
      .populate('formationId', 'title provider startDate endDate')
      .sort({ createdAt: -1 })
      .limit(5);

    // Formater les données pour le frontend
    const formattedFormations = enrollments.map(enrollment => ({
      id: enrollment._id.toString(),
      title: enrollment.formationId?.title || 'Formation inconnue',
      provider: enrollment.formationId?.provider || 'Fournisseur inconnu',
      progress: enrollment.progress || 0,
      startDate: enrollment.formationId?.startDate || enrollment.createdAt,
      endDate: enrollment.formationId?.endDate || null
    }));

    return NextResponse.json(formattedFormations);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des formations:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des formations' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    await dbConnect();

    const url = new URL(req.url);
    const formationId = url.searchParams.get('id');

    if (!formationId) {
      return NextResponse.json(
        { error: 'ID de formation manquant' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si la formation appartient à l'utilisateur
    const formation = await Formation.findOne({
      _id: formationId,
      userId: user._id
    });

    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée ou non autorisée' },
        { status: 404 }
      );
    }

    // Supprimer la formation
    await Formation.deleteOne({ _id: formationId });

    return NextResponse.json({
      message: 'Formation retirée avec succès'
    });
  } catch (error: any) {
    console.error('Erreur lors du retrait de la formation:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors du retrait de la formation' },
      { status: 500 }
    );
  }
}
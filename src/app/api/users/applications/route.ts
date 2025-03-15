import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Application from '@/models/Application';

// Récupérer les candidatures de l'utilisateur connecté
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

    // Récupérer les candidatures de l'utilisateur
    const applications = await Application.find({ userId: user._id })
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 })
      .limit(5);

    // Formater les données pour le frontend
    const formattedApplications = applications.map(app => ({
      id: app._id.toString(),
      job: app.jobId?.title || 'Poste inconnu',
      company: app.jobId?.company || 'Entreprise inconnue',
      date: app.createdAt,
      status: app.status
    }));

    return NextResponse.json(formattedApplications);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des candidatures:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des candidatures' },
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
    const applicationId = url.searchParams.get('id');

    if (!applicationId) {
      return NextResponse.json(
        { error: 'ID de candidature manquant' },
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

    // Vérifier si la candidature appartient à l'utilisateur
    const application = await Application.findOne({
      _id: applicationId,
      userId: user._id
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Candidature non trouvée ou non autorisée' },
        { status: 404 }
      );
    }

    // Supprimer la candidature
    await Application.deleteOne({ _id: applicationId });

    return NextResponse.json({
      message: 'Candidature retirée avec succès'
    });
  } catch (error: any) {
    console.error('Erreur lors du retrait de la candidature:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors du retrait de la candidature' },
      { status: 500 }
    );
  }
} 
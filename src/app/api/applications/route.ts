import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Job from '@/models/Job';
import Application from '@/models/Application';
import mongoose from 'mongoose';

// Créer une nouvelle candidature
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { jobId, coverLetter } = await req.json();
    
    console.log("Données reçues:", { jobId });

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si le job existe en utilisant l'ID numérique
    const numericJobId = parseInt(jobId);
    if (isNaN(numericJobId)) {
      return NextResponse.json(
        { error: 'ID de job invalide' },
        { status: 400 }
      );
    }

    const job = await Job.findOne({ numericId: numericJobId });
    
    if (!job) {
      return NextResponse.json(
        { error: 'Offre d\'emploi non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà postulé
    const existingApplication = await Application.findOne({
      userId: user._id,
      jobId: job._id
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Vous avez déjà postulé à cette offre' },
        { status: 400 }
      );
    }

    // Créer la candidature
    const application = new Application({
      userId: user._id,
      jobId: job._id,
      status: 'pending',
      coverLetter,
      appliedAt: new Date()
    });

    await application.save();

    // Incrémenter le nombre de candidatures pour ce job
    job.applicationsCount = (job.applicationsCount || 0) + 1;
    await job.save();

    return NextResponse.json({
      message: 'Candidature envoyée avec succès',
      application: {
        id: application._id,
        status: application.status,
        appliedAt: application.appliedAt
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de la candidature:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'envoi de la candidature' },
      { status: 500 }
    );
  }
}

// Récupérer les candidatures de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    await dbConnect();

    // Trouver l'utilisateur par email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Construire la requête
    let query: any = { userId: user._id };
    
    if (status) {
      query.status = status;
    }

    // Exécuter la requête
    const totalApplications = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('jobId', 'title company location type numericId');

    // Formater les résultats
    const formattedApplications = applications.map(app => ({
      id: app._id.toString(),
      jobId: app.jobId._id.toString(),
      jobTitle: app.jobId.title,
      company: app.jobId.company,
      location: app.jobId.location,
      type: app.jobId.type,
      numericId: app.jobId.numericId,
      status: app.status,
      appliedAt: app.appliedAt,
      updatedAt: app.updatedAt
    }));

    return NextResponse.json({
      applications: formattedApplications,
      pagination: {
        total: totalApplications,
        page,
        limit,
        pages: Math.ceil(totalApplications / limit)
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des candidatures:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des candidatures' },
      { status: 500 }
    );
  }
} 
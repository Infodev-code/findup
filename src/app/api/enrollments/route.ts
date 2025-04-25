import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Formation from '@/models/Formation';
import mongoose from 'mongoose';
import User from '@/models/User';

// Récupérer les inscriptions de l'utilisateur connecté
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

    // Construire la requête
    let query: any = { userId: session.user.id };
    
    if (status) {
      query.status = status;
    }

    // Exécuter la requête
    const totalEnrollments = await Enrollment.countDocuments(query);
    const enrollments = await Enrollment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('formationId', 'title provider image');

    // Formater les résultats
    const formattedEnrollments = enrollments.map(enrollment => ({
      id: enrollment._id.toString(),
      formationId: enrollment.formationId._id.toString(),
      formationTitle: enrollment.formationId.title,
      formationProvider: enrollment.formationId.provider,
      formationImage: enrollment.formationId.image,
      status: enrollment.status,
      progress: enrollment.progress,
      startDate: enrollment.startDate,
      completedDate: enrollment.completedDate,
      lastAccessDate: enrollment.lastAccessDate,
      moduleProgress: enrollment.moduleProgress,
      certificateUrl: enrollment.certificateUrl,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt
    }));

    return NextResponse.json({
      enrollments: formattedEnrollments,
      pagination: {
        total: totalEnrollments,
        page,
        limit,
        pages: Math.ceil(totalEnrollments / limit)
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des inscriptions:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des inscriptions' },
      { status: 500 }
    );
  }
}

// Créer une nouvelle inscription
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

    const { formationId } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si la formation existe en utilisant l'ID numérique
    const formation = await Formation.findOne({ numericId: parseInt(formationId) });
    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const existingEnrollment = await Enrollment.findOne({
      userId: user._id,
      formationId: formation._id
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Vous êtes déjà inscrit à cette formation' },
        { status: 400 }
      );
    }

    // Créer l'inscription
    const enrollment = new Enrollment({
      userId: user._id,
      formationId: formation._id,
      status: 'active',
      progress: 0,
      startDate: new Date(),
      moduleProgress: formation.modules.map((module: any) => ({
        moduleId: module._id,
        completed: false,
        progress: 0
      }))
    });

    await enrollment.save();

    // Incrémenter le nombre d'inscrits pour cette formation
    formation.enrolledCount = (formation.enrolledCount || 0) + 1;
    await formation.save();

    return NextResponse.json({
      message: 'Inscription réussie',
      enrollment: {
        id: enrollment._id,
        status: enrollment.status,
        startDate: enrollment.startDate
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Récupérer le profil de l'utilisateur connecté
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

    const user = await User.findOne({ email: session.user.email })
      .select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        phone: user.phone || '',
        bio: user.bio || '',
        education: user.education || '',
        skills: user.skills || '',
        experience: user.experience || '',
        location: user.location || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération du profil:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération du profil' },
      { status: 500 }
    );
  }
}

// Mettre à jour le profil de l'utilisateur connecté
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { 
      name, 
      phone, 
      bio, 
      education, 
      skills, 
      experience, 
      location 
    } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Mettre à jour les champs
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (education !== undefined) user.education = education;
    if (skills !== undefined) user.skills = skills;
    if (experience !== undefined) user.experience = experience;
    if (location !== undefined) user.location = location;

    await user.save();

    return NextResponse.json({
      message: 'Profil mis à jour avec succès',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        phone: user.phone || '',
        bio: user.bio || '',
        education: user.education || '',
        skills: user.skills || '',
        experience: user.experience || '',
        location: user.location || '',
        updatedAt: user.updatedAt
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la mise à jour du profil' },
      { status: 500 }
    );
  }
} 
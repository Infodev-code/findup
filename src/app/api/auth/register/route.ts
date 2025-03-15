import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function POST(request: NextRequest) {
  console.log('API Auth Register: Requête reçue');
  
  try {
    const body = await request.json();
    console.log('API Auth Register: Données reçues', body);
    
    const { name, email, password } = body;

    // Validation des champs
    if (!name || !email || !password) {
      console.log('API Auth Register: Champs manquants');
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Validation du format de l'email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log('API Auth Register: Format d\'email invalide');
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation de la longueur du mot de passe
    if (password.length < 8) {
      console.log('API Auth Register: Mot de passe trop court');
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Connexion à la base de données
    console.log('API Auth Register: Connexion à MongoDB');
    await dbConnect();

    // Vérification si l'email existe déjà
    console.log('API Auth Register: Vérification de l\'email');
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log('API Auth Register: Email déjà utilisé');
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 409 }
      );
    }

    // Hashage du mot de passe
    console.log('API Auth Register: Hashage du mot de passe');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    console.log('API Auth Register: Création de l\'utilisateur');
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`
    });

    // Suppression du mot de passe de la réponse
    const user = newUser.toObject();
    delete user.password;

    console.log('API Auth Register: Utilisateur créé avec succès');
    return NextResponse.json(
      { message: 'Utilisateur créé avec succès', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Auth Register: Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
} 
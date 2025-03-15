import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    
    // Paramètres de pagination
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Paramètres de filtrage
    const category = url.searchParams.get('category');
    const type = url.searchParams.get('type');
    const location = url.searchParams.get('location');
    const search = url.searchParams.get('search');
    
    // Construction de la requête
    let query: any = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Exécution de la requête
    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('numericId title company logo location type salary posted applicationsCount');
    
    // Préparation de la réponse
    return NextResponse.json({
      jobs,
      pagination: {
        total: totalJobs,
        page,
        limit,
        pages: Math.ceil(totalJobs / limit)
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des offres d\'emploi:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des offres d\'emploi' },
      { status: 500 }
    );
  }
} 
import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  numericId: number;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: 'fullTime' | 'partTime' | 'internship' | 'CDI' | 'CDD' | 'Stage' | 'Alternance' | 'Freelance';
  category: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: string;
  contactEmail?: string;
  applicationUrl?: string;
  applicationDeadline?: Date;
  isRemote: boolean;
  experienceLevel: 'junior' | 'intermédiaire' | 'senior' | 'expert' | 'aucun';
  tags: string[];
  benefits: string[];
  isActive: boolean;
  views: number;
  applicationsCount: number;
  companyInfo: {
    name: string;
    logo: string;
    coverImage: string;
    description: string;
    website: string;
    size: string;
    industry: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    numericId: {
      type: Number,
      required: [true, 'L\'ID numérique est requis'],
      unique: true
    },
    title: {
      type: String,
      required: [true, 'Le titre est requis']
    },
    company: {
      type: String,
      required: [true, 'Le nom de l\'entreprise est requis']
    },
    logo: { 
      type: String
    },
    location: {
      type: String,
      required: [true, 'La localisation est requise']
    },
    type: {
      type: String,
      enum: ['fullTime', 'partTime', 'internship', 'CDI', 'CDD', 'Stage', 'Alternance', 'Freelance'],
      required: [true, 'Le type de poste est requis']
    },
    category: { 
      type: String,
      required: [true, 'La catégorie est requise']
    },
    description: {
      type: String,
      required: [true, 'La description est requise']
    },
    requirements: [{
      type: String,
      required: [true, 'Les prérequis sont requis']
    }],
    responsibilities: [{
      type: String,
      required: [true, 'Les responsabilités sont requises']
    }],
    salary: {
      type: String,
      required: [true, 'Le salaire est requis']
    },
    contactEmail: { 
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
    },
    applicationUrl: { 
      type: String 
    },
    applicationDeadline: { 
      type: Date 
    },
    isRemote: { 
      type: Boolean,
      default: false
    },
    experienceLevel: { 
      type: String,
      enum: ['junior', 'intermédiaire', 'senior', 'expert', 'aucun'],
      required: [true, 'Le niveau d\'expérience est requis']
    },
    tags: [{ 
      type: String 
    }],
    benefits: [{
      type: String
    }],
    isActive: { 
      type: Boolean,
      default: true
    },
    views: { 
      type: Number,
      default: 0
    },
    applicationsCount: {
      type: Number,
      default: 0
    },
    companyInfo: {
      name: {
        type: String,
        required: [true, 'Le nom de l\'entreprise est requis']
      },
      logo: {
        type: String,
        required: [true, 'Le logo de l\'entreprise est requis']
      },
      coverImage: {
        type: String,
        required: [true, 'L\'image de couverture est requise']
      },
      description: {
        type: String,
        required: [true, 'La description de l\'entreprise est requise']
      },
      website: {
        type: String,
        required: [true, 'Le site web de l\'entreprise est requis']
      },
      size: {
        type: String,
        required: [true, 'La taille de l\'entreprise est requise']
      },
      industry: {
        type: String,
        required: [true, 'Le secteur d\'activité est requis']
      }
    }
  },
  {
    timestamps: true
  }
);

// Création d'index pour améliorer les performances des requêtes
JobSchema.index({ title: 'text', description: 'text', company: 'text', tags: 'text' });
JobSchema.index({ category: 1 });
JobSchema.index({ type: 1 });
JobSchema.index({ isActive: 1 });
JobSchema.index({ experienceLevel: 1 });
JobSchema.index({ isRemote: 1 });
JobSchema.index({ numericId: 1 });
JobSchema.index({ location: 1 });

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement avec hot reload
export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema); 
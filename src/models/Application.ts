import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
  appliedAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, 'L\'identifiant de l\'utilisateur est requis']
    },
    jobId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Job',
      required: [true, 'L\'identifiant de l\'offre d\'emploi est requis']
    },
    status: { 
      type: String,
      enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
      default: 'pending'
    },
    coverLetter: { 
      type: String 
    },
    resumeUrl: { 
      type: String 
    },
    notes: { 
      type: String 
    },
    appliedAt: { 
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true 
  }
);

// Création d'index pour améliorer les performances des requêtes
ApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ appliedAt: -1 });

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement avec hot reload
export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema); 
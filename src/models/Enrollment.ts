import mongoose, { Schema, Document } from 'mongoose';

export interface IModuleProgress {
  moduleId: mongoose.Types.ObjectId;
  completed: boolean;
  completedDate?: Date;
}

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  formationId: mongoose.Types.ObjectId;
  status: 'active' | 'completed' | 'cancelled' | 'paused';
  progress: number; // pourcentage de progression
  startDate: Date;
  completedDate?: Date;
  lastAccessDate?: Date;
  moduleProgress: IModuleProgress[];
  certificateUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleProgressSchema = new Schema({
  moduleId: { 
    type: Schema.Types.ObjectId,
    required: true
  },
  completed: { 
    type: Boolean,
    default: false
  },
  completedDate: { 
    type: Date
  }
});

const EnrollmentSchema: Schema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, 'L\'identifiant de l\'utilisateur est requis']
    },
    formationId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Formation',
      required: [true, 'L\'identifiant de la formation est requis']
    },
    status: { 
      type: String,
      enum: ['active', 'completed', 'cancelled', 'paused'],
      default: 'active'
    },
    progress: { 
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    startDate: { 
      type: Date,
      default: Date.now
    },
    completedDate: { 
      type: Date
    },
    lastAccessDate: { 
      type: Date
    },
    moduleProgress: [ModuleProgressSchema],
    certificateUrl: { 
      type: String 
    },
    notes: { 
      type: String 
    }
  },
  { 
    timestamps: true 
  }
);

// Création d'index pour améliorer les performances des requêtes
EnrollmentSchema.index({ userId: 1, formationId: 1 }, { unique: true });
EnrollmentSchema.index({ status: 1 });
EnrollmentSchema.index({ progress: 1 });

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement avec hot reload
export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema); 
import mongoose, { Schema, Document } from 'mongoose';

interface IModule {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  duration: number;
  videoUrl?: string;
  resources?: string[];
}

export interface IFormation extends Document {
  numericId: number;
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  rating?: number;
  enrolledCount: number;
  thumbnail?: string;
  modules: IModule[];
  createdAt: Date;
  updatedAt: Date;
}

const FormationSchema: Schema = new Schema(
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
    description: {
      type: String,
      required: [true, 'La description est requise']
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'L\'instructeur est requis']
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise']
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Le niveau est requis']
    },
    duration: {
      type: Number,
      required: [true, 'La durée est requise']
    },
    price: {
      type: Number,
      required: [true, 'Le prix est requis']
    },
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    enrolledCount: {
      type: Number,
      default: 0
    },
    thumbnail: String,
    modules: [{
      title: {
        type: String,
        required: [true, 'Le titre du module est requis']
      },
      description: {
        type: String,
        required: [true, 'La description du module est requise']
      },
      duration: {
        type: Number,
        required: [true, 'La durée du module est requise']
      },
      videoUrl: String,
      resources: [String]
    }]
  },
  {
    timestamps: true
  }
);

// Index pour améliorer les performances des recherches
FormationSchema.index({ numericId: 1 });
FormationSchema.index({ title: 1 });
FormationSchema.index({ category: 1 });
FormationSchema.index({ level: 1 });
FormationSchema.index({ instructor: 1 });

export default mongoose.models.Formation || mongoose.model<IFormation>('Formation', FormationSchema); 
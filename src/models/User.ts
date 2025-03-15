import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  phone?: string;
  bio?: string;
  education?: string;
  skills?: string;
  experience?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Le nom est requis'] 
    },
    email: { 
      type: String, 
      required: [true, 'L\'email est requis'], 
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
    },
    password: { 
      type: String, 
      required: [true, 'Le mot de passe est requis'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
      select: false // Ne pas inclure par défaut dans les requêtes
    },
    image: { 
      type: String,
      default: 'https://ui-avatars.com/api/?background=random'
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'],
      default: 'user'
    },
    phone: { 
      type: String 
    },
    bio: { 
      type: String 
    },
    education: { 
      type: String 
    },
    skills: { 
      type: String 
    },
    experience: { 
      type: String 
    },
    location: { 
      type: String 
    }
  },
  { 
    timestamps: true 
  }
);

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement avec hot reload
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 
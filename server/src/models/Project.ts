import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  image: { type: String, required: true },
  githubUrl: { type: String, required: true },
  liveUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

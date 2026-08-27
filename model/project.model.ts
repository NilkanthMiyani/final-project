import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: '' },
    overview: { type: String, default: '' },
    features: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    outcomes: { type: [String], default: [] },
    links: {
      github: { type: String, default: '' },
      live: { type: String, default: '' },
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;

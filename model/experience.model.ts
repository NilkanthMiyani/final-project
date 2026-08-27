import mongoose, { Schema } from 'mongoose';

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    employmentType: { type: String, default: 'Full-time' },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    current: { type: Boolean, default: false },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });

const Experience =
  mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

export default Experience;

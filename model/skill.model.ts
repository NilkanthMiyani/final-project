import mongoose, { Schema } from 'mongoose';

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default Skill;

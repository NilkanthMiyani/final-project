import mongoose, { Schema } from 'mongoose';

const certificationSchema = new Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String, default: '' },
    description: { type: String, default: '' },
    issuedDate: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

certificationSchema.index({ order: 1 });

const Certification =
  mongoose.models.Certification ||
  mongoose.model('Certification', certificationSchema);

export default Certification;

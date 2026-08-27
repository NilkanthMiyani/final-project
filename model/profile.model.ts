import mongoose, { Schema } from 'mongoose';

/**
 * Singleton document holding everything that describes the person rather than a
 * list of things. Always read/written via `key: 'primary'`.
 */
const profileSchema = new Schema(
  {
    key: { type: String, default: 'primary', unique: true, immutable: true },

    name: { type: String, required: true },
    role: { type: String, required: true },
    headline: { type: String, required: true },
    subheadline: { type: String, default: '' },
    bio: { type: [String], default: [] },

    location: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    availability: { type: String, default: '' },

    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      telegram: { type: String, default: '' },
    },

    resumeUrl: { type: String, default: '' },

    seoDescription: { type: String, default: '' },
    seoKeywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;

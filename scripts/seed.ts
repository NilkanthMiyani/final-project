/**
 * Populates MongoDB with the canonical content in `seed-data.ts`.
 *
 *   npx tsx scripts/seed.ts          # upsert, leaves anything extra alone
 *   npx tsx scripts/seed.ts --reset  # wipe the collections first
 *
 * Safe to re-run: documents are matched on a natural key and upserted.
 */
import { config } from 'dotenv';
import mongoose from 'mongoose';

// Match Next.js precedence: .env.local wins, .env is the fallback.
config({ path: '.env.local' });
config({ path: '.env' });

import CertificationModel from '../model/certification.model';
import EducationModel from '../model/education.model';
import ExperienceModel from '../model/experience.model';
import ProfileModel from '../model/profile.model';
import ProjectModel from '../model/project.model';
import SkillModel from '../model/skill.model';
import {
  certificationSeed,
  educationSeed,
  experienceSeed,
  profileSeed,
  projectSeed,
  skillSeed,
} from './seed-data';

const reset = process.argv.includes('--reset');

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local first.');
  }

  await mongoose.connect(uri, { dbName: 'portfolio' });
  console.log('Connected to portfolio database.');

  if (reset) {
    await Promise.all([
      ProfileModel.deleteMany({}),
      ExperienceModel.deleteMany({}),
      EducationModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      SkillModel.deleteMany({}),
      CertificationModel.deleteMany({}),
    ]);
    console.log('Cleared existing content.');
  }

  await ProfileModel.updateOne(
    { key: 'primary' },
    { $set: profileSeed },
    { upsert: true }
  );
  console.log('Profile seeded.');

  for (const item of experienceSeed) {
    await ExperienceModel.updateOne(
      { company: item.company, role: item.role },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`Experience seeded (${experienceSeed.length}).`);

  for (const item of educationSeed) {
    await EducationModel.updateOne(
      { institution: item.institution, degree: item.degree },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`Education seeded (${educationSeed.length}).`);

  for (const item of projectSeed) {
    await ProjectModel.updateOne(
      { slug: item.slug },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`Projects seeded (${projectSeed.length}).`);

  for (const item of skillSeed) {
    await SkillModel.updateOne(
      { name: item.name, category: item.category },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`Skills seeded (${skillSeed.length}).`);

  for (const item of certificationSeed) {
    await CertificationModel.updateOne(
      { name: item.name },
      { $set: item },
      { upsert: true }
    );
  }
  console.log(`Certifications seeded (${certificationSeed.length}).`);

  await mongoose.disconnect();
  console.log('Done.');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

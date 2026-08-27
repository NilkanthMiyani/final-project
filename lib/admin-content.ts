import connectToDatabase from '@/lib/database';
import { FALLBACK_PROFILE } from '@/lib/content';
import CertificationModel from '@/model/certification.model';
import EducationModel from '@/model/education.model';
import ExperienceModel from '@/model/experience.model';
import MessageModel from '@/model/message.model';
import ProfileModel from '@/model/profile.model';
import ProjectModel from '@/model/project.model';
import SkillModel from '@/model/skill.model';
import type {
  Certification,
  Education,
  Experience,
  Message,
  Profile,
  Project,
  Skill,
} from '@/types/content';

/**
 * Uncached readers for the admin panel. Unlike `lib/content.ts` these include
 * unpublished documents and always hit the database, so an editor never sees a
 * stale version of what they just saved.
 */

const str = (value: unknown): string => (typeof value === 'string' ? value : '');

const list = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];

export async function adminGetProfile(): Promise<Profile> {
  await connectToDatabase();
  const doc: any = await ProfileModel.findOne({ key: 'primary' }).lean();
  if (!doc) return FALLBACK_PROFILE;

  return {
    name: str(doc.name),
    role: str(doc.role),
    headline: str(doc.headline),
    subheadline: str(doc.subheadline),
    bio: list(doc.bio),
    location: str(doc.location),
    email: str(doc.email),
    phone: str(doc.phone),
    availability: str(doc.availability),
    socials: {
      github: str(doc.socials?.github),
      linkedin: str(doc.socials?.linkedin),
      twitter: str(doc.socials?.twitter),
      telegram: str(doc.socials?.telegram),
    },
    resumeUrl: str(doc.resumeUrl),
    seoDescription: str(doc.seoDescription),
    seoKeywords: list(doc.seoKeywords),
  };
}

export async function adminGetExperience(): Promise<Experience[]> {
  await connectToDatabase();
  const docs: any[] = await ExperienceModel.find().sort({ order: 1 }).lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    company: str(doc.company),
    role: str(doc.role),
    employmentType: str(doc.employmentType),
    location: str(doc.location),
    startDate: str(doc.startDate),
    endDate: str(doc.endDate),
    current: Boolean(doc.current),
    bullets: list(doc.bullets),
    order: Number(doc.order ?? 0),
    published: doc.published !== false,
  }));
}

export async function adminGetEducation(): Promise<Education[]> {
  await connectToDatabase();
  const docs: any[] = await EducationModel.find().sort({ order: 1 }).lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    institution: str(doc.institution),
    degree: str(doc.degree),
    field: str(doc.field),
    location: str(doc.location),
    startDate: str(doc.startDate),
    endDate: str(doc.endDate),
    grade: str(doc.grade),
    description: str(doc.description),
    order: Number(doc.order ?? 0),
    published: doc.published !== false,
  }));
}

export async function adminGetProjects(): Promise<Project[]> {
  await connectToDatabase();
  const docs: any[] = await ProjectModel.find().sort({ order: 1 }).lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    title: str(doc.title),
    slug: str(doc.slug),
    tagline: str(doc.tagline),
    overview: str(doc.overview),
    features: list(doc.features),
    techStack: list(doc.techStack),
    outcomes: list(doc.outcomes),
    links: { github: str(doc.links?.github), live: str(doc.links?.live) },
    featured: Boolean(doc.featured),
    order: Number(doc.order ?? 0),
    published: doc.published !== false,
  }));
}

export async function adminGetSkills(): Promise<Skill[]> {
  await connectToDatabase();
  const docs: any[] = await SkillModel.find().sort({ order: 1 }).lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    name: str(doc.name),
    category: str(doc.category),
    order: Number(doc.order ?? 0),
    published: doc.published !== false,
  }));
}

export async function adminGetCertifications(): Promise<Certification[]> {
  await connectToDatabase();
  const docs: any[] = await CertificationModel.find().sort({ order: 1 }).lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    name: str(doc.name),
    issuer: str(doc.issuer),
    description: str(doc.description),
    issuedDate: str(doc.issuedDate),
    credentialUrl: str(doc.credentialUrl),
    order: Number(doc.order ?? 0),
    published: doc.published !== false,
  }));
}

export async function adminGetMessages(): Promise<Message[]> {
  await connectToDatabase();
  const docs: any[] = await MessageModel.find().sort({ createdAt: -1 }).limit(200).lean();

  return docs.map((doc) => ({
    id: String(doc._id),
    fullname: str(doc.fullname),
    email: str(doc.email),
    message: str(doc.message),
    read: Boolean(doc.read),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : '',
  }));
}

import { unstable_cache } from 'next/cache';

import connectToDatabase from '@/lib/database';
import CertificationModel from '@/model/certification.model';
import EducationModel from '@/model/education.model';
import ExperienceModel from '@/model/experience.model';
import ProfileModel from '@/model/profile.model';
import ProjectModel from '@/model/project.model';
import SkillModel from '@/model/skill.model';
import {
  TAGS,
  type Certification,
  type Education,
  type Experience,
  type Profile,
  type Project,
  type Skill,
} from '@/types/content';

/** Shown before the database is seeded so the site never renders empty. */
export const FALLBACK_PROFILE: Profile = {
  name: 'Nilkanth Miyani',
  brandName: 'Nilkanth Miyani',
  role: 'DevOps Engineer',
  headline: 'I cut client hosting spend by 60%.',
  subheadline:
    'Multi-cloud infrastructure, GitOps delivery, and the pipelines underneath.',
  bio: [],
  location: 'Surat, Gujarat',
  email: 'miyaninilkanth2@gmail.com',
  phone: '',
  availability: '',
  socials: {
    github: 'https://github.com/NilkanthMiyani',
    linkedin: 'https://www.linkedin.com/in/nilkanthmiyani/',
    twitter: 'https://x.com/nilkanthmiyani',
    telegram: 'https://t.me/nilkanthmiyani',
  },
  highlights: [],
  resumeUrl: '/resumenilkanth.pdf',
  seoDescription: 'Portfolio of Nilkanth Miyani, DevOps & Cloud Engineer.',
  seoKeywords: [],
};

const id = (doc: any): string => String(doc._id);

const str = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const list = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];

/** Normalises the stored highlight subdocuments into plain pairs. */
export const highlightList = (
  value: unknown
): { value: string; label: string }[] =>
  Array.isArray(value)
    ? value
        .map((entry) => ({
          value: String((entry as any)?.value ?? ''),
          label: String((entry as any)?.label ?? ''),
        }))
        .filter((entry) => entry.value && entry.label)
    : [];

/**
 * Wraps a reader in the Next data cache under one tag, so admin writes can
 * invalidate exactly the collection they touched via `revalidateTag`.
 *
 * Reads fail soft to `empty`: a build with no MONGODB_URI still succeeds, and a
 * database outage degrades the affected section rather than 500-ing the page.
 */
function cachedReader<T>(
  tag: string,
  empty: T,
  read: () => Promise<T>
): () => Promise<T> {
  const guarded = async (): Promise<T> => {
    try {
      return await read();
    } catch (error) {
      console.error(`Failed to read ${tag}:`, error);
      return empty;
    }
  };

  return unstable_cache(guarded, [`content:${tag}`], { tags: [tag] });
}

export const getProfile = cachedReader<Profile>(TAGS.profile, FALLBACK_PROFILE, async () => {
  await connectToDatabase();
  const doc: any = await ProfileModel.findOne({ key: 'primary' }).lean();
  if (!doc) return FALLBACK_PROFILE;

  return {
    name: str(doc.name, FALLBACK_PROFILE.name),
    brandName: str(doc.brandName),
    role: str(doc.role, FALLBACK_PROFILE.role),
    headline: str(doc.headline, FALLBACK_PROFILE.headline),
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
    highlights: highlightList(doc.highlights),
    resumeUrl: str(doc.resumeUrl, FALLBACK_PROFILE.resumeUrl),
    seoDescription: str(doc.seoDescription, FALLBACK_PROFILE.seoDescription),
    seoKeywords: list(doc.seoKeywords),
  };
});

export const getExperience = cachedReader<Experience[]>(
  TAGS.experience,
  [],
  async () => {
    await connectToDatabase();
    const docs: any[] = await ExperienceModel.find({ published: true })
      .sort({ order: 1 })
      .lean();

    return docs.map((doc) => ({
      id: id(doc),
      company: str(doc.company),
      role: str(doc.role),
      employmentType: str(doc.employmentType),
      location: str(doc.location),
      startDate: str(doc.startDate),
      endDate: str(doc.endDate),
      current: Boolean(doc.current),
      bullets: list(doc.bullets),
      order: Number(doc.order ?? 0),
      published: Boolean(doc.published),
    }));
  }
);

export const getEducation = cachedReader<Education[]>(TAGS.education, [], async () => {
  await connectToDatabase();
  const docs: any[] = await EducationModel.find({ published: true })
    .sort({ order: 1 })
    .lean();

  return docs.map((doc) => ({
    id: id(doc),
    institution: str(doc.institution),
    degree: str(doc.degree),
    field: str(doc.field),
    location: str(doc.location),
    startDate: str(doc.startDate),
    endDate: str(doc.endDate),
    grade: str(doc.grade),
    description: str(doc.description),
    order: Number(doc.order ?? 0),
    published: Boolean(doc.published),
  }));
});

export const getProjects = cachedReader<Project[]>(TAGS.projects, [], async () => {
  await connectToDatabase();
  const docs: any[] = await ProjectModel.find({ published: true })
    .sort({ order: 1 })
    .lean();

  return docs.map((doc) => ({
    id: id(doc),
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
    published: Boolean(doc.published),
  }));
});

export const getSkills = cachedReader<Skill[]>(TAGS.skills, [], async () => {
  await connectToDatabase();
  const docs: any[] = await SkillModel.find({ published: true })
    .sort({ order: 1 })
    .lean();

  return docs.map((doc) => ({
    id: id(doc),
    name: str(doc.name),
    category: str(doc.category),
    order: Number(doc.order ?? 0),
    published: Boolean(doc.published),
  }));
});

export const getCertifications = cachedReader<Certification[]>(
  TAGS.certifications,
  [],
  async () => {
    await connectToDatabase();
    const docs: any[] = await CertificationModel.find({ published: true })
      .sort({ order: 1 })
      .lean();

    return docs.map((doc) => ({
      id: id(doc),
      name: str(doc.name),
      issuer: str(doc.issuer),
      description: str(doc.description),
      issuedDate: str(doc.issuedDate),
      credentialUrl: str(doc.credentialUrl),
      order: Number(doc.order ?? 0),
      published: Boolean(doc.published),
    }));
  }
);

/** Groups skills by category, preserving the admin-defined order within each. */
export function groupSkills(skills: Skill[]): { category: string; items: Skill[] }[] {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const bucket = groups.get(skill.category);
    if (bucket) bucket.push(skill);
    else groups.set(skill.category, [skill]);
  }
  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}

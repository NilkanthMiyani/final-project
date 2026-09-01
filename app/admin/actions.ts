'use server';

import { del, put } from '@vercel/blob';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { Model } from 'mongoose';

import { requireAuth } from '@/lib/admin-guard';
import connectToDatabase from '@/lib/database';
import CertificationModel from '@/model/certification.model';
import EducationModel from '@/model/education.model';
import ExperienceModel from '@/model/experience.model';
import MessageModel from '@/model/message.model';
import ProfileModel from '@/model/profile.model';
import ProjectModel from '@/model/project.model';
import SkillModel from '@/model/skill.model';
import { TAGS } from '@/types/content';

export type ActionResult = { ok: boolean; message: string };

/**
 * Form actions take the `useActionState` shape so forms bind natively via
 * `<form action={...}>` — which keeps them working before hydration and lets
 * React encode the FormData itself.
 */
export type FormAction = (
  previous: ActionResult | null,
  data: FormData
) => Promise<ActionResult>;

/* ------------------------------------------------------------------ helpers */

const text = (data: FormData, key: string): string =>
  String(data.get(key) ?? '').trim();

const bool = (data: FormData, key: string): boolean => data.get(key) === 'on';

/** Textarea fields hold one list item per line; blanks are dropped. */
const lines = (data: FormData, key: string): string[] =>
  String(data.get(key) ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/** Parses `60% | client hosting spend cut` lines into bento stat tiles. */
const highlights = (
  data: FormData,
  key: string
): { value: string; label: string }[] =>
  lines(data, key)
    .map((line) => {
      const [value, ...rest] = line.split('|');
      return { value: (value ?? '').trim(), label: rest.join('|').trim() };
    })
    .filter((entry) => entry.value && entry.label);

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Every statically rendered public route. */
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/projects',
  '/skills-tools',
  '/experience',
  '/education',
  '/contact',
] as const;

function refresh(tag: string): void {
  revalidateTag(tag);

  // Every route, not just the ones showing this collection: the site layout
  // renders the header brand and footer from the profile, so a change there has
  // to reach pages that display none of the collection itself.
  //
  // Still deliberately NOT `revalidatePath('/', 'layout')` — that form also
  // invalidates the admin and the client router cache, which is what made every
  // admin click a cold render after a save.
  for (const route of PUBLIC_ROUTES) {
    revalidatePath(route);
  }
  revalidatePath('/projects/[slug]', 'page');
}

function ok(message: string): ActionResult {
  return { ok: true, message };
}

function fail(message: string): ActionResult {
  return { ok: false, message };
}

/**
 * Create-or-update against a Mongoose model. An empty `id` means create.
 * Returns a result object rather than throwing so forms can show the message.
 */
async function upsert(
  model: Model<any>,
  tag: string,
  id: string,
  values: Record<string, unknown>,
  label: string
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();

    if (id) {
      await model.updateOne({ _id: id }, { $set: values });
    } else {
      const last = await model.findOne().sort({ order: -1 }).select('order').lean();
      const nextOrder = ((last as any)?.order ?? -1) + 1;
      await model.create({ ...values, order: nextOrder });
    }

    refresh(tag);
    return ok(`${label} saved.`);
  } catch (error) {
    console.error(`Failed to save ${label}:`, error);
    return fail(`Could not save ${label.toLowerCase()}.`);
  }
}

async function remove(
  model: Model<any>,
  tag: string,
  id: string,
  label: string
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();
    await model.deleteOne({ _id: id });
    refresh(tag);
    return ok(`${label} deleted.`);
  } catch (error) {
    console.error(`Failed to delete ${label}:`, error);
    return fail(`Could not delete ${label.toLowerCase()}.`);
  }
}

/**
 * Swaps the `order` value with the adjacent document, so reordering never
 * requires rewriting the whole collection.
 */
async function reorder(
  model: Model<any>,
  tag: string,
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();

    const current: any = await model.findById(id).lean();
    if (!current) return fail('Item not found.');

    const neighbour: any = await model
      .findOne(
        direction === 'up'
          ? { order: { $lt: current.order } }
          : { order: { $gt: current.order } }
      )
      .sort({ order: direction === 'up' ? -1 : 1 })
      .lean();

    if (!neighbour) return ok('Already at the end.');

    await model.updateOne({ _id: current._id }, { $set: { order: neighbour.order } });
    await model.updateOne({ _id: neighbour._id }, { $set: { order: current.order } });

    refresh(tag);
    return ok('Reordered.');
  } catch (error) {
    console.error('Failed to reorder:', error);
    return fail('Could not reorder.');
  }
}

async function togglePublish(
  model: Model<any>,
  tag: string,
  id: string
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();

    const doc: any = await model.findById(id).select('published').lean();
    if (!doc) return fail('Item not found.');

    await model.updateOne({ _id: id }, { $set: { published: !doc.published } });
    refresh(tag);
    return ok(doc.published ? 'Moved to draft.' : 'Published.');
  } catch (error) {
    console.error('Failed to toggle publish:', error);
    return fail('Could not change publish state.');
  }
}

/* ------------------------------------------------------------------ profile */

export async function saveProfile(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();

    await ProfileModel.updateOne(
      { key: 'primary' },
      {
        $set: {
          name: text(data, 'name'),
          brandName: text(data, 'brandName'),
          role: text(data, 'role'),
          headline: text(data, 'headline'),
          subheadline: text(data, 'subheadline'),
          bio: lines(data, 'bio'),
          location: text(data, 'location'),
          email: text(data, 'email'),
          phone: text(data, 'phone'),
          availability: text(data, 'availability'),
          socials: {
            github: text(data, 'github'),
            linkedin: text(data, 'linkedin'),
            twitter: text(data, 'twitter'),
            telegram: text(data, 'telegram'),
          },
          highlights: highlights(data, 'highlights'),
          seoDescription: text(data, 'seoDescription'),
          seoKeywords: lines(data, 'seoKeywords'),
        },
      },
      { upsert: true }
    );

    refresh(TAGS.profile);
    return ok('Profile saved.');
  } catch (error) {
    console.error('Failed to save profile:', error);
    return fail('Could not save profile.');
  }
}

/* --------------------------------------------------------------- experience */

export async function saveExperience(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  const current = bool(data, 'current');
  return upsert(
    ExperienceModel,
    TAGS.experience,
    text(data, 'id'),
    {
      company: text(data, 'company'),
      role: text(data, 'role'),
      employmentType: text(data, 'employmentType'),
      location: text(data, 'location'),
      startDate: text(data, 'startDate'),
      endDate: current ? '' : text(data, 'endDate'),
      current,
      bullets: lines(data, 'bullets'),
      published: bool(data, 'published'),
    },
    'Role'
  );
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  return remove(ExperienceModel, TAGS.experience, id, 'Role');
}

export async function moveExperience(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return reorder(ExperienceModel, TAGS.experience, id, direction);
}

export async function toggleExperience(id: string): Promise<ActionResult> {
  return togglePublish(ExperienceModel, TAGS.experience, id);
}

/* ---------------------------------------------------------------- education */

export async function saveEducation(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  return upsert(
    EducationModel,
    TAGS.education,
    text(data, 'id'),
    {
      institution: text(data, 'institution'),
      degree: text(data, 'degree'),
      field: text(data, 'field'),
      location: text(data, 'location'),
      startDate: text(data, 'startDate'),
      endDate: text(data, 'endDate'),
      grade: text(data, 'grade'),
      description: text(data, 'description'),
      published: bool(data, 'published'),
    },
    'Education entry'
  );
}

export async function deleteEducation(id: string): Promise<ActionResult> {
  return remove(EducationModel, TAGS.education, id, 'Education entry');
}

export async function moveEducation(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return reorder(EducationModel, TAGS.education, id, direction);
}

export async function toggleEducation(id: string): Promise<ActionResult> {
  return togglePublish(EducationModel, TAGS.education, id);
}

/* ----------------------------------------------------------------- projects */

export async function saveProject(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  const title = text(data, 'title');
  const slug = slugify(text(data, 'slug') || title);

  if (!slug) return fail('A title or slug is required.');

  return upsert(
    ProjectModel,
    TAGS.projects,
    text(data, 'id'),
    {
      title,
      slug,
      tagline: text(data, 'tagline'),
      overview: text(data, 'overview'),
      features: lines(data, 'features'),
      techStack: lines(data, 'techStack'),
      outcomes: lines(data, 'outcomes'),
      links: { github: text(data, 'github'), live: text(data, 'live') },
      featured: bool(data, 'featured'),
      published: bool(data, 'published'),
    },
    'Project'
  );
}

export async function deleteProject(id: string): Promise<ActionResult> {
  return remove(ProjectModel, TAGS.projects, id, 'Project');
}

export async function moveProject(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return reorder(ProjectModel, TAGS.projects, id, direction);
}

export async function toggleProject(id: string): Promise<ActionResult> {
  return togglePublish(ProjectModel, TAGS.projects, id);
}

/* ------------------------------------------------------------------- skills */

export async function saveSkill(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  return upsert(
    SkillModel,
    TAGS.skills,
    text(data, 'id'),
    {
      name: text(data, 'name'),
      category: text(data, 'category'),
      published: bool(data, 'published'),
    },
    'Skill'
  );
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  return remove(SkillModel, TAGS.skills, id, 'Skill');
}

export async function moveSkill(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return reorder(SkillModel, TAGS.skills, id, direction);
}

/* ----------------------------------------------------------- certifications */

export async function saveCertification(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  return upsert(
    CertificationModel,
    TAGS.certifications,
    text(data, 'id'),
    {
      name: text(data, 'name'),
      issuer: text(data, 'issuer'),
      description: text(data, 'description'),
      issuedDate: text(data, 'issuedDate'),
      credentialUrl: text(data, 'credentialUrl'),
      published: bool(data, 'published'),
    },
    'Certification'
  );
}

export async function deleteCertification(id: string): Promise<ActionResult> {
  return remove(CertificationModel, TAGS.certifications, id, 'Certification');
}

export async function moveCertification(
  id: string,
  direction: 'up' | 'down'
): Promise<ActionResult> {
  return reorder(CertificationModel, TAGS.certifications, id, direction);
}

export async function toggleCertification(id: string): Promise<ActionResult> {
  return togglePublish(CertificationModel, TAGS.certifications, id);
}

/* ----------------------------------------------------------------- messages */

export async function setMessageRead(
  id: string,
  read: boolean
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();
    await MessageModel.updateOne({ _id: id }, { $set: { read } });
    revalidatePath('/admin/messages');
    return ok(read ? 'Marked read.' : 'Marked unread.');
  } catch (error) {
    console.error('Failed to update message:', error);
    return fail('Could not update message.');
  }
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();
    await MessageModel.deleteOne({ _id: id });
    revalidatePath('/admin/messages');
    return ok('Message deleted.');
  } catch (error) {
    console.error('Failed to delete message:', error);
    return fail('Could not delete message.');
  }
}

/* ------------------------------------------------------------------- resume */

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

/** True for URLs this app uploaded to its own Vercel Blob store. */
function isManagedBlob(url: string): boolean {
  return /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//.test(url);
}

export async function uploadResume(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  try {
    await requireAuth();

    const file = data.get('resume');
    if (!(file instanceof File) || file.size === 0) {
      return fail('Choose a PDF to upload.');
    }
    if (file.type !== 'application/pdf') {
      return fail('The résumé must be a PDF.');
    }
    if (file.size > MAX_RESUME_BYTES) {
      return fail('That PDF is larger than 5 MB.');
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return fail('BLOB_READ_WRITE_TOKEN is not configured.');
    }

    await connectToDatabase();

    // Read the outgoing URL before overwriting it, so the old object can be
    // cleaned up once the new one is safely stored.
    // `.lean()` widens to a union that includes an array, so narrow it here
    // rather than fight the Mongoose overloads.
    const previous: any = await ProfileModel.findOne(
      { key: 'primary' },
      { resumeUrl: 1 }
    ).lean();
    const previousUrl: string =
      typeof previous?.resumeUrl === 'string' ? previous.resumeUrl : '';

    // `addRandomSuffix` sidesteps CDN caching of a replaced object at a fixed
    // path — a resume uploaded to the same key would keep serving the old PDF.
    const blob = await put(`resume/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'application/pdf',
    });

    await ProfileModel.updateOne(
      { key: 'primary' },
      { $set: { resumeUrl: blob.url } },
      { upsert: true }
    );

    // Only now that the new URL is live: drop the previous upload so the store
    // holds one résumé rather than every version ever uploaded. Guarded to blob
    // URLs so a manually set link, or a file in public/, is never touched.
    if (isManagedBlob(previousUrl) && previousUrl !== blob.url) {
      try {
        await del(previousUrl);
      } catch (error) {
        // Not fatal: the new résumé is already live and recorded.
        console.error('Failed to remove the previous résumé blob:', error);
      }
    }

    refresh(TAGS.profile);
    return ok('Résumé uploaded.');
  } catch (error) {
    console.error('Failed to upload resume:', error);
    return fail('Could not upload the résumé.');
  }
}

export async function setResumeUrl(
  _previous: ActionResult | null,
  data: FormData
): Promise<ActionResult> {
  try {
    await requireAuth();
    await connectToDatabase();
    await ProfileModel.updateOne(
      { key: 'primary' },
      { $set: { resumeUrl: text(data, 'resumeUrl') } },
      { upsert: true }
    );
    refresh(TAGS.profile);
    return ok('Résumé link saved.');
  } catch (error) {
    console.error('Failed to set resume url:', error);
    return fail('Could not save the résumé link.');
  }
}

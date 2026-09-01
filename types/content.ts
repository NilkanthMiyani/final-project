/** Plain, serialisable shapes handed from the data layer to React components. */

export type Profile = {
  name: string;
  /**
   * Short label shown in the header, drawer and footer. Falls back to `name`
   * when blank — the full legal name is often too long for a nav bar.
   */
  brandName: string;
  role: string;
  headline: string;
  subheadline: string;
  bio: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    telegram: string;
  };
  highlights: { value: string; label: string }[];
  resumeUrl: string;
  seoDescription: string;
  seoKeywords: string[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  order: number;
  published: boolean;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
  order: number;
  published: boolean;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  features: string[];
  techStack: string[];
  outcomes: string[];
  links: { github: string; live: string };
  featured: boolean;
  order: number;
  published: boolean;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  order: number;
  published: boolean;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  description: string;
  issuedDate: string;
  credentialUrl: string;
  order: number;
  published: boolean;
};

export type Message = {
  id: string;
  fullname: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

/** Cache tags — one per collection, revalidated by the matching admin action. */
export const TAGS = {
  profile: 'profile',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  skills: 'skills',
  certifications: 'certifications',
} as const;

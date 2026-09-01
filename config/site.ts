/**
 * Build-time constants for one deployment.
 *
 * Two sites run from this same repository and Vercel account, so nothing here
 * may be hardcoded to a person — each value falls back to this site's own
 * settings but is overridable per Vercel project via the environment.
 *
 * Anything that changes often — headline, bio, socials, résumé link — lives in
 * MongoDB and is read through `lib/content.ts` instead.
 */
const env = {
  name: process.env.NEXT_PUBLIC_SITE_NAME,
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN,
  url: process.env.NEXT_PUBLIC_SITE_URL,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
};

const domain = env.domain || 'nilkanthprojects.site';

export const siteConfig = {
  name: env.name || 'Nilkanth Miyani',
  domain,
  url: env.url || `https://${domain}`,
  description:
    env.description ||
    'DevOps Engineer working across AWS, GCP, Azure and Hetzner on Kubernetes, GitOps delivery, CI/CD and infrastructure cost optimization.',
  links: {
    githubUsername: env.githubUsername || 'NilkanthMiyani',
  },

  /**
   * Contact details for the maintenance page only. Everywhere else these come
   * from the profile in MongoDB — but the holding page is served from
   * middleware on the Edge runtime, where Mongoose cannot run.
   */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'miyaninilkanth2@gmail.com',
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      'https://www.linkedin.com/in/nilkanthmiyani/',
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/NilkanthMiyani',
  },
};

export type SiteConfig = typeof siteConfig;

/**
 * Per-site prefix for anything written to shared infrastructure.
 *
 * Both deployments share one Vercel Blob store, and a blob token cannot be
 * scoped to a path — so isolation has to be enforced by this app instead.
 * Every upload goes under this prefix, and deletes are refused outside it, so
 * one site can never remove the other's files.
 */
export const STORAGE_NAMESPACE = domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

export const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

/** Must track --background in globals.css for both themes. */
export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
};

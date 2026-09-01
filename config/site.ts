/**
 * Build-time constants only. Everything that changes — name, headline, socials,
 * resume link — lives in MongoDB and is read through `lib/content.ts`.
 */
export const siteConfig = {
  name: 'Nilkanth Miyani',
  domain: 'nilkanthprojects.site',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nilkanthprojects.site',
  description:
    'Portfolio of Nilkanth Miyani, DevOps & Cloud Engineer working across AWS, GCP, Azure and Hetzner.',
  keywords: [
    'Nilkanth Miyani',
    'Nilkanth Miyani Portfolio',
    'DevOps Engineer',
    'Cloud Engineer',
    'Kubernetes',
    'GitOps',
    'Terraform',
    'AWS',
    'Azure',
    'GCP',
    'CI/CD',
    'Platform Engineering',
  ],
  links: {
    github: 'https://github.com/NilkanthMiyani',
    githubProfile: 'https://github.com/NilkanthMiyani',
    githubUsername: 'NilkanthMiyani',
    linkedin: 'https://www.linkedin.com/in/nilkanthmiyani/',
    twitter: 'https://x.com/nilkanthmiyani',
    telegram: 'https://t.me/nilkanthmiyani',
    email: 'mailto:miyaninilkanth2@gmail.com',
    resume: '/resumenilkanth.pdf',
  },
};

export type SiteConfig = typeof siteConfig;

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

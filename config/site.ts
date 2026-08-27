/**
 * Build-time constants only. Everything that changes — name, headline, socials,
 * resume link — now lives in MongoDB and is read through `lib/content.ts`.
 */
export const siteConfig = {
  name: 'Nilkanth Miyani',
  domain: 'nilkanthprojects.site',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nilkanthprojects.site',
};

export const navItems = [
  { title: 'Work', href: '/#work' },
  { title: 'Projects', href: '/projects' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

export const META_THEME_COLORS = {
  light: '#fcfbf8',
  dark: '#1c1a18',
};

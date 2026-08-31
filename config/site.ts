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
  { title: 'work', href: '/#work' },
  { title: 'projects', href: '/projects' },
  { title: 'about', href: '/about' },
  { title: 'contact', href: '/contact' },
];

/** Must track --background in globals.css for both themes. */
export const META_THEME_COLORS = {
  light: '#f8faf7',
  dark: '#121513',
};

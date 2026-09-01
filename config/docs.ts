/**
 * Drives the sidebar, the mobile drawer and the ⌘K command menu. The order here
 * is also the order the Pager walks, so a new section needs adding in one place
 * and wiring into the two pages either side of it.
 */
export const docsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
  sidebarNav: [
    {
      title: 'Sections',
      items: [
        { title: 'Introduction', href: '/', items: [] },
        { title: 'About Me', href: '/about', items: [] },
        { title: 'Projects', href: '/projects', items: [] },
        { title: 'Skills & Tools', href: '/skills-tools', items: [] },
        { title: 'Experience', href: '/experience', items: [] },
        { title: 'Education', href: '/education', items: [] },
        { title: 'Contact', href: '/contact', items: [] },
      ],
    },
  ],
};

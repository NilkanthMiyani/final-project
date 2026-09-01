/**
 * Sidebar for the admin panel, in the same shape `SideNav` renders for the
 * public site — so the two surfaces are visibly the same product.
 *
 * Hrefs are root-relative because the admin lives on its own hostname:
 * middleware rewrites `admin.host/experience` to the `/admin/experience` route.
 * An `/admin`-prefixed href here would rewrite twice and 404.
 */
export const adminDocsConfig = {
  mainNav: [{ title: 'Overview', href: '/' }],
  sidebarNav: [
    {
      title: 'Content',
      items: [
        { title: 'Overview', href: '/', items: [] },
        { title: 'Profile', href: '/profile', items: [] },
        { title: 'Projects', href: '/projects', items: [] },
        { title: 'Skills', href: '/skills', items: [] },
        { title: 'Experience', href: '/experience', items: [] },
        { title: 'Education', href: '/education', items: [] },
        { title: 'Certifications', href: '/certifications', items: [] },
        { title: 'Résumé', href: '/resume', items: [] },
      ],
    },
    {
      title: 'Inbox',
      items: [{ title: 'Messages', href: '/messages', items: [] }],
    },
    {
      title: 'Insights',
      items: [{ title: 'Stats', href: '/stats', items: [] }],
    },
  ],
};

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

/**
 * Hrefs are root-relative because the admin lives on its own hostname:
 * middleware rewrites `admin.host/experience` to the `/admin/experience` route.
 * Linking to `/admin/experience` here would rewrite again to
 * `/admin/admin/experience` and 404.
 */
const links = [
  { href: '/', label: 'Overview' },
  { href: '/profile', label: 'Profile' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/education', label: 'Education' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/resume', label: 'Résumé' },
  { href: '/messages', label: 'Messages' },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout(): Promise<void> {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }

  return (
    <div>
      {/*
        Mobile: a horizontally scrollable row, edge-to-edge so the last item
        visibly runs off-screen and the row reads as scrollable.
        Desktop: a static vertical list.
      */}
      <nav
        className={cn(
          'no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 pb-2',
          'md:mx-0 md:block md:space-y-2.5 md:overflow-visible md:px-0 md:pb-0'
        )}
      >
        {links.map((link) => {
          const active =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'shrink-0 text-sm whitespace-nowrap transition-colors md:block',
                active
                  ? 'text-foreground'
                  : 'text-[var(--muted)] hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out sits below the scroller on mobile so it is always reachable. */}
      <button
        type="button"
        onClick={logout}
        className={cn(
          'mt-8 text-sm text-[var(--subtle)] transition-colors',
          'hover:text-[var(--destructive)] md:mt-10'
        )}
      >
        Sign out
      </button>
    </div>
  );
}

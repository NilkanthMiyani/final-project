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
  { href: '/', label: 'overview' },
  { href: '/profile', label: 'profile' },
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
  { href: '/skills', label: 'skills' },
  { href: '/education', label: 'education' },
  { href: '/certifications', label: 'certifications' },
  { href: '/resume', label: 'resume' },
  { href: '/messages', label: 'messages' },
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
          'no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-2',
          'md:mx-0 md:block md:space-y-0.5 md:overflow-visible md:px-0 md:pb-0'
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
                'shrink-0 px-3 py-2 text-[0.8125rem] whitespace-nowrap transition-colors',
                'md:block',
                active
                  ? 'text-[var(--accent)] md:bg-[var(--surface)]'
                  : 'text-[var(--muted-foreground)] hover:text-foreground md:hover:bg-[var(--surface)]'
              )}
            >
              <span className={cn('mr-2', active ? 'opacity-100' : 'opacity-0')}>
                ▸
              </span>
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
          'mt-4 w-full border border-[var(--line)] px-3 py-2 text-[0.8125rem] text-[var(--muted-foreground)]',
          'transition-colors hover:border-[var(--destructive)] hover:text-[var(--destructive)]',
          'md:border-0 md:px-3 md:text-left'
        )}
      >
        <span className="mr-2 opacity-0 md:inline">▸</span>
        sign out
      </button>
    </div>
  );
}

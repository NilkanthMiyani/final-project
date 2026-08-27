'use client';

import { LogOut } from 'lucide-react';
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
    <nav className="flex gap-1 overflow-x-auto no-scrollbar md:block md:space-y-0.5">
      {links.map((link) => {
        const active =
          link.href === '/'
            ? pathname === '/'
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block shrink-0 px-3 py-2 text-sm transition-colors md:px-3',
              active
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={logout}
        className="mt-4 hidden w-full items-center gap-2 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-destructive md:flex"
      >
        <LogOut className="size-3.5" />
        Sign out
      </button>
    </nav>
  );
}

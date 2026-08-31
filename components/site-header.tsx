'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ModeSwitcher } from '@/components/mode-switcher';
import { navItems } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * Fixed, borderless, and static — no scroll listener and no state to animate
 * between. It sits on the page background so it disappears into the layout
 * until you look for it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="text-sm font-medium tracking-tight">
          Nilkanth Miyani
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-6 sm:flex">
            {navItems.map((item) => {
              const active =
                item.href === '/projects'
                  ? pathname.startsWith('/projects')
                  : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-[var(--muted)] hover:text-foreground'
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <ModeSwitcher className="ml-3" />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="-mr-2 flex size-9 items-center justify-center text-[var(--muted)] transition-colors hover:text-foreground sm:hidden"
          >
            {/* Two rules that become an X. No rotation animation. */}
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-current',
                  open ? 'top-1.5 rotate-45' : 'top-1'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-current',
                  open ? 'top-1.5 -rotate-45' : 'top-2.5'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-[var(--line)] bg-background px-6 pb-4 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-sm text-[var(--muted)] transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ModeSwitcher } from '@/components/mode-switcher';
import { navItems } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * Fixed command bar. Deliberately static: the previous header ran a scroll
 * listener that set React state on every frame of a scroll, which re-rendered
 * the whole tree. It reads as a terminal title bar, so it has no scroll states
 * to animate between.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-background">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-[var(--accent)]"
        >
          <span className="text-[var(--accent)]">$</span>
          <span>nilkanth</span>
          <span className="hidden text-[var(--muted-foreground)] sm:inline">
            ~ %
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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
                  'px-3 py-1.5 text-[0.8125rem] transition-colors',
                  active
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--muted-foreground)] hover:text-foreground'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ModeSwitcher />
          <Link
            href="/contact"
            className="hidden border border-[var(--line-strong)] px-3 py-1.5 text-[0.8125rem] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
          >
            hire
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex size-9 items-center justify-center text-[var(--muted-foreground)] hover:text-foreground md:hidden"
          >
            {open ? '[x]' : '[=]'}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-[var(--line)] bg-background md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--muted-foreground)] hover:bg-[var(--surface)] hover:text-foreground sm:px-6"
            >
              <span className="mr-2 text-[var(--accent)]">&gt;</span>
              {item.title}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block px-4 py-3 text-sm text-[var(--accent)] hover:bg-[var(--surface)] sm:px-6"
          >
            <span className="mr-2">&gt;</span>
            hire me
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

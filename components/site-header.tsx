'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ModeSwitcher } from '@/components/mode-switcher';
import { navItems } from '@/config/site';
import { cn } from '@/lib/utils';

/** Floating glass pill that contracts once the page scrolls. */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Padding and max-width mirror the page container (max-w-6xl px-5 sm:px-8)
  // so the pill's edges line up with the cards and headings below it. A
  // narrower pill floats out of alignment with everything on the page.
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-3 sm:px-8 sm:pt-4">
      <div
        className={cn(
          // Always painted: at 4-7% the glass tokens let large headline text
          // read straight through the nav. Scrolling only tightens it.
          'flex w-full max-w-6xl items-center justify-between rounded-full',
          'border border-[var(--glass-border)] bg-background/80 backdrop-blur-xl',
          'transition-all duration-500 supports-[backdrop-filter]:bg-background/65',
          scrolled ? 'px-2.5 py-1.5 shadow-lg shadow-black/20 sm:px-3 sm:py-2' : 'px-3 py-2 sm:px-4 sm:py-2.5'
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 pl-1 text-sm font-medium transition-opacity hover:opacity-70"
        >
          <span
            className="size-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, var(--violet), var(--cyan))',
            }}
          />
          nilkanth
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
                  'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  active
                    ? 'bg-[var(--glass-strong)] text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ModeSwitcher />
          <Link href="/contact" className="btn-primary hidden md:inline-flex">
            Hire me
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex size-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-foreground transition-all duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0.5'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-foreground transition-all duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-2.5'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="absolute inset-x-5 top-[4.25rem] rounded-2xl border border-[var(--glass-border)] bg-background/95 p-2 shadow-xl shadow-black/30 backdrop-blur-xl sm:inset-x-8 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3.5 text-sm transition-colors hover:bg-[var(--glass)]"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary mt-2 w-full justify-center"
          >
            Hire me
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

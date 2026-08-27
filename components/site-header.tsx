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

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          'flex w-full max-w-3xl items-center justify-between rounded-full transition-all duration-500',
          scrolled
            ? 'glass-strong px-3 py-2 shadow-lg shadow-black/5'
            : 'px-4 py-2.5'
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 pl-2 text-sm font-medium transition-opacity hover:opacity-70"
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
            className="flex size-9 items-center justify-center md:hidden"
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
        <nav className="glass-strong absolute inset-x-4 top-20 rounded-2xl p-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-[var(--glass)]"
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

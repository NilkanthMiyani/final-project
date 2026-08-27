'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ModeSwitcher } from '@/components/mode-switcher';
import { navItems, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet whenever navigation completes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        scrolled
          ? 'border-b border-rule bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-mono text-[0.8125rem] tracking-tight transition-opacity hover:opacity-60"
        >
          {siteConfig.name.toLowerCase().replace(' ', '.')}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
                  'link-underline text-sm transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <ModeSwitcher />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ModeSwitcher />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-foreground transition-transform duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0.5'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-foreground transition-transform duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-2.5'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-rule bg-background px-6 pb-6 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-rule/60 py-3.5 text-sm last:border-0"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

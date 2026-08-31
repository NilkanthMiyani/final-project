import Link from 'next/link';

import { AdminNav } from '@/components/admin/admin-nav';
import { ModeSwitcher } from '@/components/mode-switcher';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh">
      {/* Solid bar — the old header used backdrop-filter over a scrolling
          document, which repaints a blurred layer on every frame. */}
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <p className="min-w-0 truncate text-sm">
            <span className="text-[var(--accent)]">$</span> admin
            <span className="hidden text-[var(--muted-foreground)] sm:inline">
              {' '}
              — {siteConfig.domain}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={siteConfig.url}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1 text-[0.8125rem] text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]"
            >
              view site ↗
            </Link>
            <ModeSwitcher />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:px-6 sm:py-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12">
        <aside className="md:sticky md:top-8 md:self-start">
          <AdminNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

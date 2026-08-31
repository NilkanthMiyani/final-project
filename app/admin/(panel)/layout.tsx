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
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-6 sm:px-8">
          <p className="min-w-0 truncate text-sm font-medium">
            Admin
            <span className="ml-2 font-normal text-[var(--subtle)]">
              {siteConfig.domain}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={siteConfig.url}
              target="_blank"
              rel="noreferrer"
              className="link text-sm"
            >
              View site
            </Link>
            <ModeSwitcher />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-10 sm:px-8 sm:py-14 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-16">
        <aside className="md:sticky md:top-8 md:self-start">
          <AdminNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

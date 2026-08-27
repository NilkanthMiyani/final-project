import { ArrowUpRight } from 'lucide-react';
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
    <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 sm:py-8 md:px-10">
      <header className="glass mb-7 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 sm:mb-10 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <p className="label">Content Admin</p>
          {/* The domain is decoration next to the label — drop it on narrow
              screens rather than let it squeeze the actions. */}
          <p className="mt-1 hidden truncate font-mono text-sm sm:block">
            {siteConfig.domain}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-4">
          <Link
            href={siteConfig.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="hidden sm:inline">View site</span>
            <span className="sm:hidden">Site</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <ModeSwitcher />
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-14">
        <aside className="md:sticky md:top-8 md:self-start">
          <AdminNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

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
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <header className="glass mb-10 flex items-center justify-between rounded-2xl px-6 py-5">
        <div>
          <p className="label">Content Admin</p>
          <p className="mt-1 font-mono text-sm">{siteConfig.domain}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View site
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <ModeSwitcher />
        </div>
      </header>

      <div className="grid gap-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-14">
        <aside className="md:sticky md:top-8 md:self-start">
          <AdminNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

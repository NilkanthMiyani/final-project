import Link from 'next/link';

import { PageTitle } from '@/components/admin/page-title';
import { adminGetSummary } from '@/lib/admin-content';

export default async function AdminOverviewPage() {
  const { counts, unread, drafts } = await adminGetSummary();

  const stats = [
    { label: 'Roles', value: counts.experience, href: '/experience' },
    { label: 'Projects', value: counts.projects, href: '/projects' },
    { label: 'Skills', value: counts.skills, href: '/skills' },
    { label: 'Education', value: counts.education, href: '/education' },
    { label: 'Certifications', value: counts.certifications, href: '/certifications' },
    { label: 'Messages', value: counts.messages, href: '/messages' },
  ];

  return (
    <div>
      <PageTitle
        title="Overview"
        description="Everything on the public site is edited from here. Changes go live immediately."
      />

      <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group block">
            <dt className="text-xs text-[var(--subtle)] transition-colors group-hover:text-[var(--muted)]">
              {stat.label}
            </dt>
            <dd className="tnum display mt-1.5 text-2xl font-medium">
              {stat.value}
            </dd>
          </Link>
        ))}
      </dl>

      {unread > 0 ? (
        <Link
          href="/messages"
          className="mt-10 flex items-center gap-2.5 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] transition-colors hover:text-foreground"
        >
          <span className="size-1.5 rounded-full bg-current" />
          {unread} unread {unread === 1 ? 'message' : 'messages'}
        </Link>
      ) : null}

      {drafts.length > 0 ? (
        <div className="mt-10 border-t border-[var(--line)] pt-6">
          <p className="eyebrow">Unpublished drafts</p>
          <ul className="mt-3 space-y-1.5">
            {drafts.map((name, index) => (
              <li key={index} className="text-sm text-[var(--muted)]">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

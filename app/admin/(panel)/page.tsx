import Link from 'next/link';

import { PageTitle } from '@/components/admin/page-title';
import { adminGetSummary } from '@/lib/admin-content';

export default async function AdminOverviewPage() {
  const { counts, unread, drafts } = await adminGetSummary();

  const stats = [
    { label: 'roles', value: counts.experience, href: '/experience' },
    { label: 'projects', value: counts.projects, href: '/projects' },
    { label: 'skills', value: counts.skills, href: '/skills' },
    { label: 'education', value: counts.education, href: '/education' },
    { label: 'certifications', value: counts.certifications, href: '/certifications' },
    { label: 'messages', value: counts.messages, href: '/messages' },
  ];

  return (
    <div>
      <PageTitle
        title="Overview"
        description="Everything on the public site is edited from here. Changes go live immediately."
      />

      <dl className="grid grid-cols-2 border-t border-l border-[var(--line)] sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border-r border-b border-[var(--line)] p-4 transition-colors hover:bg-[var(--surface)] sm:p-5"
          >
            <dt className="key">{stat.label}</dt>
            <dd className="tnum mt-2 text-2xl">{stat.value}</dd>
          </Link>
        ))}
      </dl>

      {unread > 0 ? (
        <Link
          href="/messages"
          className="mt-6 flex items-center gap-2.5 border border-[var(--accent)] bg-[var(--accent-dim)] p-4 text-sm transition-opacity hover:opacity-80"
        >
          <span className="size-1.5 bg-[var(--accent)]" />
          {unread} unread {unread === 1 ? 'message' : 'messages'}
        </Link>
      ) : null}

      {drafts.length > 0 ? (
        <div className="mt-10">
          <p className="key">unpublished drafts</p>
          <ul className="mt-3 space-y-1">
            {drafts.map((name, index) => (
              <li key={index} className="text-sm text-[var(--muted-foreground)]">
                <span className="mr-2 text-[var(--line-strong)]">–</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

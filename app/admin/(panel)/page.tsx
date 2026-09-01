import Link from 'next/link';

import { PageTitle } from '@/components/admin/page-title';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

      <div className="card-container grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="relative isolate w-full cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stat.value}
                <Link href={stat.href}>
                  <span className="absolute inset-0" />
                </Link>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {unread > 0 ? (
        <Link
          href="/messages"
          className="mt-8 flex items-center gap-2.5 rounded-xl border border-primary/40 bg-primary/5 p-4 text-sm transition-colors hover:bg-primary/10"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          {unread} unread {unread === 1 ? 'message' : 'messages'}
        </Link>
      ) : null}

      {drafts.length > 0 ? (
        <div className="mt-8 rounded-xl border border-border/40 p-5">
          <p className="text-sm font-semibold tracking-tight">Unpublished drafts</p>
          <ul className="mt-3 space-y-1.5">
            {drafts.map((name, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

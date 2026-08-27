import Link from 'next/link';

import { PageTitle } from '@/components/admin/page-title';
import {
  adminGetCertifications,
  adminGetEducation,
  adminGetExperience,
  adminGetMessages,
  adminGetProfile,
  adminGetProjects,
  adminGetSkills,
} from '@/lib/admin-content';

export default async function AdminOverviewPage() {
  const [profile, experience, projects, skills, education, certifications, messages] =
    await Promise.all([
      adminGetProfile(),
      adminGetExperience(),
      adminGetProjects(),
      adminGetSkills(),
      adminGetEducation(),
      adminGetCertifications(),
      adminGetMessages(),
    ]);

  const unread = messages.filter((message) => !message.read).length;

  const stats = [
    { label: 'Roles', value: experience.length, href: '/admin/experience' },
    { label: 'Projects', value: projects.length, href: '/admin/projects' },
    { label: 'Skills', value: skills.length, href: '/admin/skills' },
    { label: 'Education', value: education.length, href: '/admin/education' },
    {
      label: 'Certifications',
      value: certifications.length,
      href: '/admin/certifications',
    },
    { label: 'Messages', value: messages.length, href: '/admin/messages' },
  ];

  const drafts = [
    ...experience.filter((item) => !item.published).map((item) => item.company),
    ...projects.filter((item) => !item.published).map((item) => item.title),
  ];

  return (
    <div>
      <PageTitle
        title={`Hello, ${profile.name.split(' ')[0]}`}
        description="Everything on the public site is edited from here. Changes go live immediately."
      />

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-border)] sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-background p-4 transition-colors hover:bg-[var(--glass)] sm:p-5"
          >
            <dt className="label">{stat.label}</dt>
            <dd className="tnum mt-2 font-mono text-2xl">{stat.value}</dd>
          </Link>
        ))}
      </dl>

      {unread > 0 ? (
        <Link
          href="/admin/messages"
          className="mt-6 flex items-center gap-3 border border-accent/40 bg-accent/5 p-4 text-sm transition-colors hover:bg-accent/10"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          {unread} unread {unread === 1 ? 'message' : 'messages'}
        </Link>
      ) : null}

      {drafts.length > 0 ? (
        <div className="mt-10">
          <p className="label">Unpublished drafts</p>
          <ul className="mt-3 space-y-1">
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

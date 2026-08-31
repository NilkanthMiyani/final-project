import Link from 'next/link';

import { getProfile } from '@/lib/content';

const socialLabels: Record<string, string> = {
  github: 'github',
  linkedin: 'linkedin',
  twitter: 'x',
  telegram: 'telegram',
};

export async function SiteFooter() {
  const profile = await getProfile();
  const socials = Object.entries(profile.socials).filter(([, url]) => url);

  return (
    <footer className="mt-24 border-t border-[var(--line)] sm:mt-32">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm">
              <span className="text-[var(--accent)]">$</span> whoami
            </p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {profile.name} — {profile.role}
            </p>
            {profile.email ? (
              <Link
                href={`mailto:${profile.email}`}
                className="mt-1 inline-block text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)]"
              >
                {profile.email}
              </Link>
            ) : null}
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {socials.map(([key, url]) => (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)]"
              >
                {socialLabels[key] ?? key}
                <span className="text-[var(--line-strong)]"> ↗</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}

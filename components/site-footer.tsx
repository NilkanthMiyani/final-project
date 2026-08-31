import Link from 'next/link';

import { getProfile } from '@/lib/content';

const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'X',
  telegram: 'Telegram',
};

export async function SiteFooter() {
  const profile = await getProfile();
  const socials = Object.entries(profile.socials).filter(([, url]) => url);

  return (
    <footer className="mx-auto w-full max-w-2xl px-6 pb-16 sm:px-8">
      <div className="flex flex-col gap-6 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="space-y-1">
          {profile.email ? (
            <Link href={`mailto:${profile.email}`} className="link block text-sm">
              {profile.email}
            </Link>
          ) : null}
          <p className="text-sm text-[var(--subtle)]">
            © {new Date().getFullYear()} {profile.name}
            {profile.location ? ` · ${profile.location}` : ''}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map(([key, url]) => (
            <Link
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="link text-sm"
            >
              {socialLabels[key] ?? key}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

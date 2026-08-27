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
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="display text-2xl">Let’s talk infrastructure.</p>
            {profile.email ? (
              <Link
                href={`mailto:${profile.email}`}
                className="link-underline mt-3 inline-block font-mono text-sm text-muted-foreground hover:text-foreground"
              >
                {profile.email}
              </Link>
            ) : null}
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map(([key, url]) => (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-muted-foreground hover:text-foreground"
              >
                {socialLabels[key] ?? key}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="label">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}

import { ArrowUpRight } from 'lucide-react';
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
    <footer className="mx-auto mt-20 max-w-6xl px-5 pb-8 sm:mt-32 sm:px-8 sm:pb-10">
      <div className="glass rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2.5 font-medium">
              <span
                className="size-2 rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, var(--violet), var(--cyan))',
                }}
              />
              {profile.name}
            </p>
            {profile.email ? (
              <Link
                href={`mailto:${profile.email}`}
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {profile.email}
                <ArrowUpRight className="size-3.5" />
              </Link>
            ) : null}
          </div>

          <nav className="flex flex-wrap gap-2">
            {socials.map(([key, url]) => (
              <Link
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full px-4 py-2 text-xs transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              >
                {socialLabels[key] ?? key}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--glass-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="label">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}

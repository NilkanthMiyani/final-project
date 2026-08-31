import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionHeading } from '@/components/section-heading';
import { getProfile } from '@/lib/content';

import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about infrastructure, platform, or DevOps work.',
};

export default async function ContactPage() {
  const profile = await getProfile();

  const direct = [
    { label: 'email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'linkedin', value: 'in/nilkanthmiyani', href: profile.socials.linkedin },
    { label: 'github', value: 'NilkanthMiyani', href: profile.socials.github },
  ].filter((item) => item.value && item.href);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="pt-24 pb-10 sm:pt-32 sm:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="contact"
          title="Got an infrastructure problem worth solving?"
          description="A pipeline that's become a maintenance burden, a cloud bill that keeps climbing, or a role you think I'd fit — send it over."
        />
      </header>

      <div className="panel p-5 sm:p-8">
        <ContactForm />
      </div>

      {direct.length > 0 ? (
        <dl className="mt-8 border-t border-[var(--line)]">
          {direct.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[6rem_1fr] items-baseline gap-3 border-b border-[var(--line)] py-4"
            >
              <dt className="key">{item.label}</dt>
              <dd className="min-w-0">
                <Link
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="block truncate text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)]"
                >
                  {item.value}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

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
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'in/nilkanthmiyani', href: profile.socials.linkedin },
    { label: 'GitHub', value: 'NilkanthMiyani', href: profile.socials.github },
  ].filter((item) => item.value && item.href);

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8">
      <header className="pt-32 pb-12 sm:pt-40 sm:pb-14">
        <SectionHeading
          as="h1"
          title="Get in touch"
          description="A pipeline that's become a maintenance burden, a cloud bill that keeps climbing, or a role you think I'd fit — send it over."
        />
      </header>

      <div className="border-t border-[var(--line)] py-10">
        <ContactForm />
      </div>

      {direct.length > 0 ? (
        <dl className="border-t border-[var(--line)] py-10">
          <p className="eyebrow mb-4">Or reach me directly</p>
          <div className="space-y-3">
            {direct.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4"
              >
                <dt className="text-sm text-[var(--subtle)]">{item.label}</dt>
                <dd className="min-w-0">
                  <Link
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="link block truncate text-sm"
                  >
                    {item.value}
                  </Link>
                </dd>
              </div>
            ))}
          </div>
        </dl>
      ) : null}
    </div>
  );
}

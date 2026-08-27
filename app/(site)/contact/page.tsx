import type { Metadata } from 'next';
import Link from 'next/link';

import { Section } from '@/components/section';
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
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <header className="fade-up py-20 md:py-28">
        <p className="label">Contact</p>
        <h1 className="display mt-6 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
          Got an infrastructure problem worth solving?
        </h1>
        <p className="prose-editorial mt-6">
          Whether it’s a pipeline that’s become a maintenance burden, a cloud bill
          that keeps climbing, or a role you think I’d fit — send it over.
        </p>
      </header>

      <Section index="01" title="Send a message">
        <ContactForm />
      </Section>

      {direct.length > 0 ? (
        <Section index="02" title="Or reach me directly" className="mt-24">
          <dl className="border-t border-rule">
            {direct.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-10"
              >
                <dt className="label pt-0.5">{item.label}</dt>
                <dd>
                  <Link
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="link-underline font-mono text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.value}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}
    </div>
  );
}

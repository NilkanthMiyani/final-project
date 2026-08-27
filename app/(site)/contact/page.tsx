import { Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
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
    <div className="mx-auto max-w-4xl px-5 sm:px-8">
      <header className="pt-28 pb-10 sm:pt-40 sm:pb-14">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Got an infrastructure problem worth solving?"
            description="A pipeline that’s become a maintenance burden, a cloud bill that keeps climbing, or a role you think I’d fit — send it over."
          />
        </Reveal>
      </header>

      <Reveal>
        <SpotlightCard className="p-5 sm:p-10">
          <ContactForm />
        </SpotlightCard>
      </Reveal>

      {direct.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {direct.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <SpotlightCard className="h-full">
                <Link
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="block p-6"
                >
                  <Mail className="size-4 text-[var(--cyan)]" />
                  <p className="label mt-4">{item.label}</p>
                  <p className="mt-1.5 truncate font-mono text-sm text-muted-foreground">
                    {item.value}
                  </p>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}

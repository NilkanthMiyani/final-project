import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import {
  getCertifications,
  getEducation,
  getProfile,
  getSkills,
  groupSkills,
} from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, education, and certifications.',
};

export default async function AboutPage() {
  const [profile, education, certifications, skills] = await Promise.all([
    getProfile(),
    getEducation(),
    getCertifications(),
    getSkills(),
  ]);

  const stack = groupSkills(skills);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="pt-36 pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title={profile.name}
            description={[profile.role, profile.location]
              .filter(Boolean)
              .join(' · ')}
          />
        </Reveal>
      </header>

      {profile.bio.length > 0 ? (
        <Reveal>
          <SpotlightCard className="p-7 sm:p-10">
            <div className="space-y-5">
              {profile.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      ) : null}

      {education.length > 0 ? (
        <section className="pt-24">
          <Reveal>
            <SectionHeading eyebrow="Education" title="Where I studied." />
          </Reveal>
          <div className="mt-10 space-y-4">
            {education.map((item, index) => (
              <Reveal key={item.id} delay={index * 70}>
                <SpotlightCard className="p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.degree}</h3>
                      <p className="label mt-2">{item.institution}</p>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <span className="tnum font-mono text-xs text-muted-foreground">
                        {[item.startDate, item.endDate].filter(Boolean).join(' — ')}
                      </span>
                      {item.grade ? (
                        <span className="pill text-[0.6875rem]">{item.grade}</span>
                      ) : null}
                    </div>
                  </div>
                  {item.description ? (
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {certifications.length > 0 ? (
        <section className="pt-24">
          <Reveal>
            <SectionHeading eyebrow="Certifications" title="Verified credentials." />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <Reveal key={cert.id} delay={index * 70}>
                <SpotlightCard className="h-full">
                  <CertBody cert={cert} />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {stack.length > 0 ? (
        <section className="pt-24">
          <Reveal>
            <SectionHeading eyebrow="Stack" title="The full toolkit." />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {stack.map((group, index) => (
              <Reveal key={group.category} delay={index * 60}>
                <SpotlightCard className="h-full p-6">
                  <p className="label">{group.category}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill.id}
                        className="rounded-full border border-[var(--glass-border)] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[var(--violet)] hover:text-foreground"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

type Cert = Awaited<ReturnType<typeof getCertifications>>[number];

/** Card body, wrapped in a link only when there is a credential to verify. */
function CertBody({ cert }: { cert: Cert }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <BadgeCheck className="size-5 shrink-0 text-[var(--cyan)]" />
        {cert.credentialUrl ? (
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : null}
      </div>
      <h3 className="mt-4 leading-snug font-semibold">{cert.name}</h3>
      <p className="label mt-2">
        {[cert.issuer, cert.issuedDate].filter(Boolean).join(' · ')}
      </p>
      {cert.description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {cert.description}
        </p>
      ) : null}
    </>
  );

  return cert.credentialUrl ? (
    <Link
      href={cert.credentialUrl}
      target="_blank"
      rel="noreferrer"
      className="block h-full p-6"
    >
      {inner}
    </Link>
  ) : (
    <div className="h-full p-6">{inner}</div>
  );
}

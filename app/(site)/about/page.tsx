import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Section } from '@/components/section';
import {
  getCertifications,
  getEducation,
  getProfile,
  getSkills,
  groupSkills,
} from '@/lib/content';
import type { Certification } from '@/types/content';

const certRowClass =
  'group grid gap-3 border-b border-rule py-7 transition-colors hover:bg-secondary/40 md:-mx-3 md:grid-cols-[9.5rem_1fr] md:gap-10 md:px-3';

function CertificationBody({
  cert,
  linked = false,
}: {
  cert: Certification;
  linked?: boolean;
}) {
  return (
    <>
      <p className="tnum font-mono text-xs text-muted-foreground">
        {cert.issuedDate}
      </p>
      <div>
        <h3 className="flex items-center gap-1.5 text-[1.0625rem] font-medium leading-snug">
          {cert.name}
          {linked ? (
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          ) : null}
        </h3>
        <p className="label mt-1.5">{cert.issuer}</p>
        {cert.description ? (
          <p className="prose-editorial mt-3 text-sm">{cert.description}</p>
        ) : null}
      </div>
    </>
  );
}

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
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <header className="fade-up py-20 md:py-28">
        <p className="label">About</p>
        <h1 className="display mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          {profile.name}
        </h1>
        <p className="label mt-4">
          {[profile.role, profile.location].filter(Boolean).join(' · ')}
        </p>
      </header>

      {profile.bio.length > 0 ? (
        <Section index="01" title="Background">
          <div className="space-y-6">
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="prose-editorial text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      ) : null}

      {education.length > 0 ? (
        <Section index="02" title="Education" className="mt-24">
          <div className="border-t border-rule">
            {education.map((item) => (
              <article
                key={item.id}
                className="grid gap-3 border-b border-rule py-7 md:grid-cols-[9.5rem_1fr] md:gap-10"
              >
                <p className="tnum font-mono text-xs text-muted-foreground">
                  {[item.startDate, item.endDate].filter(Boolean).join(' — ')}
                </p>
                <div>
                  <h3 className="text-[1.0625rem] font-medium leading-snug">
                    {item.degree}
                  </h3>
                  <p className="label mt-1.5">
                    {[item.institution, item.grade].filter(Boolean).join(' · ')}
                  </p>
                  {item.description ? (
                    <p className="prose-editorial mt-4 text-sm">{item.description}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {certifications.length > 0 ? (
        <Section index="03" title="Certifications" className="mt-24">
          <div className="border-t border-rule">
            {certifications.map((cert) =>
              cert.credentialUrl ? (
                <Link
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={certRowClass}
                >
                  <CertificationBody cert={cert} linked />
                </Link>
              ) : (
                <div key={cert.id} className={certRowClass}>
                  <CertificationBody cert={cert} />
                </div>
              )
            )}
          </div>
        </Section>
      ) : null}

      {stack.length > 0 ? (
        <Section index="04" title="Full Stack" className="mt-24">
          <dl className="border-t border-rule">
            {stack.map((group) => (
              <div
                key={group.category}
                className="grid gap-2 border-b border-rule py-6 md:grid-cols-[13rem_1fr] md:gap-10"
              >
                <dt className="label pt-0.5">{group.category}</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.items.map((skill) => (
                    <span key={skill.id} className="text-sm text-muted-foreground">
                      {skill.name}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}
    </div>
  );
}

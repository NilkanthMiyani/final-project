import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionHeading } from '@/components/section-heading';
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
    <div className="mx-auto max-w-2xl px-6 sm:px-8">
      <header className="pt-32 pb-12 sm:pt-40 sm:pb-16">
        <SectionHeading
          as="h1"
          title={profile.name}
          description={[profile.role, profile.location].filter(Boolean).join(' · ')}
        />
      </header>

      {profile.bio.length > 0 ? (
        <section className="space-y-5 border-t border-[var(--line)] py-10">
          {profile.bio.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {education.length > 0 ? (
        <Section label="Education">
          <div className="divide-y divide-[var(--line)]">
            {education.map((item) => (
              <article key={item.id} className="py-6">
                <p className="tnum text-xs text-[var(--subtle)]">
                  {[item.startDate, item.endDate].filter(Boolean).join(' — ')}
                </p>
                <h3 className="mt-2 font-medium">{item.degree}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.institution}
                  {item.grade ? ` · ${item.grade}` : ''}
                </p>
                {item.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {certifications.length > 0 ? (
        <Section label="Certifications">
          <div className="divide-y divide-[var(--line)]">
            {certifications.map((cert) => {
              const body = (
                <>
                  {cert.issuedDate ? (
                    <p className="tnum text-xs text-[var(--subtle)]">
                      {cert.issuedDate}
                    </p>
                  ) : null}
                  <h3 className="mt-2 font-medium">
                    {cert.name}
                    {cert.credentialUrl ? (
                      <span className="ml-2 text-sm font-normal text-[var(--subtle)]">
                        ↗
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{cert.issuer}</p>
                  {cert.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {cert.description}
                    </p>
                  ) : null}
                </>
              );

              return cert.credentialUrl ? (
                <Link
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="-mx-3 block rounded-sm px-3 py-6 transition-colors hover:bg-[var(--hover)]"
                >
                  {body}
                </Link>
              ) : (
                <article key={cert.id} className="py-6">
                  {body}
                </article>
              );
            })}
          </div>
        </Section>
      ) : null}

      {stack.length > 0 ? (
        <Section label="Stack">
          <dl className="space-y-5">
            {stack.map((group) => (
              <div key={group.category}>
                <dt className="text-xs text-[var(--subtle)]">{group.category}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  {group.items.map((skill) => skill.name).join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--line)] py-12">
      <h2 className="eyebrow mb-4">{label}</h2>
      {children}
    </section>
  );
}

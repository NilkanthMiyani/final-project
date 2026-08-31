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
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="pt-24 pb-10 sm:pt-32 sm:pb-14">
        <SectionHeading
          as="h1"
          eyebrow="about"
          title={profile.name}
          description={[profile.role, profile.location].filter(Boolean).join(' · ')}
        />
      </header>

      {profile.bio.length > 0 ? (
        <section className="space-y-4 border-t border-[var(--line)] py-8">
          {profile.bio.map((paragraph, index) => (
            <p
              key={index}
              className="prose-body text-sm text-[var(--muted-foreground)] sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="pt-10 sm:pt-16">
          <SectionHeading eyebrow="education" title="Where I studied." />
          <div className="mt-8 border-t border-[var(--line)]">
            {education.map((item) => (
              <article
                key={item.id}
                className="grid gap-2 border-b border-[var(--line)] py-6 md:grid-cols-[11rem_1fr] md:gap-8"
              >
                <div>
                  <p className="tnum text-xs text-[var(--muted-foreground)]">
                    {[item.startDate, item.endDate].filter(Boolean).join(' → ')}
                  </p>
                  {item.grade ? (
                    <p className="mt-1.5 text-xs text-[var(--accent)]">
                      {item.grade}
                    </p>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium sm:text-base">
                    {item.degree}
                  </h3>
                  <p className="key mt-1.5">{item.institution}</p>
                  {item.description ? (
                    <p className="prose-body mt-3 text-sm text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {certifications.length > 0 ? (
        <section className="pt-10 sm:pt-16">
          <SectionHeading eyebrow="certifications" title="Verified credentials." />
          <div className="mt-8 border-t border-[var(--line)]">
            {certifications.map((cert) => (
              <CertRow key={cert.id} cert={cert} />
            ))}
          </div>
        </section>
      ) : null}

      {stack.length > 0 ? (
        <section className="pt-10 sm:pt-16">
          <SectionHeading eyebrow="stack" title="The full toolkit." />
          <dl className="mt-8 border-t border-[var(--line)]">
            {stack.map((group) => (
              <div
                key={group.category}
                className="grid gap-2 border-b border-[var(--line)] py-5 md:grid-cols-[11rem_1fr] md:gap-8"
              >
                <dt className="key pt-1">{group.category}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span key={skill.id} className="tag">
                      {skill.name}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
}

type Cert = Awaited<ReturnType<typeof getCertifications>>[number];

/** Wrapped in a link only when there is a credential to verify. */
function CertRow({ cert }: { cert: Cert }) {
  const body = (
    <>
      <div>
        <p className="tnum text-xs text-[var(--muted-foreground)]">
          {cert.issuedDate || '—'}
        </p>
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-medium sm:text-base">
          <span className="mr-1.5 text-[var(--accent)]">✓</span>
          {cert.name}
          {cert.credentialUrl ? (
            <span className="ml-2 text-xs text-[var(--muted-foreground)]">↗</span>
          ) : null}
        </h3>
        <p className="key mt-1.5">{cert.issuer}</p>
        {cert.description ? (
          <p className="prose-body mt-3 text-sm text-[var(--muted-foreground)]">
            {cert.description}
          </p>
        ) : null}
      </div>
    </>
  );

  const className =
    'grid gap-2 border-b border-[var(--line)] py-6 md:grid-cols-[11rem_1fr] md:gap-8';

  return cert.credentialUrl ? (
    <Link
      href={cert.credentialUrl}
      target="_blank"
      rel="noreferrer"
      className={`${className} transition-colors hover:bg-[var(--surface)]`}
    >
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  );
}

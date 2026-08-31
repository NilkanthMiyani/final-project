import Link from 'next/link';

import { ExperienceItem } from '@/components/experience-item';
import { ProjectList } from '@/components/project-list';
import {
  getExperience,
  getProfile,
  getProjects,
  getSkills,
  groupSkills,
} from '@/lib/content';

export default async function HomePage() {
  const [profile, experience, projects, skills] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getSkills(),
  ]);

  const featured = projects.filter((project) => project.featured);
  const selected = (featured.length > 0 ? featured : projects).slice(0, 4);
  const stack = groupSkills(skills);
  // Guard the shape: a cached payload written before `highlights` existed
  // deserialises without the field.
  const highlights = profile.highlights ?? [];

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8">
      {/* ── Intro ────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-24">
        <h1 className="display text-3xl leading-[1.15] font-medium sm:text-[2.75rem]">
          {profile.headline}
        </h1>

        {profile.subheadline ? (
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
            {profile.subheadline}
          </p>
        ) : null}

        {profile.availability ? (
          <p className="mt-6 flex items-center gap-2 text-sm text-[var(--subtle)]">
            <span className="size-1.5 rounded-full bg-current" />
            {profile.availability}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn">
            Get in touch
          </Link>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="link-btn"
            >
              Résumé
            </a>
          ) : null}
        </div>
      </section>

      {/* ── Numbers: plain text, no tiles ────────────────────────────── */}
      {highlights.length > 0 ? (
        <section className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--line)] py-10 sm:grid-cols-4">
          {highlights.map((highlight) => (
            <div key={highlight.label}>
              <p className="tnum display text-2xl font-medium">
                {highlight.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-[var(--subtle)]">
                {highlight.label}
              </p>
            </div>
          ))}
        </section>
      ) : null}

      {/* ── Work ────────────────────────────────────────────────────── */}
      {selected.length > 0 ? (
        <Section id="work" label="Selected work">
          <ProjectList projects={selected} />
          {projects.length > selected.length ? (
            <Link href="/projects" className="link mt-6 inline-block text-sm">
              All {projects.length} projects
            </Link>
          ) : null}
        </Section>
      ) : null}

      {/* ── Experience ──────────────────────────────────────────────── */}
      {experience.length > 0 ? (
        <Section id="experience" label="Experience">
          <div className="divide-y divide-[var(--line)]">
            {experience.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── Stack ───────────────────────────────────────────────────── */}
      {stack.length > 0 ? (
        <Section id="stack" label="Stack">
          <dl className="space-y-5">
            {stack.map((group) => (
              <div key={group.category}>
                <dt className="text-xs text-[var(--subtle)]">
                  {group.category}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  {group.items.map((skill) => skill.name).join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {/* ── Close ───────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--line)] py-16 sm:py-20">
        <h2 className="display max-w-md text-xl leading-snug font-medium sm:text-2xl">
          Got an infrastructure problem worth solving?
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-[var(--muted)]">
          A pipeline that&rsquo;s become a burden, a cloud bill that keeps
          climbing, or a role you think I&rsquo;d fit.
        </p>
        <Link href="/contact" className="btn mt-8">
          Start a conversation
        </Link>
      </section>
    </div>
  );
}

/** A titled block: hairline above, quiet label, content. */
function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-[var(--line)] py-14 sm:py-16"
    >
      <h2 className="eyebrow mb-6">{label}</h2>
      {children}
    </section>
  );
}

import Link from 'next/link';

import { ExperienceItem } from '@/components/experience-item';
import { ProjectRow } from '@/components/project-row';
import { SectionHeading } from '@/components/section-heading';
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
  const selected = (featured.length > 0 ? featured : projects).slice(0, 5);
  const stack = groupSkills(skills);
  const current = experience.find((item) => item.current) ?? experience[0];
  // Guard the shape: a cached payload written before `highlights` existed
  // deserialises without the field.
  const highlights = profile.highlights ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* ── Hero: a `whoami` record ──────────────────────────────────── */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20">
        {/* Blueprint grid, clipped to the hero and masked off at the bottom. */}
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-x-0 -top-12 bottom-0 -z-10"
          style={{
            maskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent 85%)',
          }}
        />

        <p className="text-sm text-[var(--muted-foreground)]">
          <span className="text-[var(--accent)]">$</span> whoami
        </p>

        <dl className="mt-6 space-y-2.5 text-sm">
          <Row label="name" value={profile.name} />
          <Row label="role" value={profile.role} />
          {profile.location ? (
            <Row label="based" value={profile.location} />
          ) : null}
          {profile.availability ? (
            <div className="grid grid-cols-[4.5rem_1fr] gap-3 sm:grid-cols-[5.5rem_1fr]">
              <dt className="key pt-0.5">status</dt>
              <dd className="flex items-center gap-2 text-[var(--accent)]">
                <span className="size-1.5 bg-[var(--accent)]" />
                {profile.availability}
              </dd>
            </div>
          ) : null}
        </dl>

        <h1 className="mt-10 max-w-3xl text-2xl leading-snug font-medium tracking-tight sm:text-4xl sm:leading-tight">
          {profile.headline}
        </h1>

        {profile.subheadline ? (
          <p className="prose-body mt-4 max-w-xl text-sm text-[var(--muted-foreground)] sm:text-base">
            {profile.subheadline}
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-accent">
            ./contact
          </Link>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              cat resume.pdf
            </a>
          ) : null}
        </div>
      </section>

      {/* ── Metrics: one bordered strip, cells divided by rules ──────── */}
      {highlights.length > 0 ? (
        <section className="grid grid-cols-2 border-t border-l border-[var(--line)] sm:grid-cols-4">
          {highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="border-r border-b border-[var(--line)] p-4 sm:p-5"
            >
              <p className="tnum text-xl font-medium text-[var(--accent)] sm:text-2xl">
                {highlight.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-[var(--muted-foreground)]">
                {highlight.label}
              </p>
            </div>
          ))}
        </section>
      ) : null}

      {/* ── Currently ───────────────────────────────────────────────── */}
      {current ? (
        <section className="mt-10">
          <div className="panel p-5 sm:p-6">
            <p className="key">currently</p>
            <p className="mt-3 text-base font-medium">
              {current.role}
              <span className="text-[var(--muted-foreground)]">
                {' '}
                @ {current.company}
              </span>
            </p>
            <p className="tnum mt-1 text-xs text-[var(--muted-foreground)]">
              {current.startDate} → {current.current ? 'present' : current.endDate}
            </p>
            {current.bullets[0] ? (
              <p className="prose-body mt-4 text-sm text-[var(--muted-foreground)]">
                {current.bullets[0]}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ── Work ────────────────────────────────────────────────────── */}
      {selected.length > 0 ? (
        <section id="work" className="scroll-mt-16 pt-16 sm:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="work"
              title="Infrastructure I've built and broken."
              description="Working repositories — Terraform state, pipeline definitions and manifests included."
            />
            <Link
              href="/projects"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)]"
            >
              ls -a →
            </Link>
          </div>

          <div className="mt-8 border-t border-[var(--line)]">
            {selected.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Experience ──────────────────────────────────────────────── */}
      {experience.length > 0 ? (
        <section id="experience" className="scroll-mt-16 pt-16 sm:pt-24">
          <SectionHeading eyebrow="experience" title="Where I've been shipping." />
          <div className="mt-8 border-t border-[var(--line)]">
            {experience.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Stack ───────────────────────────────────────────────────── */}
      {stack.length > 0 ? (
        <section id="stack" className="scroll-mt-16 pt-16 sm:pt-24">
          <SectionHeading eyebrow="stack" title="What I reach for." />
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

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-24">
        <div className="panel p-6 sm:p-10">
          <p className="text-sm text-[var(--muted-foreground)]">
            <span className="text-[var(--accent)]">$</span> ./start-a-conversation
          </p>
          <h2 className="mt-4 max-w-xl text-lg leading-snug font-medium sm:text-2xl">
            Got an infrastructure problem worth solving?
          </h2>
          <p className="prose-body mt-3 max-w-md text-sm text-[var(--muted-foreground)]">
            A pipeline that&rsquo;s become a burden, a cloud bill that keeps
            climbing, or a role you think I&rsquo;d fit.
          </p>
          <Link href="/contact" className="btn-accent mt-7">
            get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}

/** One aligned key/value line of the hero record. */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3 sm:grid-cols-[5.5rem_1fr]">
      <dt className="key pt-0.5">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

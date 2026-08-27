import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { ExperienceItem } from '@/components/experience-item';
import { Marquee } from '@/components/marquee';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
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

  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const selected = featured.length > 0 ? featured : projects.slice(0, 3);
  const stack = groupSkills(skills);
  const current = experience.find((item) => item.current) ?? experience[0];
  const marqueeItems = skills.map((skill) => skill.name);
  // Guard the shape: a cached payload written before `highlights` existed
  // deserialises without the field.
  const highlights = profile.highlights ?? [];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {/* Top padding clears the fixed header. Deliberately not min-h +
          justify-center: centering absorbs the padding, so the headline ends up
          under the header with dead space below it. */}
      <section className="pt-28 pb-20 sm:pt-40 sm:pb-28">
        <Reveal>
          {profile.availability ? (
            <span className="pill">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--cyan)] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--cyan)]" />
              </span>
              {profile.availability}
            </span>
          ) : null}
        </Reveal>

        <Reveal delay={90}>
          <h1 className="text-balance-tight mt-6 max-w-4xl text-[2.5rem] font-semibold sm:mt-7 sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="gradient-text">{profile.headline}</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg">
            {profile.subheadline}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link href="/contact" className="btn-primary">
              Let’s talk
              <ArrowRight className="size-4" />
            </Link>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                Résumé
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </Reveal>
      </section>

      {/* ── Bento ────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {highlights.map((highlight, index) => (
          <Reveal key={highlight.label} delay={index * 70}>
            <SpotlightCard className="h-full p-4 sm:p-6">
              <p
                className="tnum text-[1.875rem] font-semibold sm:text-4xl lg:text-5xl"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--violet), var(--cyan))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {highlight.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-muted-foreground sm:mt-3 sm:text-sm">
                {highlight.label}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}

        {current ? (
          <Reveal delay={80} className="col-span-2">
            <SpotlightCard className="h-full p-5 sm:p-7">
              <span className="label">Currently</span>
              <p className="mt-4 text-2xl font-semibold">{current.company}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {current.role} · {current.startDate} —{' '}
                {current.current ? 'Present' : current.endDate}
              </p>
              {current.bullets[0] ? (
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {current.bullets[0]}
                </p>
              ) : null}
            </SpotlightCard>
          </Reveal>
        ) : null}

        <Reveal delay={150} className="col-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between p-5 sm:p-7">
            <div>
              <span className="label">Toolkit</span>
              <p className="mt-4 text-2xl font-semibold">
                {skills.length} tools in rotation
              </p>
            </div>
            <Marquee items={marqueeItems} className="-mx-5 mt-5 sm:-mx-7 sm:mt-6" duration={45} />
          </SpotlightCard>
        </Reveal>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      {selected.length > 0 ? (
        <section id="work" className="scroll-mt-24 pt-20 sm:pt-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Selected work"
                title="Infrastructure I’ve built and broken."
                description="Working repositories — Terraform state, pipeline definitions and manifests included."
              />
              <Link
                href="/projects"
                className="btn-ghost shrink-0"
              >
                All projects
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {selected.map((project, index) => (
              <Reveal key={project.id} delay={index * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Experience ───────────────────────────────────────────────── */}
      {experience.length > 0 ? (
        <section id="experience" className="scroll-mt-24 pt-20 sm:pt-32">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Where I’ve been shipping."
            />
          </Reveal>

          <div className="mt-12 space-y-4">
            {experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <ExperienceItem item={item} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Stack ────────────────────────────────────────────────────── */}
      {stack.length > 0 ? (
        <section id="stack" className="scroll-mt-24 pt-20 sm:pt-32">
          <Reveal>
            <SectionHeading eyebrow="Stack" title="What I reach for." />
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {stack.map((group, index) => (
              <Reveal key={group.category} delay={index * 60}>
                <SpotlightCard className="h-full p-4 sm:p-6">
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-32">
        <Reveal>
          <SpotlightCard className="overflow-hidden p-7 text-center sm:p-16">
            <Sparkles className="mx-auto size-6 text-[var(--cyan)]" />
            <h2 className="text-balance-tight mt-6 text-[1.75rem] font-semibold sm:text-5xl">
              Got an infrastructure problem worth solving?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A pipeline that’s become a burden, a cloud bill that keeps climbing,
              or a role you think I’d fit.
            </p>
            <Link href="/contact" className="btn-primary mt-9">
              Start a conversation
              <ArrowRight className="size-4" />
            </Link>
          </SpotlightCard>
        </Reveal>
      </section>
    </div>
  );
}

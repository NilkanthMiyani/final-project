import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { ExperienceItem } from '@/components/experience-item';
import { ProjectCard } from '@/components/project-card';
import { Section } from '@/components/section';
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

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      {/* Hero */}
      <section className="fade-up py-20 md:py-32">
        <p className="label">
          {profile.name} <span className="px-1 opacity-40">/</span> {profile.role}
        </p>

        <h1 className="display mt-8 max-w-3xl text-[2.75rem] sm:text-6xl md:text-7xl">
          {profile.headline}
        </h1>

        {profile.subheadline ? (
          <p className="prose-editorial mt-8 text-lg md:text-xl">
            {profile.subheadline}
          </p>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          {profile.resumeUrl ? (
            <Link
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Résumé
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ) : null}

          <Link
            href="/contact"
            className="link-underline text-sm text-muted-foreground hover:text-foreground"
          >
            Get in touch
          </Link>

          {profile.availability ? (
            <p className="label ml-auto hidden sm:block">{profile.availability}</p>
          ) : null}
        </div>
      </section>

      {/* Selected work */}
      {selected.length > 0 ? (
        <Section
          id="work"
          index="01"
          title="Selected Work"
          action={
            <Link
              href="/projects"
              className="link-underline inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              All projects
              <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          <div className="border-t border-rule">
            {selected.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Experience */}
      {experience.length > 0 ? (
        <Section id="experience" index="02" title="Experience" className="mt-28">
          <div className="border-t border-rule">
            {experience.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Stack */}
      {stack.length > 0 ? (
        <Section id="stack" index="03" title="Stack" className="mt-28">
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

      {/* About teaser */}
      {profile.bio.length > 0 ? (
        <Section
          index="04"
          title="About"
          className="mt-28"
          action={
            <Link
              href="/about"
              className="link-underline inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Read more
              <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          <p className="display max-w-3xl text-2xl md:text-3xl">{profile.bio[0]}</p>
        </Section>
      ) : null}
    </div>
  );
}

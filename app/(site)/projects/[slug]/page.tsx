import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Reveal } from '@/components/reveal';
import { SpotlightCard } from '@/components/spotlight-card';
import { getProjects } from '@/lib/content';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((item) => item.slug === slug);

  if (!project) return { title: 'Project not found' };

  return {
    title: project.title,
    description: project.tagline || project.overview,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (await getProjects()).find((item) => item.slug === slug);

  if (!project) notFound();

  const links = [
    { label: 'Source', url: project.links.github },
    { label: 'Live', url: project.links.live },
  ].filter((link) => link.url);

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8">
      <div className="pt-28">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All projects
        </Link>
      </div>

      <header className="pt-10 pb-14">
        <Reveal>
          <h1 className="text-balance-tight text-4xl font-semibold sm:text-6xl">
            <span className="gradient-text">{project.title}</span>
          </h1>
          {project.tagline ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>
          ) : null}

          {links.length > 0 ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {links.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={index === 0 ? 'btn-primary' : 'btn-ghost'}
                >
                  {link.label}
                  <ArrowUpRight className="size-4" />
                </Link>
              ))}
            </div>
          ) : null}
        </Reveal>
      </header>

      <div className="space-y-4 pb-8">
        {project.overview ? (
          <Reveal>
            <SpotlightCard className="p-7 sm:p-9">
              <p className="label">Overview</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </SpotlightCard>
          </Reveal>
        ) : null}

        {project.features.length > 0 ? (
          <Reveal delay={70}>
            <SpotlightCard className="p-7 sm:p-9">
              <p className="label">What it does</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-baseline gap-3 text-sm">
                    <span className="tnum font-mono text-xs text-[var(--cyan)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ) : null}

        {project.outcomes.length > 0 ? (
          <Reveal delay={110}>
            <SpotlightCard className="p-7 sm:p-9">
              <p className="label">Outcome</p>
              <ul className="mt-5 space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <li
                    key={index}
                    className="relative pl-6 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="absolute left-0 top-[0.55em] size-1.5 rounded-full"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--violet), var(--cyan))',
                      }}
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ) : null}

        {project.techStack.length > 0 ? (
          <Reveal delay={150}>
            <SpotlightCard className="p-7 sm:p-9">
              <p className="label">Stack</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-[var(--glass-border)] px-3 py-1.5 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

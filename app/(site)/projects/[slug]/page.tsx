import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Section } from '@/components/section';
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
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const links = [
    { label: 'Source', url: project.links.github },
    { label: 'Live', url: project.links.live },
  ].filter((link) => link.url);

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <div className="pt-12">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All projects
        </Link>
      </div>

      <header className="fade-up py-12 md:py-16">
        <h1 className="display max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        {project.tagline ? (
          <p className="prose-editorial mt-6 text-lg">{project.tagline}</p>
        ) : null}

        {links.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {project.overview ? (
        <Section index="01" title="Overview">
          <p className="prose-editorial text-base">{project.overview}</p>
        </Section>
      ) : null}

      {project.features.length > 0 ? (
        <Section index="02" title="What it does" className="mt-24">
          <ul className="border-t border-rule">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-baseline gap-5 border-b border-rule py-4"
              >
                <span className="tnum font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.outcomes.length > 0 ? (
        <Section index="03" title="Outcome" className="mt-24">
          <ul className="space-y-3">
            {project.outcomes.map((outcome, index) => (
              <li
                key={index}
                className="prose-editorial relative pl-5 text-sm before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-rule"
              >
                {outcome}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.techStack.length > 0 ? (
        <Section
          index={project.outcomes.length > 0 ? '04' : '03'}
          title="Stack"
          className="mt-24"
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {project.techStack.map((tech) => (
              <li key={tech} className="font-mono text-sm text-muted-foreground">
                {tech}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  );
}

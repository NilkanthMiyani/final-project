import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    { label: 'source', url: project.links.github },
    { label: 'live', url: project.links.live },
  ].filter((link) => link.url);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="pt-24 sm:pt-32">
        <Link
          href="/projects"
          className="text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)]"
        >
          ← cd ../projects
        </Link>
      </div>

      <header className="border-b border-[var(--line)] pt-8 pb-10">
        <p className="path">projects/{project.slug}</p>
        <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        {project.tagline ? (
          <p className="prose-body mt-4 max-w-2xl text-sm text-[var(--muted-foreground)] sm:text-base">
            {project.tagline}
          </p>
        ) : null}

        {links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link, index) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={index === 0 ? 'btn-accent' : 'btn'}
              >
                {link.label} ↗
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <div className="pb-8">
        {project.overview ? (
          <Block label="overview">
            <p className="prose-body text-sm text-[var(--muted-foreground)]">
              {project.overview}
            </p>
          </Block>
        ) : null}

        {project.features.length > 0 ? (
          <Block label="what it does">
            <ul className="space-y-2.5">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[2rem_1fr] items-baseline text-sm"
                >
                  <span className="tnum text-xs text-[var(--accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="prose-body text-[var(--muted-foreground)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.outcomes.length > 0 ? (
          <Block label="outcome">
            <ul className="space-y-2.5">
              {project.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[1rem_1fr] items-baseline text-sm"
                >
                  <span className="text-[var(--accent)]">+</span>
                  <span className="prose-body text-[var(--muted-foreground)]">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.techStack.length > 0 ? (
          <Block label="stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </Block>
        ) : null}
      </div>
    </div>
  );
}

/** Label column on desktop, stacked label on phones. */
function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 border-b border-[var(--line)] py-7 md:grid-cols-[9rem_1fr] md:gap-8">
      <p className="key pt-0.5">{label}</p>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

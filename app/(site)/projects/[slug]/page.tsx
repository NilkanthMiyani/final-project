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
    { label: 'Source', url: project.links.github },
    { label: 'Live site', url: project.links.live },
  ].filter((link) => link.url);

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8">
      <div className="pt-28 sm:pt-36">
        <Link href="/projects" className="link text-sm">
          ← Projects
        </Link>
      </div>

      <header className="pt-8 pb-12">
        <h1 className="display text-3xl leading-tight font-medium sm:text-4xl">
          {project.title}
        </h1>
        {project.tagline ? (
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            {project.tagline}
          </p>
        ) : null}

        {links.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {links.map((link, index) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={index === 0 ? 'btn' : 'link-btn'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {project.overview ? (
        <Block label="Overview">
          <p className="leading-relaxed text-[var(--muted)]">{project.overview}</p>
        </Block>
      ) : null}

      {project.features.length > 0 ? (
        <Block label="What it does">
          <ul className="space-y-2.5">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="grid grid-cols-[1.5rem_1fr] text-sm leading-relaxed"
              >
                <span className="tnum text-[var(--subtle)]">{index + 1}</span>
                <span className="text-[var(--muted)]">{feature}</span>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {project.outcomes.length > 0 ? (
        <Block label="Outcome">
          <ul className="space-y-2.5">
            {project.outcomes.map((outcome, index) => (
              <li
                key={index}
                className="grid grid-cols-[0.875rem_1fr] text-sm leading-relaxed"
              >
                <span className="text-[var(--subtle)]">·</span>
                <span className="text-[var(--muted)]">{outcome}</span>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {project.techStack.length > 0 ? (
        <Block label="Stack">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {project.techStack.join(' · ')}
          </p>
        </Block>
      ) : null}
    </div>
  );
}

/** Label above, content below. One hairline per block. */
function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--line)] py-8">
      <h2 className="eyebrow mb-4">{label}</h2>
      {children}
    </section>
  );
}

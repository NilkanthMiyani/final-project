import Link from 'next/link';

import type { Project } from '@/types/content';

/**
 * Projects as a plain index: title, one line of description, the stack as
 * quiet metadata. No cards, no borders around each item — a single hairline
 * between rows is enough separation, and the whole row is the target.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="-mx-3">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={`/projects/${project.slug}`}
            className="group block rounded-sm px-3 py-5 transition-colors hover:bg-[var(--hover)]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-medium">{project.title}</h3>
              <span className="shrink-0 text-sm text-[var(--subtle)] transition-colors group-hover:text-[var(--muted)]">
                →
              </span>
            </div>

            {project.tagline ? (
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
                {project.tagline}
              </p>
            ) : null}

            {project.techStack.length > 0 ? (
              <p className="mt-3 text-xs text-[var(--subtle)]">
                {project.techStack.slice(0, 5).join(' · ')}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

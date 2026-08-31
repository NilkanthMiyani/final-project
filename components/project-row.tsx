import Link from 'next/link';

import type { Project } from '@/types/content';

/**
 * One project as a row in a directory listing rather than a card.
 *
 * Cards force every project into the same box regardless of how much it has to
 * say, and three of them across a row buries the titles. A list puts the names
 * in a single scannable column with the stack as metadata beside it — which is
 * how you'd actually read `ls -l`.
 */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-[var(--line)] py-5 transition-colors hover:bg-[var(--surface)] sm:grid-cols-[3rem_1fr_auto] sm:gap-x-5 sm:px-2"
    >
      <span className="tnum text-xs text-[var(--muted-foreground)] group-hover:text-[var(--accent)]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <h3 className="text-sm font-medium sm:text-base">
          {project.title}
          <span className="ml-2 text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
            →
          </span>
        </h3>
        {project.tagline ? (
          <p className="prose-body mt-1.5 text-sm text-[var(--muted-foreground)]">
            {project.tagline}
          </p>
        ) : null}

        {/* Stack sits under the title on phones, in its own column on desktop. */}
        <ul className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <ul className="hidden max-w-[16rem] flex-wrap justify-end gap-1.5 sm:flex">
        {project.techStack.slice(0, 4).map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}

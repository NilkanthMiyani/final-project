import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import type { Project } from '@/types/content';

/**
 * A project row: title and tagline on the left, stack on the right, the whole
 * row a link. Rows rather than cards keeps the editorial rhythm intact.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid gap-3 border-b border-rule py-7 transition-colors hover:bg-secondary/40 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10 sm:px-3 sm:-mx-3"
    >
      <div>
        <h3 className="flex items-center gap-1.5 text-[1.0625rem] font-medium leading-snug">
          {project.title}
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </h3>
        <p className="prose-editorial mt-2 text-sm">{project.tagline}</p>
      </div>

      <ul className="flex flex-wrap gap-x-3 gap-y-1 sm:max-w-[16rem] sm:justify-end">
        {project.techStack.slice(0, 4).map((tech) => (
          <li key={tech} className="font-mono text-[0.6875rem] text-muted-foreground">
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}

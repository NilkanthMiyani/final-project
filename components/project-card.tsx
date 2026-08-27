import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { SpotlightCard } from '@/components/spotlight-card';
import type { Project } from '@/types/content';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col p-5 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug font-semibold">{project.title}</h3>
          <span className="glass flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[var(--violet)] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[var(--glass-border)] px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Link>
    </SpotlightCard>
  );
}

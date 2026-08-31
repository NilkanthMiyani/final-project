import type { Metadata } from 'next';

import { ProjectRow } from '@/components/project-row';
import { SectionHeading } from '@/components/section-heading';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Infrastructure, CI/CD and cloud projects — Terraform, Kubernetes, Argo CD, AWS.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <header className="pt-24 pb-10 sm:pt-32 sm:pb-14">
        <SectionHeading
          as="h1"
          eyebrow="projects"
          title="Infrastructure I've built, broken, and rebuilt."
          description="Each one is a working repository — Terraform state, pipeline definitions and manifests included."
        />
        <p className="tnum mt-6 text-xs text-[var(--muted-foreground)]">
          {projects.length} {projects.length === 1 ? 'entry' : 'entries'}
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="border-t border-[var(--line)]">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="border-t border-[var(--line)] py-10 text-sm text-[var(--muted-foreground)]">
          No projects published yet.
        </p>
      )}
    </div>
  );
}

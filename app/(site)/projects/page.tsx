import type { Metadata } from 'next';

import { ProjectList } from '@/components/project-list';
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
    <div className="mx-auto max-w-2xl px-6 sm:px-8">
      <header className="pt-32 pb-12 sm:pt-40 sm:pb-16">
        <SectionHeading
          as="h1"
          title="Projects"
          description="Each one is a working repository — Terraform state, pipeline definitions and manifests included."
        />
      </header>

      {projects.length > 0 ? (
        <div className="border-t border-[var(--line)] pt-4">
          <ProjectList projects={projects} />
        </div>
      ) : (
        <p className="border-t border-[var(--line)] pt-8 text-[var(--muted)]">
          No projects published yet.
        </p>
      )}
    </div>
  );
}

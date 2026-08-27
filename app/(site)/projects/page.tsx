import type { Metadata } from 'next';

import { ProjectCard } from '@/components/project-card';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Infrastructure, CI/CD and cloud projects — Terraform, Kubernetes, Argo CD, AWS.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <header className="fade-up py-20 md:py-28">
        <p className="label">Projects</p>
        <h1 className="display mt-6 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
          Infrastructure I’ve built, broken, and rebuilt.
        </h1>
        <p className="prose-editorial mt-6">
          Each one is a working repository — Terraform state, pipeline definitions,
          and manifests included.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="border-t border-rule">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="prose-editorial border-t border-rule py-12">
          No projects published yet.
        </p>
      )}
    </div>
  );
}

import type { Metadata } from 'next';

import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
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
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <header className="pt-36 pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Infrastructure I’ve built, broken, and rebuilt."
            description="Each one is a working repository — Terraform state, pipeline definitions and manifests included."
          />
        </Reveal>
      </header>

      {projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No projects published yet.</p>
      )}
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Infrastructure, CI/CD and cloud projects — Terraform, Kubernetes, Argo CD, AWS.',
};

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Projects</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          A lot of ideas, but some are still under construction!
        </PageHeaderHeading>
      </PageHeader>

      {projects.length > 0 ? (
        <div className="card-container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              title={project.overview}
              key={project.id}
              className="relative isolate w-full cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="leading-6">{project.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                  {project.tagline}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-muted-foreground"
                  >
                    Learn More...
                    <span className="absolute inset-0"></span>
                  </Link>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No projects published yet.</p>
      )}

      <Pager
        prevHref="/about"
        nextHref="/skills-tools"
        prevTitle="About"
        nextTitle="Skills & Tools"
      />
    </>
  );
};
export default ProjectsPage;

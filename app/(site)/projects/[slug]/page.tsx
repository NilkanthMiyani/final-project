import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Badge } from '@/components/ui/badge';
import { getProfile, getProjects } from '@/lib/content';

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

const ProjectDetails = async ({ params }: PageProps) => {
  const { slug } = await params;
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <>
        <h2 className="text-destructive">Project not found</h2>
        <Link
          href="/projects"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to projects
        </Link>
      </>
    );
  }

  const hasLinks = Boolean(project.links.live || project.links.github);

  return (
    <div>
      <div className="navigation">
        <Link
          href="/projects"
          className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-muted-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to projects
        </Link>
      </div>

      <PageHeader>
        <PageHeaderHeading>{project.title}</PageHeaderHeading>
        {project.tagline ? (
          <PageHeaderDescription>{project.tagline}</PageHeaderDescription>
        ) : null}
        {project.overview ? (
          <PageHeaderDescription>{project.overview}</PageHeaderDescription>
        ) : null}
      </PageHeader>

      {project.techStack.length > 0 ? (
        <div id="badges" className="my-4">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((tech) => (
              <Badge
                variant="outline"
                className="px-4 text-base shadow-md"
                key={tech}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 font-light lg:grid-cols-2">
        {project.features.length > 0 ? (
          <div id="features" className="my-4">
            <h2 className="text-lg font-semibold">Features</h2>
            <ul className="list-outside list-disc">
              {project.features.map((feature) => (
                <li className="ml-4 pl-2" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.outcomes.length > 0 ? (
          <div id="outcomes" className="my-4">
            <h2 className="text-lg font-semibold">Outcomes</h2>
            <ul className="list-outside list-disc">
              {project.outcomes.map((outcome) => (
                <li className="ml-4 pl-2" key={outcome}>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div id="feedback" className="my-4">
          <h2 className="text-lg font-semibold">Feedback</h2>
          <p>
            For feedback or suggestions, contact me at:{' '}
            <Link href={`mailto:${profile.email}`}>
              <span className="text-primary">{profile.email}</span>
            </Link>
          </p>
        </div>

        {hasLinks ? (
          <div id="links" className="my-4">
            <h2 className="text-lg font-semibold">
              {project.links.live && project.links.github ? 'Links' : 'Link'}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              {project.links.live ? (
                <Link href={project.links.live} target="_blank">
                  <Badge variant="default" className="px-4 text-base">
                    Live <ExternalLinkIcon className="-mt-2 h-4 w-4" />
                  </Badge>
                </Link>
              ) : null}

              {project.links.github ? (
                <Link href={project.links.github} target="_blank">
                  <Badge variant="outline" className="px-4 text-base">
                    Github <ExternalLinkIcon className="-mt-2 h-4 w-4" />
                  </Badge>
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <Pager
        prevHref="/projects"
        nextHref="/skills-tools"
        prevTitle="Projects"
        nextTitle="Skills & Tools"
      />
    </div>
  );
};

export default ProjectDetails;

import type { Metadata } from 'next';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Badge } from '@/components/ui/badge';
import { getProfile, getSkills, groupSkills } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Skills & Tools',
  description: 'The stack I reach for across cloud, Kubernetes and CI/CD.',
};

const SkillsToolsPage = async () => {
  const [skills, profile] = await Promise.all([getSkills(), getProfile()]);
  const stack = groupSkills(skills);

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Skills &amp; Tools</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Learned by shipping at 2am and debugging the morning after!
        </PageHeaderHeading>
        <PageHeaderDescription>
          {profile.subheadline ||
            'Multi-cloud infrastructure, GitOps delivery, and the pipelines underneath.'}
        </PageHeaderDescription>
      </PageHeader>

      <div className="my-6 flex flex-col gap-6">
        {stack.map((group) => (
          <div key={group.category}>
            <h2 className="mb-3 text-lg font-semibold tracking-tight">
              {group.category}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {group.items.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="outline"
                  className="border-secondary px-4 py-2 text-base shadow-sm"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Pager
        prevHref="/projects"
        nextHref="/experience"
        prevTitle="Projects"
        nextTitle="Experience"
      />
    </>
  );
};
export default SkillsToolsPage;

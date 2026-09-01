import type { Metadata } from 'next';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { getExperience } from '@/lib/content';
import type { TimelineViewerData } from '@/types/TimelineViewer.types';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Roles, teams and the infrastructure I have run.',
};

const ExperiencePage = async () => {
  const experience = await getExperience();

  // The timeline takes flat title/date/description rows, so the structured
  // record collapses here rather than in the component.
  const timeline: TimelineViewerData[] = experience.map((item) => ({
    title: `${item.role} · ${item.company}`,
    date: item.current
      ? `${item.startDate} - Present`
      : [item.startDate, item.endDate].filter(Boolean).join(' - '),
    description: item.bullets.join(' '),
    latest: item.current,
  }));

  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Experience</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          You need it to get the job, but the job&rsquo;s what gives it!
        </PageHeaderHeading>
        <PageHeaderDescription>
          Every role here has come down to the same thing: making infrastructure
          boring on purpose. Pipelines that stop being a maintenance burden,
          clusters that survive a bad afternoon, and cloud bills that go down
          rather than up.
        </PageHeaderDescription>
      </PageHeader>

      {timeline.length > 0 ? (
        <TimelineViewer data={timeline} />
      ) : (
        <p className="mb-10 text-muted-foreground">Nothing published yet.</p>
      )}

      <Pager
        prevHref="/skills-tools"
        nextHref="/education"
        prevTitle="Skills & Tools"
        nextTitle="Education"
      />
    </>
  );
};
export default ExperiencePage;

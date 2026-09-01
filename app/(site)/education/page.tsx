import type { Metadata } from 'next';
import Link from 'next/link';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { Badge } from '@/components/ui/badge';
import { getCertifications, getEducation } from '@/lib/content';
import type { TimelineViewerData } from '@/types/TimelineViewer.types';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Where I studied, and the certifications since.',
};

const EducationPage = async () => {
  const [education, certifications] = await Promise.all([
    getEducation(),
    getCertifications(),
  ]);

  const timeline: TimelineViewerData[] = education.map((item) => ({
    title: [item.degree, item.institution].filter(Boolean).join(' · '),
    date: [item.startDate, item.endDate].filter(Boolean).join(' - '),
    description: [item.description, item.grade && `Grade: ${item.grade}`]
      .filter(Boolean)
      .join(' '),
  }));

  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Education</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Where the fundamentals came from.
        </PageHeaderHeading>
        <PageHeaderDescription>
          The degree taught me how systems are supposed to work. Everything since
          has been learning how they actually behave at 3am.
        </PageHeaderDescription>
      </PageHeader>

      {timeline.length > 0 ? (
        <TimelineViewer data={timeline} />
      ) : (
        <p className="mb-10 text-muted-foreground">Nothing published yet.</p>
      )}

      {/*
        Certifications have no page of their own in the sidebar, so they sit
        here — they are the same claim as the degree, just more recent.
      */}
      {certifications.length > 0 ? (
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            Certifications
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {certifications.map((cert) =>
              cert.credentialUrl ? (
                <Link
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Badge variant="outline" className="px-4 py-2 text-base shadow-sm">
                    {cert.name}
                    {cert.issuer ? (
                      <span className="ml-2 font-normal text-muted-foreground">
                        {cert.issuer}
                      </span>
                    ) : null}
                  </Badge>
                </Link>
              ) : (
                <Badge
                  key={cert.id}
                  variant="outline"
                  className="px-4 py-2 text-base shadow-sm"
                >
                  {cert.name}
                  {cert.issuer ? (
                    <span className="ml-2 font-normal text-muted-foreground">
                      {cert.issuer}
                    </span>
                  ) : null}
                </Badge>
              )
            )}
          </div>
        </div>
      ) : null}

      <Pager
        prevHref="/experience"
        nextHref="/contact"
        prevTitle="Experience"
        nextTitle="Contact"
      />
    </>
  );
};
export default EducationPage;

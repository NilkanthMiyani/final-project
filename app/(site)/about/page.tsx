import type { Metadata } from 'next';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { getProfile } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, focus, and how I work.',
};

const AboutMePage = async () => {
  const profile = await getProfile();
  const firstName = profile.name.split(' ')[0];

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>About {firstName}</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          More than just a title—let&rsquo;s dive deeper!
        </PageHeaderHeading>

        {profile.bio.length > 0 ? (
          profile.bio.map((paragraph, index) => (
            <PageHeaderDescription key={index}>{paragraph}</PageHeaderDescription>
          ))
        ) : (
          <PageHeaderDescription>{profile.subheadline}</PageHeaderDescription>
        )}
      </PageHeader>

      <Pager
        prevHref="/"
        nextHref="/projects"
        prevTitle="Introduction"
        nextTitle="Projects"
      />
    </>
  );
};
export default AboutMePage;

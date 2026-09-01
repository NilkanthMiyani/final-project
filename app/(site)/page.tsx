import { ExternalLink, Mail } from 'lucide-react';
import Link from 'next/link';

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Button } from '@/components/ui/button';
import { getProfile } from '@/lib/content';

const IntroductionPage = async () => {
  const profile = await getProfile();

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{profile.name}</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          {profile.headline}
        </PageHeaderHeading>
        {profile.subheadline ? (
          <PageHeaderDescription>{profile.subheadline}</PageHeaderDescription>
        ) : null}
        {profile.bio.slice(0, 1).map((paragraph, index) => (
          <PageHeaderDescription key={index}>{paragraph}</PageHeaderDescription>
        ))}
        <PageActions>
          <Button asChild size="sm" className="rounded-md">
            <Link href={profile.resumeUrl} target="_blank">
              Get Resume
              <ExternalLink className="size-3" strokeWidth={2} />
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="rounded-md">
            <Link href={`mailto:${profile.email}`}>
              <Mail className="size-4" />
              Send Mail
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Pager
        prevHref="/"
        nextHref="/about"
        prevTitle="Previous"
        nextTitle="About Me"
      />
    </>
  );
};
export default IntroductionPage;

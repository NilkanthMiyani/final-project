import type { Metadata } from 'next';
import Link from 'next/link';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Badge } from '@/components/ui/badge';
import { getProfile } from '@/lib/content';

import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about infrastructure, platform, or DevOps work.',
};

const ContactPage = async () => {
  const profile = await getProfile();

  const socials = [
    { label: 'GitHub', href: profile.socials.github },
    { label: 'LinkedIn', href: profile.socials.linkedin },
    { label: 'X', href: profile.socials.twitter },
    { label: 'Telegram', href: profile.socials.telegram },
  ].filter((item) => item.href);

  return (
    <>
      <PageHeader className="mb-8">
        <PageHeaderHeading>Contact</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          Got an infrastructure problem worth solving?
        </PageHeaderHeading>
        <PageHeaderDescription>
          A pipeline that&rsquo;s become a maintenance burden, a cloud bill that
          keeps climbing, or a role you think I&rsquo;d fit — send it over.
        </PageHeaderDescription>
      </PageHeader>

      <ContactForm />

      {socials.length > 0 ? (
        <div className="my-8">
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Elsewhere</h2>
          <div className="flex flex-wrap items-center gap-2">
            {socials.map((item) => (
              <Link key={item.label} href={item.href} target="_blank" rel="noreferrer">
                <Badge variant="outline" className="px-4 py-2 text-base shadow-sm">
                  {item.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <Pager
        prevHref="/education"
        nextHref="/"
        prevTitle="Education"
        nextTitle="Home"
      />
    </>
  );
};
export default ContactPage;

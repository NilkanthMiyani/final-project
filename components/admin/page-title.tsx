import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';

/** Thin wrapper so admin pages use the same header component as the site. */
export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <PageHeader className="mb-8">
      <PageHeaderHeading>{title}</PageHeaderHeading>
      <PageHeaderDescription>{description}</PageHeaderDescription>
    </PageHeader>
  );
}

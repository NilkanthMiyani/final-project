export const dynamic = 'force-dynamic';

import { Eye } from 'lucide-react';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { getGitHubStatsServerAction } from '@/app/actions/getGitHubStatsServerAction';
import { getViewsServerAction } from '@/app/actions/getAndSetViewsServerAction';

import GitHubGraphs from './GitHubGraphs';

const StatCard = ({
  title,
  value,
  className = '',
}: {
  title: string;
  value: string | number;
  className?: string;
}) => (
  <div
    className={`h-full w-full rounded-xl border border-border/40 p-4 ${className}`}
  >
    <h3 className="text-sm font-semibold tracking-tight text-muted-foreground">
      {title}
    </h3>
    <span className="text-3xl font-bold leading-tight tracking-tight">
      {value}
    </span>
  </div>
);

/**
 * Traffic and GitHub numbers. Admin-only: these are the owner's operational
 * metrics, not something a visitor to the portfolio needs to see.
 */
const AdminStatsPage = async () => {
  const [views, githubStats] = await Promise.all([
    getViewsServerAction(),
    getGitHubStatsServerAction(),
  ]);

  const githubStatCards = [
    { title: 'Public repositories', value: githubStats.public_repos },
    { title: 'Followers', value: githubStats.followers },
    { title: 'Following', value: githubStats.following },
    { title: 'Company', value: githubStats.company },
    { title: 'Location', value: githubStats.location },
    { title: 'Hireable', value: githubStats.hireable ? 'Yes' : 'Not set' },
  ];

  return (
    <>
      <PageHeader className="mb-8">
        <PageHeaderHeading>Stats</PageHeaderHeading>
        <PageHeaderDescription>
          Traffic and GitHub numbers for this site. Only visible here.
        </PageHeaderDescription>
      </PageHeader>

      <div className="mb-8 rounded-xl border border-border/40 p-6">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Eye className="size-4 text-primary/70" />
          Total views
        </h2>
        <div className="mb-4 h-px w-full bg-muted/60" />
        {views.success ? (
          <>
            <p className="text-5xl font-bold text-primary">{views.message}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Page visits since this site went live.
            </p>
          </>
        ) : (
          <p className="text-xl font-bold text-destructive">
            Failed to fetch views
          </p>
        )}
      </div>

      <PageHeader className="mb-4">
        <PageHeaderHeading>GitHub</PageHeaderHeading>
        <PageHeaderDescription>
          Pulled live from the GitHub API. Unauthenticated, so it can rate-limit.
        </PageHeaderDescription>
      </PageHeader>

      <div className="mb-8 flex w-full items-center justify-center rounded-xl border border-border/40 p-4">
        <GitHubGraphs />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {githubStatCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value || 'Limit reached'}
          />
        ))}
      </div>
    </>
  );
};

export default AdminStatsPage;

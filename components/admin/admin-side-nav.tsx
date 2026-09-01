'use client';

import { Loader2 } from 'lucide-react';
import Link, { useLinkStatus } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavItem = { title: string; href: string };
type NavGroup = { title: string; items: NavItem[] };

/**
 * Admin section nav.
 *
 * Same shape as the public SideNav, but every link reports its own pending
 * state. The panel is `force-dynamic` and each page hits MongoDB, so a
 * navigation costs roughly a second — long enough that an unacknowledged click
 * reads as a broken link. `useLinkStatus` marks the row the moment it is
 * clicked, and the route's `loading.tsx` takes over once the transition starts.
 */
export function AdminSideNav({
  config,
}: {
  config: { sidebarNav: NavGroup[] };
}) {
  const pathname = usePathname();
  const groups = config.sidebarNav;

  if (!groups.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-medium">
            {group.title}
          </h4>
          <div className="grid auto-rows-max grid-flow-row gap-0.5 text-sm">
            {group.items.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex h-8 w-full items-center justify-between rounded-lg px-2',
                    'hover:bg-accent hover:text-accent-foreground',
                    active
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'font-normal text-foreground'
                  )}
                >
                  {item.title}
                  <LinkSpinner />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Must be a child of the Link it reports on — that is how the hook scopes. */
function LinkSpinner() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <Loader2
      className="size-3.5 shrink-0 animate-spin text-muted-foreground"
      aria-label="Loading"
    />
  );
}

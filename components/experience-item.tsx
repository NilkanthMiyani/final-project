import type { Experience } from '@/types/content';

function formatRange(item: Experience): string {
  if (item.current) return `${item.startDate} → present`;
  if (!item.endDate || item.endDate === item.startDate) return item.startDate;
  return `${item.startDate} → ${item.endDate}`;
}

/**
 * One role, laid out as a log entry: the date range holds its own column so
 * the timeline reads down the left edge, with the record beside it.
 */
export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="grid gap-3 border-b border-[var(--line)] py-6 md:grid-cols-[11rem_1fr] md:gap-8">
      <div className="md:pt-0.5">
        <p className="tnum text-xs text-[var(--muted-foreground)]">
          {formatRange(item)}
        </p>
        {item.current ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--accent)]">
            <span className="size-1.5 bg-[var(--accent)]" />
            active
          </p>
        ) : null}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-medium sm:text-base">
          {item.role}
          <span className="text-[var(--muted-foreground)]"> @ {item.company}</span>
        </h3>
        {[item.employmentType, item.location].filter(Boolean).length > 0 ? (
          <p className="key mt-1.5">
            {[item.employmentType, item.location].filter(Boolean).join(' · ')}
          </p>
        ) : null}

        {item.bullets.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {item.bullets.map((bullet, index) => (
              <li
                key={index}
                className="prose-body grid grid-cols-[1rem_1fr] text-sm text-[var(--muted-foreground)]"
              >
                <span className="font-mono text-[var(--line-strong)]">–</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

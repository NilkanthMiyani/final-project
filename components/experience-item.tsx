import type { Experience } from '@/types/content';

function formatRange(item: Experience): string {
  if (item.current) return `${item.startDate} — Present`;
  if (!item.endDate || item.endDate === item.startDate) return item.startDate;
  return `${item.startDate} — ${item.endDate}`;
}

/** One role. The date sits above the title as quiet metadata, not in a column. */
export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="py-6">
      <p className="tnum text-xs text-[var(--subtle)]">{formatRange(item)}</p>

      <h3 className="mt-2 font-medium">
        {item.role}
        <span className="font-normal text-[var(--muted)]"> · {item.company}</span>
      </h3>

      {[item.employmentType, item.location].filter(Boolean).length > 0 ? (
        <p className="mt-1 text-sm text-[var(--subtle)]">
          {[item.employmentType, item.location].filter(Boolean).join(' · ')}
        </p>
      ) : null}

      {item.bullets.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {item.bullets.map((bullet, index) => (
            <li
              key={index}
              className="grid grid-cols-[0.875rem_1fr] text-sm leading-relaxed text-[var(--muted)]"
            >
              <span className="text-[var(--subtle)]">·</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

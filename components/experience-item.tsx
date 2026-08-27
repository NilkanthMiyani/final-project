import { SpotlightCard } from '@/components/spotlight-card';
import type { Experience } from '@/types/content';

function formatRange(item: Experience): string {
  if (item.current) return `${item.startDate} — Present`;
  if (!item.endDate || item.endDate === item.startDate) return item.startDate;
  return `${item.startDate} — ${item.endDate}`;
}

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <SpotlightCard as="article" className="p-5 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            {item.role}
            <span className="text-muted-foreground"> · {item.company}</span>
          </h3>
          <p className="label mt-2">
            {[item.employmentType, item.location].filter(Boolean).join(' · ')}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="tnum font-mono text-xs text-muted-foreground">
            {formatRange(item)}
          </span>
          {item.current ? (
            <span className="pill text-[0.6875rem]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--cyan)] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[var(--cyan)]" />
              </span>
              Current
            </span>
          ) : null}
        </div>
      </div>

      {item.bullets.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {item.bullets.map((bullet, index) => (
            <li
              key={index}
              className="relative pl-6 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className="absolute left-0 top-[0.55em] size-1.5 rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, var(--violet), var(--cyan))',
                }}
              />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </SpotlightCard>
  );
}

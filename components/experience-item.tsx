import type { Experience } from '@/types/content';

function formatRange(item: Experience): string {
  if (item.current) return `${item.startDate} — Present`;
  if (!item.endDate || item.endDate === item.startDate) return item.startDate;
  return `${item.startDate} — ${item.endDate}`;
}

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="grid gap-4 border-b border-rule py-9 last:border-0 md:grid-cols-[9.5rem_1fr] md:gap-10">
      <div className="flex items-center gap-3 md:block">
        <p className="tnum font-mono text-xs text-muted-foreground">
          {formatRange(item)}
        </p>
        {item.current ? (
          <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-widest text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            Current
          </span>
        ) : null}
      </div>

      <div>
        <h3 className="text-[1.0625rem] font-medium leading-snug">
          {item.role}
          <span className="text-muted-foreground"> · {item.company}</span>
        </h3>
        <p className="label mt-1.5">
          {[item.employmentType, item.location].filter(Boolean).join(' · ')}
        </p>

        {item.bullets.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {item.bullets.map((bullet, index) => (
              <li
                key={index}
                className="prose-editorial relative pl-5 text-sm before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-rule"
              >
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

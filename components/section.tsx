import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  index: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * A numbered editorial section: hairline rule, `01 / WORK` label, content.
 * Used for every top-level block on the site so the rhythm stays consistent.
 */
export function Section({
  id,
  index,
  title,
  action,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('rule scroll-mt-24 pt-6', className)}>
      <div className="mb-10 flex items-baseline justify-between gap-4">
        <h2 className="label">
          {index} <span className="px-1 opacity-40">/</span> {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

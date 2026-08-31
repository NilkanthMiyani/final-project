import { cn } from '@/lib/utils';

/** Quiet label, heading, optional standfirst. Used to open every block. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  /** `h1` when this heading is the page's own title; `h2` for a section. */
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('max-w-xl', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading
        className={cn(
          'display text-2xl leading-tight font-medium sm:text-3xl',
          eyebrow && 'mt-3'
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 leading-relaxed text-[var(--muted)]">{description}</p>
      ) : null}
    </div>
  );
}

import { cn } from '@/lib/utils';

/**
 * Section marker plus heading. The eyebrow is rendered as a filesystem path
 * (`~/work`), which is what gives each block its place in the terminal metaphor.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  /** `h1` when this heading is the page's own title; `h2` for a section. */
  as: Heading = 'h2',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="path">{eyebrow}</p>
      <Heading className="mt-3 text-xl font-medium tracking-tight sm:text-2xl">
        {title}
      </Heading>
      {description ? (
        <p className="prose-body mt-3 text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

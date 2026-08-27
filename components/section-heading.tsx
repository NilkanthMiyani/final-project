import { cn } from '@/lib/utils';

/** Section eyebrow plus display heading, shared by every block on the site. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <span className="pill">
        <span
          className="size-1.5 rounded-full"
          style={{
            background: 'linear-gradient(135deg, var(--violet), var(--cyan))',
          }}
        />
        <span className="font-mono tracking-widest uppercase">{eyebrow}</span>
      </span>
      <h2 className="text-balance-tight mt-5 text-[1.75rem] font-semibold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

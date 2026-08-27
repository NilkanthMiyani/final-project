import { cn } from '@/lib/utils';

/**
 * Infinite horizontal scroller. The children are rendered twice and the track
 * is translated by exactly -50%, so the loop is seamless with no JS.
 */
export function Marquee({
  items,
  className,
  duration = 40,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div className={cn('mask-fade-x overflow-hidden', className)}>
      <div
        className="flex w-max gap-3"
        style={{
          animation: `marquee-x ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={item}
                className="glass rounded-full px-4 py-2 font-mono text-xs whitespace-nowrap text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

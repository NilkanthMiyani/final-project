'use client';

import { useRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Glass surface with a soft highlight that tracks the cursor.
 *
 * Pointer position is written straight to CSS custom properties rather than
 * React state, so moving the mouse never triggers a re-render.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLElement>): void {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
    node.style.setProperty('--spot', '1');
  }

  function handleLeave(): void {
    ref.current?.style.setProperty('--spot', '0');
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        'glass gradient-ring group relative overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1',
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot,0)] transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), oklch(1 0 0 / 8%), transparent 65%)',
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}

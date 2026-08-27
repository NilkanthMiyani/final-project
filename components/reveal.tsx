'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type State = 'static' | 'hidden' | 'shown';

/**
 * Fades and lifts children into view the first time they scroll into range.
 *
 * The default state is *visible*, deliberately. An earlier version rendered
 * everything at opacity-0 and relied on IntersectionObserver to reveal it,
 * which meant any failure of that one code path left the whole page blank —
 * exactly what happened on mobile Safari.
 *
 * Now the server and the first client paint render content normally. Only
 * elements already below the fold are hidden after mount, so the user never
 * sees them change, and a failsafe timer reveals anything the observer never
 * reports on.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>('static');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Anything at or above the fold stays as rendered — animating it would
    // mean hiding something the user is already looking at.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState('hidden');

    let settled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          settled = true;
          setState('shown');
          observer.disconnect();
        }
      },
      // threshold 0 on purpose: a ratio-based threshold can never be met by an
      // element taller than the viewport, which silently strands tall sections.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);

    const failsafe = window.setTimeout(() => {
      if (!settled) setState('shown');
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        state === 'hidden' ? 'translate-y-5 opacity-0' : 'translate-y-0 opacity-100',
        className
      )}
      style={state === 'hidden' ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Animated aurora backdrop. Three blurred colour fields drifting on slow,
 * offset loops, plus a faint grid to give the glass panes something to refract.
 *
 * Fixed and non-interactive, so it costs one composited layer and never
 * participates in layout. Motion is CSS-only and disabled under
 * prefers-reduced-motion by the global rule in globals.css.
 */
export function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -left-[18%] -top-[22%] size-[46rem] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, var(--aurora-1), transparent 68%)',
          animation: 'aurora-drift 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -right-[14%] top-[6%] size-[38rem] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, var(--aurora-2), transparent 68%)',
          animation: 'aurora-drift 28s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute left-[28%] top-[52%] size-[34rem] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at center, var(--aurora-3), transparent 70%)',
          animation: 'aurora-drift 34s ease-in-out infinite',
          animationDelay: '-8s',
        }}
      />

      {/* Grid, faded out toward the edges so it never reads as a hard texture. */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(var(--glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 100% 60% at 50% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 60% at 50% 0%, #000 30%, transparent 75%)',
        }}
      />
    </div>
  );
}

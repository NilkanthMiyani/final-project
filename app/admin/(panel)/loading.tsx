/**
 * Instant skeleton for every panel navigation.
 *
 * The panel is `force-dynamic`, so each click waits on a serverless render plus
 * a Mongo round trip. Without a loading boundary the browser showed the *old*
 * page for that whole window with no feedback — which is what made the admin
 * feel frozen rather than merely slow. With one, Next can prefetch this shell
 * and swap it in on click, so navigation is acknowledged immediately.
 */
export default function AdminPanelLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="mb-8">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="mt-3 h-3.5 w-72 max-w-full rounded bg-muted" />
      </div>

      <div className="border-t border-border/40">
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between gap-4 border-b border-border/40 py-5"
          >
            <div className="min-w-0 flex-1">
              <div
                className="h-3.5 rounded bg-muted"
                style={{ width: `${58 - row * 7}%` }}
              />
              <div
                className="mt-2 h-3 rounded bg-muted"
                style={{ width: `${38 - row * 4}%` }}
              />
            </div>
            <div className="h-3.5 w-16 shrink-0 rounded bg-muted" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">Loading…</p>
    </div>
  );
}

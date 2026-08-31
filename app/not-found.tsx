import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-md">
        <p className="text-sm text-[var(--muted-foreground)]">
          <span className="text-[var(--accent)]">$</span> cd .
        </p>
        <p className="mt-3 text-sm text-[var(--destructive)]">
          error: 404 — no such file or directory
        </p>
        <h1 className="mt-6 text-xl font-medium sm:text-2xl">Nothing here.</h1>
        <p className="prose-body mt-3 text-sm text-[var(--muted-foreground)]">
          That page doesn&rsquo;t exist, or it moved somewhere more sensible.
        </p>
        <Link href="/" className="btn-accent mt-8">
          cd ~
        </Link>
      </div>
    </div>
  );
}

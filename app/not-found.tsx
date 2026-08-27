import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="text-balance-tight mt-4 text-6xl font-semibold">
          <span className="gradient-text">Nothing here.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          That page doesn’t exist, or it moved somewhere more sensible.
        </p>
        <Link href="/" className="btn-primary mt-9">
          Back home
        </Link>
      </div>
    </div>
  );
}

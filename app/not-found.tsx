import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="max-w-md">
        <p className="label">404</p>
        <h1 className="display mt-4 text-5xl">Nothing here.</h1>
        <p className="prose-editorial mt-4 text-sm">
          That page doesn’t exist, or it moved somewhere more sensible.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border-b border-foreground pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

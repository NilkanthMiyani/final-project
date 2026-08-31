import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-2xl items-center px-6 sm:px-8">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display mt-3 text-2xl font-medium sm:text-3xl">
          Nothing here.
        </h1>
        <p className="mt-4 max-w-sm leading-relaxed text-[var(--muted)]">
          That page doesn&rsquo;t exist, or it moved somewhere more sensible.
        </p>
        <Link href="/" className="btn mt-8">
          Back home
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl">
        Nothing here.
      </h1>
      <p className="max-w-sm text-muted-foreground">
        That page doesn&rsquo;t exist, or it moved somewhere more sensible.
      </p>
      <Button asChild className="rounded-md">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}

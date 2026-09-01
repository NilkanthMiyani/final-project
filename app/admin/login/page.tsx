'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? 'Login failed.');
        setPassword('');
        setPending(false);
        return;
      }

      router.replace('/');
      router.refresh();
      // Deliberately no `setPending(false)` here. The navigation that follows
      // takes about a second — the panel is force-dynamic and hits Mongo — and
      // clearing the flag in a `finally` put the button back to "Unlock" the
      // instant the fetch resolved, leaving that second looking like a failed
      // click. The pending state now holds until this page unmounts.
    } catch {
      setError('Network error. Try again.');
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-sm text-muted-foreground">Restricted</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tighter sm:text-3xl">
          Admin
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Enter the admin password to manage portfolio content.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <Label className="flex flex-col items-start gap-2">
            <span>Password</span>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              autoComplete="current-password"
            />
          </Label>

          {error ? (
            <p className="mt-4 text-xs text-destructive">{error}</p>
          ) : null}

          <Button
            type="submit"
            disabled={pending || !password}
            className="mt-8 w-full rounded-md"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in…
              </>
            ) : (
              'Unlock'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
        return;
      }

      router.replace('/');
      router.refresh();
    } catch {
      setError('Network error. Try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow">Restricted</p>
        <h1 className="mt-3 text-2xl font-medium">Admin</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Enter the admin password to manage portfolio content.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label className="block">
            <span className="block text-xs text-muted-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              autoComplete="current-password"
              className="field mt-1"
            />
          </label>

          {error ? (
            <p className="mt-4 text-xs text-destructive">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending || !password}
            className="btn mt-8 w-full justify-center disabled:opacity-50"
          >
            {pending ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}

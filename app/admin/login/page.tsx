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
        <p className="text-sm text-[var(--muted-foreground)]">
          <span className="text-[var(--accent)]">$</span> sudo -u admin
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight">
          authentication required
        </h1>
        <p className="prose-body mt-3 text-sm text-[var(--muted-foreground)]">
          Enter the admin password to manage portfolio content.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label className="block">
            <span className="key block">password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              autoComplete="current-password"
              className="field mt-2"
            />
          </label>

          {error ? (
            <p className="mt-4 font-mono text-xs text-[var(--destructive)]">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending || !password}
            className="btn-accent mt-8 w-full justify-center"
          >
            {pending ? 'checking…' : 'unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}

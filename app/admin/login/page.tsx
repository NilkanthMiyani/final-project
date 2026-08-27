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
        <p className="label">Restricted</p>
        <h1 className="display mt-4 text-4xl">Admin</h1>
        <p className="prose-editorial mt-3 text-sm">
          Enter the admin password to manage portfolio content.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoFocus
            autoComplete="current-password"
            className="w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-accent"
          />

          {error ? (
            <p className="mt-4 font-mono text-xs text-destructive">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending || !password}
            className="mt-8 w-full bg-foreground py-3 text-sm text-background transition-opacity hover:opacity-85 disabled:opacity-40"
          >
            {pending ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}

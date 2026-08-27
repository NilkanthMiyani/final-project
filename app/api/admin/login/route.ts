import { NextResponse } from 'next/server';

import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from '@/lib/auth';
import { verifyPassword } from '@/lib/auth-node';

export const runtime = 'nodejs';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

/**
 * Per-IP throttle. In-memory, so it resets on cold start and is not shared
 * across lambda instances — enough friction for a single-user admin, and the
 * scrypt cost does the rest.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored || !process.env.ADMIN_SESSION_SECRET) {
    console.error('ADMIN_PASSWORD_HASH or ADMIN_SESSION_SECRET is not configured.');
    return NextResponse.json({ error: 'Admin is not configured.' }, { status: 500 });
  }

  let password = '';
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!password || !(await verifyPassword(password, stored))) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  attempts.delete(ip);

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, await signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

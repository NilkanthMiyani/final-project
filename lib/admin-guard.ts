import { cookies } from 'next/headers';

import { SESSION_COOKIE, verifySession } from '@/lib/auth';

/**
 * Defense in depth. `middleware.ts` already blocks unauthenticated requests to
 * the admin host, but server actions are ordinary POSTs — every mutation
 * re-checks the session itself rather than trusting the routing layer.
 */
export async function requireAuth(): Promise<void> {
  const store = await cookies();
  const authed = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!authed) {
    throw new Error('Not authenticated.');
  }
}

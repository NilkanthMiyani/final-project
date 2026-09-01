/**
 * Edge-safe session helpers.
 *
 * Uses Web Crypto only, so these run in middleware (Edge runtime) as well as in
 * Node route handlers. Password hashing lives in `lib/auth-node.ts` because
 * scrypt is Node-only, and it is only ever needed on the login route.
 */
import { STORAGE_NAMESPACE } from '@/config/site';


export const SESSION_COOKIE = 'np_admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * `site` binds a token to the deployment that issued it.
 *
 * Two portfolios run from this repo on shared infrastructure. Without this
 * claim a session is nothing but a signed expiry, so a token minted on one
 * admin would verify on the other — the hostname split is routing, not
 * authorization, and a cookie can simply be pasted across. With it, the two
 * admins reject each other's sessions even if they share a secret.
 */
type SessionPayload = { exp: number; site: string };

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Returns a view over a plain ArrayBuffer, which is what Web Crypto requires. */
function base64UrlDecode(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, '='));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set.');
  }
  return secret;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/** Returns a signed `payload.signature` token valid for SESSION_MAX_AGE. */
export async function signSession(): Promise<string> {
  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    site: STORAGE_NAMESPACE,
  };
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign(
    'HMAC',
    await getKey(),
    encoder.encode(body)
  );
  return `${body}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/**
 * Verifies signature and expiry. Returns false rather than throwing so callers
 * can treat a malformed cookie the same as a missing one.
 */
export async function verifySession(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const [body, signature] = token.split('.');
  if (!body || !signature) return false;

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await getKey(),
      base64UrlDecode(signature),
      encoder.encode(body)
    );
    if (!valid) return false;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(body))
    ) as SessionPayload;

    if (payload.site !== STORAGE_NAMESPACE) return false;

    return (
      typeof payload.exp === 'number' && payload.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

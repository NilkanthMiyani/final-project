import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';

/**
 * Routes the two hostnames of a single deployment:
 *
 *   admin.nilkanthprojects.site/*  ->  /admin/*   (session-gated)
 *   nilkanthprojects.site/admin*   ->  404        (admin is subdomain-only)
 *
 * `admin.localhost:3000` resolves in browsers without an /etc/hosts entry, so
 * the same split works in development.
 */
function isAdminHost(host: string | null): boolean {
  if (!host) return false;
  return host.split(':')[0]?.startsWith('admin.') ?? false;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const onAdminHost = isAdminHost(request.headers.get('host'));

  if (!onAdminHost) {
    // Keep the admin surface off the public hostname entirely.
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    return NextResponse.next();
  }

  const isLoginPage = pathname === '/login';
  const isLoginApi = pathname === '/api/admin/login';
  const authed = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!authed && !isLoginPage && !isLoginApi) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authed && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // API routes live at their real paths; only pages are namespaced under /admin.
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(`/admin${pathname === '/' ? '' : pathname}${search}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|ico|pdf|mp3)$).*)'],
};

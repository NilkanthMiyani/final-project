import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';
import { MAINTENANCE_HTML } from '@/lib/maintenance';

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
    /*
     * Maintenance switch. Public hostname only — the admin host is exempt so
     * content stays editable while the site is down.
     *
     * Served as 503 with Retry-After rather than a 200 holding page, so search
     * engines treat this as temporary and keep the real pages indexed. Turn it
     * off by removing MAINTENANCE_MODE from the environment and redeploying.
     */
    if (process.env.MAINTENANCE_MODE === '1') {
      return new NextResponse(MAINTENANCE_HTML, {
        status: 503,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'retry-after': '86400',
          'cache-control': 'no-store, must-revalidate',
        },
      });
    }

    // Keep the admin surface off the public hostname entirely.
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    return NextResponse.next();
  }

  // On the admin host the routes are served from the root, so an /admin-prefixed
  // URL (an old bookmark, or a hand-typed one) would rewrite to /admin/admin/*
  // and 404. Strip the prefix instead.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const stripped = pathname.slice('/admin'.length) || '/';
    return NextResponse.redirect(new URL(`${stripped}${search}`, request.url));
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

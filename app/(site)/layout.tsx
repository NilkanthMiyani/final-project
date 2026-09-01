import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import 'lenis/dist/lenis.css';

import { LenisProvider } from '@/components/providers/lenis-provider';
import { SideNav } from '@/components/side-nav';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { docsConfig } from '@/config/docs';
import { siteConfig } from '@/config/site';
import { getProfile } from '@/lib/content';

import { setViewsServerAction } from '@/app/actions/getAndSetViewsServerAction';

/** SEO copy is authored in the admin panel, so it is generated per request. */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();

  return {
    title: {
      default: `${profile.name} — ${profile.role}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.seoDescription || siteConfig.description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      siteName: profile.name,
      title: `${profile.name} — ${profile.role}`,
      description: profile.seoDescription || siteConfig.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — ${profile.role}`,
      description: profile.seoDescription || siteConfig.description,
    },
  };
}

/**
 * Docs-style shell: sticky header, sticky left section nav, content column,
 * footer. The dashed `border-grid` rules and the `container-wrapper` max width
 * are what give the layout its frame.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // Fire-and-forget: a failed counter must never block the page.
  void setViewsServerAction();

  return (
    <LenisProvider>
      <div vaul-drawer-wrapper="">
        <div className="relative flex min-h-svh flex-col bg-background">
          <div data-wrapper="" className="border-grid flex flex-1 flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col">
              <div className="container-wrapper">
                <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                  <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
                    <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
                      <SideNav config={docsConfig} />
                    </div>
                  </aside>
                  <div className="flex flex-1 flex-col py-6 pr-4 lg:py-8">
                    {children}
                  </div>
                </div>
              </div>
            </main>
            <SiteFooter />
          </div>
        </div>
      </div>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''} />
      <Analytics />
      <SpeedInsights />
    </LenisProvider>
  );
}

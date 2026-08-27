import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { Aurora } from '@/components/aurora';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/config/site';
import { getProfile } from '@/lib/content';

/** SEO copy is authored in the admin panel, so it is generated per request. */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();

  return {
    title: {
      default: `${profile.name} — ${profile.role}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.seoDescription,
    keywords: profile.seoKeywords,
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      siteName: profile.name,
      title: `${profile.name} — ${profile.role}`,
      description: profile.seoDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — ${profile.role}`,
      description: profile.seoDescription,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Aurora />
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''} />
      <Analytics />
      <SpeedInsights />
    </LenisProvider>
  );
}

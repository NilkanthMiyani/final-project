import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — DevOps Engineer`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    'DevOps Engineer working across AWS, GCP, Azure and Hetzner on Kubernetes, GitOps delivery, CI/CD and infrastructure cost optimization.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: META_THEME_COLORS.light },
    { media: '(prefers-color-scheme: dark)', color: META_THEME_COLORS.dark },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-svh bg-background antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

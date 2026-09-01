import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex flex-col items-center justify-center space-y-2 py-4">
          <div className="max-w-3xl text-balance text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
            <span className="block sm:inline">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">
              Built with <span className="font-medium text-foreground">Next.js</span>,{' '}
              <span className="font-medium text-foreground">shadcn/ui</span> and{' '}
              <span className="font-medium text-foreground">Tailwind CSS</span>
            </span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">
              Deployed with <span className="font-medium text-foreground">Vercel</span>
            </span>
          </div>

          {/*
            The layout and component system are adapted from Aditya Domle's
            MIT-licensed portfolio. Keeping the credit here is both the decent
            thing to do and what the licence is for.
          */}
          <div className="text-center text-xs text-muted-foreground sm:text-sm">
            Design adapted from{' '}
            <Link
              href="https://github.com/adityadomle/My-Portfolio"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Aditya Domle
            </Link>{' '}
            · MIT licensed
          </div>
        </div>
      </div>
    </footer>
  );
}

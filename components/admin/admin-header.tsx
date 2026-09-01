'use client';

import { ExternalLink, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { ModeSwitcher } from '@/components/mode-switcher';
import { AdminMobileNav } from '@/components/admin/admin-mobile-nav';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

/**
 * Mirrors the public SiteHeader so the admin reads as the same product — same
 * height, same blur, same button shapes. Only the contents differ.
 */
export function AdminHeader({ brand }: { brand: string }) {
  const router = useRouter();

  async function logout(): Promise<void> {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-13 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center gap-2.5">
              <Icons.logo className="h-6 w-6" />
              <span className="hidden font-semibold tracking-tight lg:inline-block">
                {brand}
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <span className="font-medium text-foreground">Admin</span>
              <span className="text-muted-foreground">{siteConfig.domain}</span>
            </nav>
          </div>

          <AdminMobileNav brand={brand} />

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-muted-foreground"
              asChild
            >
              <Link href={siteConfig.url} target="_blank" rel="noreferrer">
                View site
                <ExternalLink className="size-3" />
              </Link>
            </Button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                asChild
              >
                <div>
                  <ModeSwitcher className="h-[18px] w-[18px]" />
                </div>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Sign out"
                className="h-9 w-9 rounded-full text-muted-foreground transition-all hover:scale-105 hover:bg-muted hover:text-destructive"
              >
                <LogOut className="h-[18px] w-[18px]" />
                <span className="sr-only">Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

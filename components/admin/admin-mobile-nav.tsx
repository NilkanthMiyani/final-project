'use client';

import { X } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { ModeSwitcher } from '@/components/mode-switcher';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { adminDocsConfig } from '@/config/admin-docs';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/** Drawer nav for the admin, matching the public site's mobile nav. */
export function AdminMobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>

      <DrawerTitle className="sr-only">Admin navigation</DrawerTitle>

      <DrawerContent className="h-[88vh] border-t border-border/40 bg-background/95 backdrop-blur-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <Icons.logo className="h-5 w-5" />
              <span className="text-base font-semibold">
                {siteConfig.name} · Admin
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                <div>
                  <ModeSwitcher className="h-4 w-4" />
                </div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-6">
              {adminDocsConfig.sidebarNav.map((group) => (
                <div key={group.title} className="space-y-1">
                  <p className="px-1 pb-1 text-xs font-medium text-muted-foreground">
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                      className={cn(
                        'group flex items-center justify-between rounded-xl border border-border/40 px-4 py-3 text-sm font-medium transition-all hover:border-border hover:bg-muted/50',
                        (
                          item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href)
                        )
                          ? 'bg-muted/60'
                          : 'bg-muted/30'
                      )}
                    >
                      <span>{item.title}</span>
                      <svg
                        className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </MobileLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

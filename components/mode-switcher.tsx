'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { META_THEME_COLORS } from '@/config/site';
import { useMetaColor } from '@/hooks/use-meta-color';
import { cn } from '@/lib/utils';

export function ModeSwitcher({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const toggleTheme = React.useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setMetaColor(META_THEME_COLORS[next]);
  }, [resolvedTheme, setTheme, setMetaColor]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
    >
      <SunIcon className="hidden size-4 [html.dark_&]:block" />
      <MoonIcon className="hidden size-4 [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

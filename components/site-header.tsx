"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FiMusic } from "react-icons/fi";

import { Button } from "./ui/button";
import { ModeSwitcher } from "./mode-switcher";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "./command-menu";
import { Icons } from "./icons";

export type Identity = {
  /** Header label, admin-editable, falling back to the profile name. */
  brand: string;
  github: string;
  linkedin: string;
  resume: string;
};

/**
 * Identity is resolved from the database by the server layout and threaded down
 * as props rather than read from siteConfig: two sites run from this one repo,
 * and each must show its own links without a code change or a redeploy.
 */
export function SiteHeader({ identity }: { identity: Identity }) {
  const { brand, github, linkedin, resume } = identity;
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(new Date());
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // Format time as HH:MM:SS
  const formattedTime = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-13 items-center">
          {/* Logo/Name - Left */}
          <MainNav brand={brand} linkedin={linkedin} resume={resume} />

          {/* Mobile Nav */}
          <MobileNav brand={brand} toggleMusic={toggleMusic} playing={playing} />

          {/* Desktop Nav - Right */}
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Command Menu - Hidden on mobile */}
            <div className="hidden md:block">
              <CommandMenu />
            </div>

            {/* Live Clock */}
            <div className="hidden items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 backdrop-blur-sm lg:flex">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <span className="text-xs font-medium tabular-nums tracking-tight text-foreground">
                {formattedTime}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Music Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                onClick={toggleMusic}
                title={playing ? "Pause Music" : "Play Music"}
              >
                <FiMusic
                  className={`h-[18px] w-[18px] transition-colors ${
                    playing ? "text-pink-500" : "text-muted-foreground"
                  }`}
                />
              </Button>

              {/* Theme Toggle */}
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

              {/* GitHub */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                asChild
              >
                <Link 
                  href={github} 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-[18px] w-[18px]" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Audio */}
      <audio ref={audioRef} src="/music/theme.mp3" loop preload="auto" />
    </header>
  );
}
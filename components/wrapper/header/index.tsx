"use client";

import { cn } from "@/lib/utils";
import {Logo} from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { ModeToggle } from "@/components/mode-toggle";
import Link from 'next/link';

export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  // {
  //   label: "Features",
  //   href: "#",
  // },
  // {
  //   label: "Pricing",
  //   href: "#",
  // },
  {
    label: "About",
    href: "#",
  },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn("top-0 z-50 sticky border-transparent border-b w-full", {
        "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="flex justify-between items-center mx-auto px-4 w-full max-w-5xl h-14">
        <div className="flex items-center gap-5">
          <Link href="/">
            <Logo />
          </Link>
            
          <DesktopNav />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
        {/* <MobileNav /> */}
      </nav>
    </header>
  );
}

"use client"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { useScroll } from "@/hooks/use-scroll"
import { Button } from "@/components/ui/button"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { NavUser } from "./nav-user"
import Notification from "../notification"

export function Header() {
  const scrolled = useScroll(10)

  return (
    <header
      className={cn("top-0 z-50 sticky border-transparent border-b w-full", {
        "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="flex justify-between items-center mx-auto px-4 w-full h-14">
        <div className="flex items-center gap-5">
          <a
            className="hover:bg-muted dark:hover:bg-muted/50 px-5 py-2.5 rounded-lg"
            href="#"
          >
            <Logo />
          </a>
        </div>
        <DesktopNav />
        <div className="hidden md:flex items-center gap-3">
          <Notification />
          <NavUser />
        </div>
        <MobileNav />
      </nav>
    </header>
  )
}

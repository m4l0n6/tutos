import { cn } from "@/lib/utils"
import React from "react"
import { Portal, PortalBackdrop } from "@/components/ui/portal"
import { Button } from "@/components/ui/button"
import {
  companyLinks,
  companyLinks2,
  productLinks,
} from "./nav-links"
import { LinkItem } from "./sheard"
import { XIcon, MenuIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { NavUser } from "./nav-user"

export function MobileNav() {
    const router = useRouter()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden flex items-center gap-2">
      <NavUser />
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        <div
          className={cn(
            "transition-all",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <XIcon />
        </div>
        <div
          className={cn(
            "absolute transition-all",
            open ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <MenuIcon />
        </div>
      </Button>
      {open && (
        <Portal className="top-14">
          <PortalBackdrop />
          <div
            className={cn(
              "p-4 size-full overflow-y-auto",
              "ease-out data-[slot=open]:animate-in data-[slot=open]:zoom-in-97"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="flex flex-col gap-y-2 w-full">
              <span className="text-sm">Product</span>
              {productLinks.map((link) => (
                <LinkItem
                  className="active:bg-muted dark:active:bg-muted/50 p-2 rounded-lg"
                  key={`product-${link.label}`}
                  {...link}
                />
              ))}
              <span className="text-sm">Company</span>
              {companyLinks.map((link) => (
                <LinkItem
                  className="active:bg-muted dark:active:bg-muted/50 p-2 rounded-lg"
                  key={`company-${link.label}`}
                  {...link}
                />
              ))}
              {companyLinks2.map((link) => (
                <LinkItem
                  className="active:bg-muted dark:active:bg-muted/50 p-2 rounded-lg"
                  key={`company-${link.label}`}
                  {...link}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <Button className="w-full" variant="outline" onClick={() => router.push("/login")}>
                Sign In
              </Button>
              <Button className="w-full" onClick={() => router.push("/signup")}>
                Register
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}

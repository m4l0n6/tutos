"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CustomSidebarTrigger } from "./custom-sidebar-trigger"
import { NavUser } from "./nav-user"
import { BellIcon } from "lucide-react"
import Link from "next/link"

function checkBreadcrumb(pathname: string): string[] {
  const segments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "dashboard")

  if (segments.length === 0) {
    return ["Dashboard"]
  }

  return ["Dashboard", ...segments.map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))]
}

export function AppNavbar() {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Dashboard"])

  useEffect(() => {
    const newBreadcrumbs = checkBreadcrumb(pathname)
    setBreadcrumbs(newBreadcrumbs)
  }, [pathname])

  return (
    <header
      className={cn(
        "flex justify-between items-center gap-2 mb-6 md:px-2 pxx-4"
      )}
    >
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="data-[orientation=vertical]:self-center mr-2 h-4"
          orientation="vertical"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <Link
                  href={
                    index === 0
                      ? "/dashboard"
                      : `/dashboard/${breadcrumbs
                          .slice(1, index + 1)
                          .map((b) => b.toLowerCase())
                          .join("/")}`
                  }
                >
                  <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <Button aria-label="Notifications" size="icon" variant="ghost">
          <BellIcon />
        </Button>
        <Separator
          className="data-[orientation=vertical]:self-center h-4"
          orientation="vertical"
        />
        <NavUser />
      </div>
    </header>
  )
}

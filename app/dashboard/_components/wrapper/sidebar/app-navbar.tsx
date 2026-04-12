"use client"
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CustomSidebarTrigger } from "./custom-sidebar-trigger"
import { NavUser } from "./nav-user"
import { BellIcon } from "lucide-react"

export function AppNavbar() {
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
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
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

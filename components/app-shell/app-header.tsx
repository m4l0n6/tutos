import { cn } from "@/lib/utils"
import { DecorIcon } from "@/components/ui/decor-icon"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AppBreadcrumbs } from "./app-breadcrumbs"
import { footerNavLinks, navGroups, navLinks, SidebarNavGroup, SidebarNavItem } from "./app-shared"
import { CustomSidebarTrigger } from "./custom-sidebar-trigger"
import { NavUser } from "./nav-user"
import { SendIcon, BellIcon } from "lucide-react"
import type { MUser } from "@/types/auth"
import Notification from "@/components/notification"
import { usePathname } from "next/navigation"

interface AppHeaderProps {
  user?: MUser | null
  logout?: () => void
  navGroups?: SidebarNavGroup[]
  footerNavLinks?: SidebarNavItem[]
}

export function AppHeader({ user, logout, navGroups, footerNavLinks }: AppHeaderProps) {
  const pathname = usePathname()

  const allNavItems: SidebarNavItem[] = [
    ...(navGroups ?? []).flatMap((g) =>
      g.items.flatMap((item) =>
        item.subItems?.length ? [item, ...item.subItems] : [item]
      )
    ),
    ...(footerNavLinks ?? []),
  ]
  
  const activeItem = allNavItems.find((item) => {
    if (!item.path) return false
    const normalized = item.path.replace(/^#/, "")
    return pathname === normalized || pathname.startsWith(normalized + "/")
  })

  return (
    <header
      className={cn(
        "top-0 z-50 sticky flex justify-between items-center gap-2 px-4 md:px-6 border-b h-14 shrink-0",
        "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50"
      )}
    >
      <DecorIcon className="hidden md:block" position="bottom-left" />
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="data-[orientation=vertical]:self-center mr-2 h-4"
          orientation="vertical"
        />
        <AppBreadcrumbs page={activeItem} />
      </div>
      <div className="flex items-center gap-3">
        <Notification />
        <Separator
          className="data-[orientation=vertical]:self-center h-4"
          orientation="vertical"
        />
        <NavUser user={user} logout={logout} />
      </div>
    </header>
  )
}

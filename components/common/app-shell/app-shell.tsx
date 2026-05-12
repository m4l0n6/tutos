import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"
import type { SidebarNavItem, SidebarNavGroup } from "./app-shared"
import type { MUser } from "@/types/auth"

interface AppShellProps {
  children: React.ReactNode
  navGroups?: SidebarNavGroup[]
  footerNavLinks?: SidebarNavItem[]
  user?: MUser | null
  logout?: () => void
}

export function AppShell({
    children,
    navGroups,
    footerNavLinks,
    user,
    logout,
}: AppShellProps) {
  return (
    <SidebarProvider className={cn("[--app-wrapper-max-width:80rem]")}>
      <AppSidebar navGroups={navGroups} footerNavLinks={footerNavLinks} />
      <SidebarInset>
        <AppHeader user={user} logout={logout}  navGroups={navGroups} footerNavLinks={footerNavLinks} />
        <div
          className={cn(
            "flex flex-col flex-1",
            "mx-auto w-full max-w-(--app-wrapper-max-width)"
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

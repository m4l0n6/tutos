import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppNavbar } from "./app-navbar"
import { AppSidebar } from "./app-sidebar"
import { DashboardSkeleton } from "./dashboard-skeleton"

export function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6">
        <AppNavbar />
        <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
          {/* <DashboardSkeleton /> */}
          ok
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

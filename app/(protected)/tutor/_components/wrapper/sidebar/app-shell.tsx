import { Suspense } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppNavbar } from "./app-navbar"
import { AppSidebar } from "./app-sidebar"
import { DashboardSkeleton } from "../../dashboard-skeleton"

export async function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4 md:p-6">
        <AppNavbar />
        <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
          {/* <DashboardSkeleton /> */}
          <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

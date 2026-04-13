
import { AppShell } from "./_components/wrapper/sidebar/app-shell"
import { DashboardAuthWrapper } from "./_components/wrapper/dashboard-auth-wrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardAuthWrapper>
      <AppShell>
        {children}
      </AppShell>
    </DashboardAuthWrapper>
  )
}
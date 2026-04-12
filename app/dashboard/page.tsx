import { AppShell } from "./_components/wrapper/sidebar/app-shell"
import { DashboardAuthWrapper } from "./_components/wrapper/dashboard-auth-wrapper"

export default function DashboardPage() {
  return (
    <DashboardAuthWrapper>
      <AppShell />
    </DashboardAuthWrapper>
  )
}

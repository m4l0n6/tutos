"use client"
import { useAuth } from "@/context/AuthContext"
import { AppShell } from "./_components/app-shell"
import { Spinner } from "@/components/ui/spinner"

const DashboardPage = () => {
   const { loading } = useAuth()

    if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full h-screen">
        <Spinner className="w-12 h-12" />
        <p className="text-lg">Đang tải thông tin người dùng...</p>
      </div>
    )
    }
  return <AppShell />
}

export default DashboardPage

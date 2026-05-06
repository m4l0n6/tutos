'use client'

import { useAuth } from "@/context/AuthContext"
import { Spinner } from "@/components/ui/spinner"
import { ReactNode } from "react"

interface DashboardAuthWrapperProps {
  children: ReactNode
}

export function DashboardAuthWrapper({ children }: DashboardAuthWrapperProps) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full h-screen">
        <Spinner className="w-12 h-12" />
        <p className="text-lg">Đang tải thông tin người dùng...</p>
      </div>
    )
  }

  return <>{children}</>
}

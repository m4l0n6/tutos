"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "@/components/loading"
import { AppShell } from "./_components/wrapper/sidebar/app-shell"

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && user.role !== "TUTOR") {
      router.replace("/forbidden")
    }
  }, [user, loading])

  if (loading) return <Loading />
  if (!user || user.role !== "TUTOR") return null

  return <AppShell>{children}</AppShell>
}

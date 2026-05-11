"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "@/components/loading"
import { getToken } from "@/lib/auth"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      if (!getToken()) {
        router.replace("/login")
      }
    }
  }, [user, loading])

  if (loading) return <Loading />
  if (!user) return <Loading />

  return <>{children}</>
}

"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { saveToken } from "@/lib/auth"
import { Spinner } from "@/components/ui/spinner"
import { userKeys } from "@/hooks/queries/useUserQuery"

export default function AuthSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = searchParams.get("token")
    const error = searchParams.get("error")

    // Handle error from OAuth provider
    if (error) {
      console.error("[AuthSuccess] OAuth error:", error)
      router.replace("/login?error=auth_failed")
      return
    }

    // Check if token exists
    if (!token) {
      console.error("[AuthSuccess] No token in URL")
      router.replace("/login?error=no_token")
      return
    }

    console.log("[AuthSuccess] Token found:", token.substring(0, 20) + "...")

    // Save token (localStorage + cookie)
    const saved = saveToken(token)

    if (!saved) {
      console.error("[AuthSuccess] Failed to save token")
      router.replace("/login?error=save_failed")
      return
    }

    console.log("[AuthSuccess] Invalidating user queries...")
    
    // Invalidate user queries to trigger refetch with new token
    queryClient.invalidateQueries({ queryKey: userKeys.me() })

    // Wait for token to be saved before navigating
    // Use setTimeout to ensure localStorage is updated
    setTimeout(() => {
      console.log("[AuthSuccess] Redirecting to dashboard")
      router.replace("/dashboard")
    }, 300)
  }, [router, searchParams, queryClient])

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-screen">
      <Spinner className="w-12 h-12" />
      <p className="text-lg">Đang xử lý đăng nhập...</p>
    </div>
  )
}

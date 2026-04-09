"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export default function AuthDirection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const error = searchParams.get("error")

    // Handle error
    if (error) {
      router.replace("/login?error=auth_failed")
      return
    }

    // Check if token exists
    if (!token) {
      console.error("No token found in auth direction")
      router.replace("/login?error=no_token")
      return
    }

    try {
      // Store token in localStorage
      localStorage.setItem("access_token", token)
      
      // Also store as cookie for SSR/API routes
      document.cookie = `access_token=${token}; path=/; max-age=604800` // 7 days
      
      console.log("Token saved successfully:", token.substring(0, 20) + "...")
      
      // Redirect to dashboard
      router.replace("/dashboard")
    } catch (err) {
      console.error("Error saving token:", err)
      router.replace("/login?error=token_save_failed")
    }
  }, [router, searchParams])

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-screen">
      <Spinner className="w-12 h-12" />
      <p className="text-lg">Đang xử lý đăng nhập...</p>
    </div>
  )
}

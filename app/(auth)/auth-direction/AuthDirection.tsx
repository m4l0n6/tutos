"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export default function AuthDirection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      router.replace("/login?error=auth_failed")
      return
    }

    localStorage.setItem("access_token", token)
    router.replace("/")
  }, [router, searchParams])

  return (
    <div className="flex justify-center items-center w-full h-screen">
        <Spinner className="w-12 h-12" />
        <p className="ml-4 text-lg">Đang xử lý đăng nhập...</p>
    </div>
  )
}

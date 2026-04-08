"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loading } from "@/components/loading"

export default function AuthSuccess() {
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

  return <Loading text="Đang xử lý đăng nhập..." />
}

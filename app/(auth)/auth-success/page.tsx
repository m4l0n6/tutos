"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      router.replace("/login?error=auth_failed")
      return
    }

    localStorage.setItem("access_token", token)
    document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`

    router.replace("/")
  }, [router, searchParams])

  return <p>Đang xử lý đăng nhập...</p>
}

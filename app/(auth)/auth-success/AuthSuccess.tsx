"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { saveToken } from "@/lib/auth"
import { Spinner } from "@/components/ui/spinner"
import { userKeys } from "@/hooks/queries/useUserQuery"
import { api } from "@/lib/axios"

export default function AuthSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = searchParams.get("token")
    const error = searchParams.get("error")
    const isNewUser = searchParams.get("isNewUser")

    if (error) {
      router.replace("/login?error=auth_failed")
      return
    }

    if (!token) {
      router.replace("/login?error=no_token")
      return
    }

    const saved = saveToken(token)
    if (!saved) {
      router.replace("/login?error=save_failed")
      return
    }

    if (isNewUser) {
      router.push("/role")
      return
    }

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data.data
        queryClient.setQueryData(userKeys.me(), user)

        if (user.role === "TUTOR") router.replace("/tutor")
        else router.replace("/parent")
      })
      .catch(() => {
        router.replace("/login?error=fetch_failed")
      })
  }, [router, searchParams, queryClient])

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-screen">
      <Spinner className="w-12 h-12" />
      <p className="text-lg">Đang xử lý đăng nhập...</p>
    </div>
  )
}

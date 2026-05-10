import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { getToken } from "@/lib/auth"
import React, { useEffect, useState } from "react"

import { MUser } from "@/types/auth"

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      userId,
      avatarUrl,
      fullName,
      phone,
    }: {
      userId: string
      avatarUrl: File
      fullName: string
      phone: string
    }) => {
      const formData = new FormData()
      formData.append("avatarUrl", avatarUrl, avatarUrl.name)
      formData.append("fullName", fullName)
      formData.append("phone", phone)

      const res = await api.patch(`/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return res.data.data as MUser
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.me(), data)
    },
    onError: (error) => {
      console.error("User update failed:", error)
    },
  })
}

export function useMe() {
  const [token, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  React.useEffect(() => {
    const initialToken = getToken()
    setToken(initialToken)
    setIsReady(true) // ← đã check xong

    const handleStorageChange = () => {
      setToken(getToken())
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const query = useQuery({
    queryKey: userKeys.me(),
    queryFn: () => api.get("/auth/me").then((res) => res.data.data),
    enabled: !!token && isReady,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    ...query,
    isLoading: !isReady || query.isLoading,
  }
}

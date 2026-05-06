import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { getToken } from "@/lib/auth"
import React, {  useEffect, useState } from "react"

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
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

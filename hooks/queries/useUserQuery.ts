import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { getToken } from "@/lib/auth"
import React, {  useState } from "react"

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
}

export function useMe() {
  const [token, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  React.useEffect(() => {
    // Get initial token
    const initialToken = getToken()
    setToken(initialToken)
    
    // Watch for token changes in localStorage
    const handleStorageChange = () => {
      const newToken = getToken()
      console.log("[useMe] Token changed:", !!newToken)
      setToken(newToken)
    }

    // Listen for storage changes (from other tabs/windows)
    window.addEventListener("storage", handleStorageChange)
    
    setIsReady(true)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => api.get("/auth/me").then((res) => res.data.data),
    enabled: !!token && isReady, // chỉ fetch khi có token và component ready
    staleTime: 1000 * 60 * 5, // 5 phút
    gcTime: 1000 * 60 * 30, // 30 phút
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

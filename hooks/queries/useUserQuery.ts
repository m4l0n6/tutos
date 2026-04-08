import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { getToken } from "@/lib/auth"
import { useEffect, useState } from "react"

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
}

export function useMe() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(getToken())
  }, [])

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => api.get("/auth/me").then((res) => res.data.data),
    enabled: !!token, // chỉ fetch khi có token
    staleTime: 1000 * 60 * 5, // 5 phút
    gcTime: 1000 * 60 * 30, // 30 phút
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

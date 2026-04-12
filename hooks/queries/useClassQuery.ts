import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"

export const classKeys = {
  all: ["classes"] as const,
}

export function useGetClass() {
  return useQuery({
    queryKey: classKeys.all,
    queryFn: () => api.get("/classes").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

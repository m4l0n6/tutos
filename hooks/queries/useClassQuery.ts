import { useQuery, useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type { MClass, TClassResquestParam } from "@/types/classes"

export const classKeys = {
  all: ["classes"] as const,
}

export function useGetClass() {
  return useQuery<MClass[]>({
    queryKey: classKeys.all,
    queryFn: () => api.get("/classes").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateClassRequest() {
  return useMutation({
    mutationFn: (data: TClassResquestParam) =>
      api.post("/class-requests", data).then((res) => res.data.data),
  })
}

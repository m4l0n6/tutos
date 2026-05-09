import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { classKeys } from "./useClassQuery"

export const classApplicationKeys = {
  all: ["classApplications"] as const,
}

export function useGetClassApplication() {
  return useQuery({
    queryKey: classApplicationKeys.all,
    queryFn: () =>
      api.get("/class-applications/my").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateClassApplication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: {
      classId: string
      coverLetter: string
      proposedRate: number
    }) => api.post("/class-applications", payload).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: classApplicationKeys.all })
      queryClient.invalidateQueries({ queryKey: classKeys.all })
      console.log("Create class application succeeded:", data)
    },
    onError: (error) => {
      console.error("Create class application failed:", error)
    },
  })
}

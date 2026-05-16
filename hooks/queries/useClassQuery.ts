import { useQuery, useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type { MClass, TClassResquestParam, ClassStatus } from "@/types/classes"

export const classKeys = {
  all: ["classes"] as const,
  myParent: () => [...classKeys.all, "my-parent"] as const,
}

export function useGetClass() {
  return useQuery<MClass[]>({
    queryKey: classKeys.all,
    queryFn: () => api.get("/classes").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetTutorClass(status?: string) {
  return useQuery<MClass[]>({
    queryKey: ["classes", { status }],
    queryFn: () => {
      const params = status ? { status } : {}
      return api
        .get("/classes/tutor/my", { params })
        .then((res) => res.data.data)
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateClassRequest() {
  return useMutation({
    mutationFn: (data: TClassResquestParam) =>
      api.post("/class-requests", data).then((res) => res.data.data),
  })
}

export function useGetMyParentClasses(status?: ClassStatus) {
  return useQuery<MClass[]>({
    queryKey: [...classKeys.myParent(), status ?? "all"],
    queryFn: () => {
      const statusQuery = status ? `?status=${status}` : ""

      return api
        .get(`/classes/parent/my${statusQuery}`)
        .then((res) => res.data.data)
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetClassById(classId: string) {
  return useQuery<MClass>({
    queryKey: [...classKeys.all, classId],
    queryFn: () => api.get(`/classes/${classId}`).then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type {
  MClass,
  TClassResquestParam,
  ClassStatus,
  MClassRequest,
} from "@/types/classes"

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

export function useGetMyParentClassesRequest() {
  return useQuery<MClassRequest[]>({
    queryKey: classKeys.myParent(),
    queryFn: () => api.get("/class-requests/my").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
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

export function useGetClassById(id: string) {
  return useQuery<MClass>({
    queryKey: [...classKeys.all, id],
    queryFn: () => api.get(`/classes/${id}`).then((res) => res.data.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useConfirmTrial(classId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () =>
      api
        .patch(`/classes/${classId}/confirm-trial`)
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...classKeys.all, classId] })
    },
  })
}

interface RejectTrialPayload {
  reason: string
}

export function useRejectTrial(classId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: RejectTrialPayload) =>
      api
        .patch(`/classes/${classId}/reject-trial`, payload)
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...classKeys.all, classId] })
    },
  })
}

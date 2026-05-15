import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import type {
  MClass,
  MClassRequest,
  TClassResquestParam,
  ClassStatus,
} from "@/types/classes"

export const classKeys = {
  all: ["classes"] as const,
  myParent: () => [...classKeys.all, "my-parent"] as const,
  cancelRequest: (id: string) =>
    [...classKeys.all, "cancel-request", id] as const,
  myRequests: () => [...classKeys.all, "my-requests"] as const,
  requestDetail: (id: string) =>
    [...classKeys.all, "request-detail", id] as const,
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

export function useGetClassById(classId: string) {
  return useQuery<MClass>({
    queryKey: [...classKeys.all, classId],
    queryFn: () => api.get(`/classes/${classId}`).then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetClassRequestById(requestId: string) {
  return useQuery<MClassRequest>({
    queryKey: [...classKeys.myParent(), requestId],
    queryFn: () =>
      api.get(`/class-requests/${requestId}`).then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
  })
}

export function useCancelClassRequest(requestId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      api.patch(`/class-requests/${id}/cancel`).then((res) => res.data.data),
    onSuccess: () => {
      // Invalidate cả list lẫn detail
      queryClient.invalidateQueries({ queryKey: classKeys.myRequests() })
      queryClient.invalidateQueries({
        queryKey: classKeys.requestDetail(requestId),
      })
    },
  })
}
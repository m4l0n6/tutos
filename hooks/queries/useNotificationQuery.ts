import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"

export const notificationKeys = {
  myNotifications: ["my-notifications"] as const,
}

export function useGetMyNotifications() {
  return useQuery({
    queryKey: notificationKeys.myNotifications,
    queryFn: () => api.get("/notifications/my").then((res) => res.data.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      api.patch(`/notifications/${id}/read`).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.myNotifications,
      })
    },
  })
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () =>
      api.patch("/notifications/read-all").then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.myNotifications,
      })
    },
  })
}
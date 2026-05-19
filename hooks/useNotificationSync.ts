"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useNotificationSocket } from "@/hooks/websocket/useNotificationSocket"
import { notificationKeys } from "@/hooks/queries/useNotificationQuery"
import type { MNotification, TMetadata } from "@/types/notifications"

function toMNotification(entity: MNotification): MNotification {
  return {
    id: entity.id,
    userId: entity.userId,
    title: entity.title,
    body: entity.body,
    isRead: entity.isRead,
    type: entity.type as MNotification["type"],
    metadata: entity.metadata as TMetadata,
    createdAt: entity.createdAt,
  }
}

export function useNotificationSync() {
  const queryClient = useQueryClient()

  useNotificationSocket({
    onNewNotification: (incoming) => {
      queryClient.setQueryData<MNotification[]>(
        notificationKeys.myNotifications,
        (prev) => [toMNotification(incoming), ...(prev ?? [])]
      )
    },
  })
}

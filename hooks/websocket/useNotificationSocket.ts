"use client"

import { useEffect } from "react"
import { useSocketContext } from "./SocketContext"
import type { NotificationEntity } from "./types"

interface UseNotificationSocketOptions {
  onNewNotification?: (notification: NotificationEntity) => void
}

/**
 * Dùng trong trang Notifications hoặc bất kỳ component nào cần toast thông báo.
 * Socket KHÔNG được tạo ở đây — chỉ subscribe vào socket đang chạy ở Provider.
 */
export function useNotificationSocket({
  onNewNotification,
}: UseNotificationSocketOptions = {}) {
  const {
    isNotiConnected,
    unreadNoti,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    onNewNotification: subscribeNotification,
  } = useSocketContext()

  useEffect(() => {
    if (!isNotiConnected || !onNewNotification) return

    const cleanup = subscribeNotification(onNewNotification)
    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotiConnected])

  return {
    isConnected: isNotiConnected,
    unreadCount: unreadNoti,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }
}

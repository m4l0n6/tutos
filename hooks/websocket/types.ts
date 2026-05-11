export interface MessageEntity {
  _id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  attachments?: Array<{
    url: string
    type: string
    fileName?: string
  }>
  createdAt: string
  updatedAt: string
  isRead?: boolean
}

export interface NotificationEntity {
  _id: string
  userId: string
  type: "class_selected" | "payment" | "message" | "system" | string
  title: string
  content: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
  updatedAt: string
  actionUrl?: string
}

export interface UnreadCountUpdate {
  unreadCount: number
}

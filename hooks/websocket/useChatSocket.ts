"use client"

import { useEffect } from "react"
import { useSocketContext } from "./SocketContext"
import type { MessageEntity } from "./types"

interface UseChatSocketOptions {
  /**
   * Truyền vào conversationId đang mở để hook tự filter.
   * Nếu không truyền → nhận tất cả tin nhắn.
   */
  conversationId?: string
  onNewMessage?: (message: MessageEntity) => void
}

/**
 * Dùng trong trang Chat để lắng nghe tin nhắn mới.
 * Socket KHÔNG được tạo ở đây — chỉ subscribe vào socket đang chạy ở Provider.
 */
export function useChatSocket({
  conversationId,
  onNewMessage,
}: UseChatSocketOptions = {}) {
  const {
    chatSocket,
    isChatConnected,
    unreadChat,
    sendMessage,
    markConversationAsRead,
    onChatMessage,
  } = useSocketContext()

  useEffect(() => {
    if (!isChatConnected || !onNewMessage) return

    // onChatMessage trả về cleanup function — dùng trực tiếp
    const cleanup = onChatMessage((msg) => {
      // Filter theo conversationId nếu có
      if (conversationId && msg.conversationId !== conversationId) return
      onNewMessage(msg)
    })

    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatConnected, conversationId])

  return {
    isConnected: isChatConnected,
    unreadCount: unreadChat,
    sendMessage,
    markConversationAsRead,
  }
}

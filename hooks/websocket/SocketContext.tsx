"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { io, Socket } from "socket.io-client"
import { getToken } from "@/lib/auth"
import type { MessageEntity, NotificationEntity } from "./types"

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface SocketState {
  chatSocket: Socket | null
  notiSocket: Socket | null
  isChatConnected: boolean
  isNotiConnected: boolean

  // Badge counts — cập nhật tự động, dùng được ngay ở NavBar
  unreadChat: number
  unreadNoti: number

  // Actions expose ra ngoài
  sendMessage: (
    conversationId: string,
    content: string,
    attachments?: Attachment[]
  ) => void
  markConversationAsRead: (conversationId: string) => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void

  // Cho phép page/component tự đăng ký handler sự kiện
  onChatMessage: (handler: (msg: MessageEntity) => void) => () => void
  onNewNotification: (handler: (noti: NotificationEntity) => void) => () => void

  // Reconnect thủ công (dùng sau khi refresh token)
  reconnect: () => void
}

interface Attachment {
  url: string
  type: string
  fileName?: string
}

const SocketContext = createContext<SocketState | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  // Dùng useRef để giữ socket — tránh re-render khi socket object thay đổi
  const chatRef = useRef<Socket | null>(null)
  const notiRef = useRef<Socket | null>(null)

  const [isChatConnected, setIsChatConnected] = useState(false)
  const [isNotiConnected, setIsNotiConnected] = useState(false)
  const [unreadChat, setUnreadChat] = useState(0)
  const [unreadNoti, setUnreadNoti] = useState(0)

  // ── Khởi tạo socket ──────────────────────────
  const initSockets = useCallback(() => {
    const token = getToken()
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    if (!token) {
      console.warn("[SocketProvider] No token — skipping socket init")
      return
    }
    if (!baseUrl) {
      console.error("[SocketProvider] NEXT_PUBLIC_API_URL is not defined")
      return
    }

    const sharedOptions = {
      auth: { token: `Bearer ${token}` },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ["websocket", "polling"] as string[],
    }

    // Chat namespace
    const chat = io(`${baseUrl}/chat`, sharedOptions)
    chat.on("connect", () => {
      console.log("[SocketProvider] /chat connected")
      setIsChatConnected(true)
    })
    chat.on("disconnect", () => {
      console.log("[SocketProvider] /chat disconnected")
      setIsChatConnected(false)
    })
    chat.on("connect_error", (err) =>
      console.error("[SocketProvider] /chat connect_error:", err)
    )
    // Badge — lắng nghe ở đây để không phụ thuộc trang nào đang mở
    chat.on("unreadCountUpdate", ({ unreadCount }: { unreadCount: number }) => {
      setUnreadChat(unreadCount)
    })
    chatRef.current = chat

    // Notifications namespace
    const noti = io(`${baseUrl}/notifications`, sharedOptions)
    noti.on("connect", () => {
      console.log("[SocketProvider] /notifications connected")
      setIsNotiConnected(true)
    })
    noti.on("disconnect", () => {
      console.log("[SocketProvider] /notifications disconnected")
      setIsNotiConnected(false)
    })
    noti.on("connect_error", (err) =>
      console.error("[SocketProvider] /notifications connect_error:", err)
    )
    noti.on(
      "unreadNotificationCountUpdate",
      ({ unreadCount }: { unreadCount: number }) => {
        setUnreadNoti(unreadCount)
      }
    )
    notiRef.current = noti
  }, []) // Không dependency — hàm này chỉ đọc từ env và getToken()

  useEffect(() => {
    initSockets()

    return () => {
      chatRef.current?.disconnect()
      notiRef.current?.disconnect()
      chatRef.current = null
      notiRef.current = null
    }
  }, [initSockets])

  // ── Reconnect (gọi sau khi refresh token) ────
  const reconnect = useCallback(() => {
    chatRef.current?.disconnect()
    notiRef.current?.disconnect()
    chatRef.current = null
    notiRef.current = null
    initSockets()
  }, [initSockets])

  // ── Actions ───────────────────────────────────

  const sendMessage = useCallback(
    (conversationId: string, content: string, attachments?: Attachment[]) => {
      if (!chatRef.current?.connected) {
        console.warn("[SocketProvider] sendMessage: chat socket not connected")
        return
      }
      chatRef.current.emit("sendMessage", {
        conversationId,
        content,
        attachments,
      })
    },
    []
  )

  const markConversationAsRead = useCallback((conversationId: string) => {
    chatRef.current?.emit("markConversationAsRead", { conversationId })
  }, [])

  const markNotificationAsRead = useCallback((notificationId: string) => {
    notiRef.current?.emit("markNotificationAsRead", { notificationId })
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    notiRef.current?.emit("markAllNotificationsAsRead")
  }, [])

  // ── Event subscription helpers ────────────────
  // Component tự gắn/gỡ handler — trả về cleanup function

  const onChatMessage = useCallback((handler: (msg: MessageEntity) => void) => {
    const socket = chatRef.current
    if (!socket) return () => {}
    socket.on("newMessage", handler)
    return () => socket.off("newMessage", handler)
  }, [])

  const onNewNotification = useCallback(
    (handler: (noti: NotificationEntity) => void) => {
      const socket = notiRef.current
      if (!socket) return () => {}
      socket.on("newNotification", handler)
      return () => socket.off("newNotification", handler)
    },
    []
  )

  return (
    <SocketContext.Provider
      value={{
        chatSocket: chatRef.current,
        notiSocket: notiRef.current,
        isChatConnected,
        isNotiConnected,
        unreadChat,
        unreadNoti,
        sendMessage,
        markConversationAsRead,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        onChatMessage,
        onNewNotification,
        reconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

// ─────────────────────────────────────────────
// Consumer hook
// ─────────────────────────────────────────────

export function useSocketContext() {
  const ctx = useContext(SocketContext)
  if (!ctx)
    throw new Error("useSocketContext must be used within SocketProvider")
  return ctx
}

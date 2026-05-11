"use client"

import React, { createContext, useContext } from "react"
import { useChatSocket, useNotificationSocket } from "@/hooks/websocket"

/**
 * Socket Context for app-wide access to chat and notification sockets
 * Usage: Wrap your app with <SocketProvider> and use useSocketContext() in components
 */

interface SocketContextType {
  chat: ReturnType<typeof useChatSocket>
  notifications: ReturnType<typeof useNotificationSocket>
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: React.ReactNode
}

/**
 * Provider component for Socket.io connections
 * Place this in your app layout or providers.tsx
 *
 * Example usage in app/layout.tsx:
 *
 * import { SocketProvider } from '@/context/SocketProvider'
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <SocketProvider>
 *       {children}
 *     </SocketProvider>
 *   )
 * }
 */
export function SocketProvider({ children }: SocketProviderProps) {
  // Initialize both socket connections
  const chat = useChatSocket({
    onNewMessage: (message) => {
      console.log("[SocketProvider] New message from chat namespace:", message)
    },
    onUnreadCountUpdate: (data) => {
      console.log(
        "[SocketProvider] Chat unread count updated:",
        data.unreadCount
      )
    },
  })

  const notifications = useNotificationSocket({
    onNewNotification: (notification) => {
      console.log("[SocketProvider] New notification:", notification)
    },
    onUnreadCountUpdate: (data) => {
      console.log(
        "[SocketProvider] Notification unread count updated:",
        data.unreadCount
      )
    },
  })

  return (
    <SocketContext.Provider value={{ chat, notifications }}>
      {children}
    </SocketContext.Provider>
  )
}

/**
 * Hook to access socket context
 *
 * Example usage:
 *
 * 'use client'
 * import { useSocketContext } from '@/context/SocketProvider'
 *
 * export function MyComponent() {
 *   const { chat, notifications } = useSocketContext()
 *
 *   return (
 *     <div>
 *       Chat: {chat.unreadCount} unread
 *       Notifications: {notifications.unreadCount} unread
 *     </div>
 *   )
 * }
 */
export const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocketContext must be used within <SocketProvider>")
  }
  return context
}

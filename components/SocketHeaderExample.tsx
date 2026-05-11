"use client"

import React, { useState } from "react"
import { useSocketContext } from "@/context/SocketProvider"

/**
 * Example Header Component with Chat and Notification badges
 *
 * This component demonstrates how to:
 * - Display unread message count
 * - Display unread notification count
 * - Show connection status
 * - Handle marking as read
 *
 * You can customize styling and icons based on your UI library
 */

export function SocketHeaderExample() {
  const { chat, notifications } = useSocketContext()
  const [showChatPanel, setShowChatPanel] = useState(false)
  const [showNotificationPanel, setShowNotificationPanel] = useState(false)

  const isConnected = chat.isConnected && notifications.isConnected

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex-1">
        {/* Logo/Title - Replace with your own */}
        <h1 className="text-xl font-bold">My App</h1>
      </div>

      {/* Right side: Chat, Notifications, Status */}
      <div className="flex items-center gap-6">
        {/* Messages/Chat Badge */}
        <div className="group relative">
          <button
            onClick={() => {
              setShowChatPanel(!showChatPanel)
              setShowNotificationPanel(false)
            }}
            className="relative rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Messages"
          >
            {/* Chat Icon */}
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>

            {/* Badge */}
            {chat.unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
              </span>
            )}
          </button>

          {/* Chat Panel Dropdown */}
          {showChatPanel && (
            <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 rounded-lg border bg-white shadow-lg">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Messages</h2>
                  {chat.unreadCount > 0 && (
                    <button
                      onClick={() => {
                        /* Call markAsRead here */
                      }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 divide-y overflow-y-auto">
                {chat.unreadCount > 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    {chat.unreadCount} unread message
                    {chat.unreadCount > 1 ? "s" : ""}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400">
                    No new messages
                  </div>
                )}
              </div>

              {/* Connection Status in Panel */}
              <div className="border-t p-3 text-center text-xs text-gray-500">
                {chat.isConnected ? "🟢 Connected" : "🔴 Connecting..."}
              </div>
            </div>
          )}
        </div>

        {/* Notifications/Bell Badge */}
        <div className="group relative">
          <button
            onClick={() => {
              setShowNotificationPanel(!showNotificationPanel)
              setShowChatPanel(false)
            }}
            className="relative rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Notifications"
          >
            {/* Bell Icon */}
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Badge */}
            {notifications.unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {notifications.unreadCount > 9
                  ? "9+"
                  : notifications.unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Panel Dropdown */}
          {showNotificationPanel && (
            <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 rounded-lg border bg-white shadow-lg">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Notifications</h2>
                  {notifications.unreadCount > 0 && (
                    <button
                      onClick={() => notifications.markAllAsRead()}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 divide-y overflow-y-auto">
                {notifications.unreadCount > 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    {notifications.unreadCount} unread notification
                    {notifications.unreadCount > 1 ? "s" : ""}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400">
                    No new notifications
                  </div>
                )}
              </div>

              {/* Connection Status in Panel */}
              <div className="border-t p-3 text-center text-xs text-gray-500">
                {notifications.isConnected
                  ? "🟢 Connected"
                  : "🔴 Connecting..."}
              </div>
            </div>
          )}
        </div>

        {/* Overall Connection Status */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
          <span
            className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <span className="text-xs font-medium text-gray-700">
            {isConnected ? "Online" : "Offline"}
          </span>
        </div>

        {/* User Menu - Add your user menu here */}
        <div className="ml-4 border-l pl-4">
          <button className="rounded-lg p-2 transition hover:bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M12 1C6.477 1 2 5.484 2 12s4.477 11 10 11c5.523 0 10-4.477 10-10S17.523 1 12 1zm0 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

/**
 * Example usage in app/layout.tsx:
 *
 * import { SocketProvider } from '@/context/SocketProvider'
 * import { SocketHeaderExample } from '@/components/SocketHeaderExample'
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <body>
 *         <SocketProvider>
 *           <SocketHeaderExample />
 *           {children}
 *         </SocketProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */

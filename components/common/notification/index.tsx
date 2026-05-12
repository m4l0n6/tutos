"use client"

import { useState } from "react"
import {
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "./notification-item"

type NotifType = "error" | "success" | "warning" | "info"

interface Notification {
  id: number
  type: NotifType
  time: string
  label: string
  message: string
  unread?: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 0,
    type: "error",
    time: "12 minutes ago",
    label: "Webhooks",
    message: "could not reach your staging endpoint — last delivery failed.",
    unread: true,
  },
  {
    id: 1,
    type: "success",
    time: "48 minutes ago",
    label: "Slack",
    message: "is connected from Integrations and ready to notify your team.",
    unread: true,
  },
  {
    id: 2,
    type: "warning",
    time: "2 hours ago",
    label: "Analytics",
    message: "this week's usage is at 92% of your workspace plan.",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    time: "Yesterday",
    label: "Design system audit",
    message: "moved to Published in All Projects.",
  },
  {
    id: 4,
    type: "info",
    time: "Yesterday",
    label: "Members",
    message: "Sofia Chen accepted the invite and joined Efferd.",
  },
  {
    id: 5,
    type: "error",
    time: "2 days ago",
    label: "API Keys",
    message: "your production key expires in 72 hours — rotate it in Settings.",
  },
]


export default function NotificationPopover() {
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS
  )
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => n.unread).length

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="flex items-center">
      {/* Notifications popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative w-9 h-9"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="top-1.5 right-1.5 absolute bg-destructive rounded-full ring-2 ring-background w-2 h-2" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" sideOffset={8} className="p-0 w-80">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <p className="font-medium text-sm">Notifications</p>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent p-0 h-auto text-muted-foreground hover:text-foreground text-xs"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>

          {/* List */}
          {notifications.length === 0 ? (
            <div className="flex flex-col justify-center items-center p-6">
              <Bell className="mb-2 w-8 h-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">No notifications</p>
            </div>
          ) : (
             <ScrollArea className="h-80">
            <div className="divide-y divide-border">
              {notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onRead={markRead}
                />
              ))}
            </div>
          </ScrollArea>
          )}
         
        </PopoverContent>
      </Popover>
    </div>
  )
}

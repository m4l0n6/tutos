"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "./notification-item"
import { MNotification } from "@/types/notifications"
import { useMarkAllNotificationsAsRead } from "@/hooks/queries/useNotificationQuery"
import { useMarkNotificationAsRead } from "@/hooks/queries/useNotificationQuery"
import { NotificationDialog } from "./notification-dialog"
interface NotificationProps {
  data: MNotification[]
}

export default function NotificationPopover({ data }: NotificationProps) {
  const [open, setOpen] = useState(false)
   const [selectedNotif, setSelectedNotif] = useState<MNotification | null>(
     null
   )
  const { mutate: markRead } = useMarkNotificationAsRead()
  const { mutate: markAllRead } = useMarkAllNotificationsAsRead()


  const unreadCount = data.filter((n) => !n.isRead).length

  return (
    <div className="flex items-center">
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
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <p className="font-medium text-sm">Thông báo ({unreadCount})</p>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent p-0 h-auto text-muted-foreground hover:text-foreground text-xs"
              onClick={() => markAllRead()}
              disabled={unreadCount === 0}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          </div>

          {data.length === 0 ? (
            <div className="flex flex-col justify-center items-center p-6">
              <Bell className="mb-2 w-8 h-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Không có thông báo
              </p>
            </div>
          ) : (
            <ScrollArea className="h-80">
              <div className="divide-y divide-border">
                {data.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={(id) => markRead(id)}
                    onClick={(n) => {
                      setSelectedNotif(n)
                      setOpen(false)
                    }}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </PopoverContent>
      </Popover>

      <NotificationDialog
        notification={selectedNotif}
        open={!!selectedNotif}
        onOpenChange={(v) => {
          if (!v) setSelectedNotif(null)
        }}
      />
    </div>
  )
}

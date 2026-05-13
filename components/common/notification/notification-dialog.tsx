import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  Info,
} from "lucide-react"
import { MNotification, NotificationType } from "@/types/notifications"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { notifConfig } from "./notif-config" // tách ra share với notification-item

interface NotificationDialogProps {
  notification: MNotification | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationDialog({
  notification,
  open,
  onOpenChange,
}: NotificationDialogProps) {
  if (!notification) return null

  const config = notifConfig[notification.type] ?? {
    icon: Info,
    iconClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950",
  }
  const { icon: Icon, iconClass, bgClass } = config

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: vi,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex justify-center items-center rounded-full w-9 h-9 shrink-0",
                bgClass
              )}
            >
              <Icon className={cn("w-4 h-4", iconClass)} />
            </div>
            <div>
              <DialogTitle className="text-base leading-snug">
                {notification.title}
              </DialogTitle>
              <p className="mt-0.5 text-muted-foreground text-xs">{timeAgo}</p>
            </div>
          </div>
        </DialogHeader>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {notification.body}
        </p>
      </DialogContent>
    </Dialog>
  )
}

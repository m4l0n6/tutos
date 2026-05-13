import { cn } from "@/lib/utils"
import { Info, TriangleAlert, CircleCheck, CircleX, BookOpen, CreditCard, RefreshCw, Calendar, UserCheck, Handshake } from "lucide-react"
import { MNotification, NotificationType } from "@/types/notifications"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { notifConfig } from "./notif-config"

export function NotificationItem({
  notification,
  onRead,
  onClick,
}: {
  notification: MNotification
  onRead: (id: string) => void
  onClick: (notification: MNotification) => void
}) {
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
    <button
      onClick={() => {
        onRead(notification.id)
        onClick(notification)
      }}
      className={`${notification.isRead ? "bg-muted/50" : "hover:bg-muted/50"} flex w-full items-start gap-3 px-4 py-3 text-left transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none`}
    >
      <div
        className={cn(
          "flex justify-center items-center mt-0.5 rounded-full w-7 h-7 shrink-0",
          bgClass
        )}
      >
        <Icon className={cn("w-3.5 h-3.5", iconClass)} />
      </div>

      <div className="flex-1 space-y-0.5 min-w-0">
        <p className="text-[11px] text-muted-foreground">{timeAgo}</p>
        <div className="text-[13px] text-foreground leading-snug">
          <div className="font-medium">{notification.title}</div>{" "}
          <div className="text-muted-foreground">{notification.body}</div>
        </div>
      </div>

      {!notification.isRead && (
        <span className="bg-destructive mt-2 rounded-full w-1.5 h-1.5 shrink-0" />
      )}
    </button>
  )
}
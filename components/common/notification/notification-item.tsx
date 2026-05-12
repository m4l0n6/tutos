import { cn } from "@/lib/utils"
import { Info, TriangleAlert, CircleCheck, CircleX } from "lucide-react"

type NotifType = "error" | "success" | "warning" | "info"

interface Notification {
    id: number
    type: NotifType
    time: string
    label: string
    message: string
    unread?: boolean
}

const notifConfig: Record<
  NotifType,
  { icon: React.ElementType; iconClass: string; bgClass: string }
> = {
  error: {
    icon: CircleX,
    iconClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-950",
  },
  success: {
    icon: CircleCheck,
    iconClass: "text-green-700 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-950",
  },
  warning: {
    icon: TriangleAlert,
    iconClass: "text-amber-700 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950",
  },
}

export function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification
  onRead: (id: number) => void
}) {
  const { icon: Icon, iconClass, bgClass } = notifConfig[notification.type]

  return (
    <button
      onClick={() => onRead(notification.id)}
      className="flex items-start gap-3 hover:bg-muted/50 px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full text-left transition-colors"
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
        <p className="text-[11px] text-muted-foreground">{notification.time}</p>
        <p className="text-[13px] text-foreground leading-snug">
          <span className="font-medium">{notification.label}</span>{" "}
          <span className="text-muted-foreground">{notification.message}</span>
        </p>
      </div>

      {notification.unread && (
        <span className="bg-destructive mt-2 rounded-full w-1.5 h-1.5 shrink-0" />
      )}
    </button>
  )
}
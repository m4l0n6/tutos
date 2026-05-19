import { AlertCircle, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "success" | "info"
  message: string
  timestamp: string
}

interface NotificationsProps {
  notifications: Notification[]
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-h2 text-on-surface">Thông báo mới</h2>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="text-outline-variant h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex gap-4 rounded-lg p-4 ${
              notif.type === "success"
                ? "bg-primary-container/5 border-l-4 border-primary"
                : "bg-surface-container-low"
            }`}
          >
            {notif.type === "success" ? (
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
            ) : (
              <AlertCircle className="text-tertiary mt-1 h-5 w-5 shrink-0" />
            )}
            <div>
              <p className="text-body-md text-on-surface">{notif.message}</p>
              <p className="text-outline text-label-sm mt-1">
                {notif.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

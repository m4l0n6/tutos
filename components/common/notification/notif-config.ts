import {
  CircleCheck, CircleX,
  BookOpen, RefreshCw, Calendar, UserCheck, Handshake
} from "lucide-react"
import { NotificationType } from "@/types/notifications"

export const notifConfig: Record<NotificationType,
  { icon: React.ElementType; iconClass: string; bgClass: string }
> = {
  CLASS_REQUEST_CREATED: {
    icon: BookOpen,
    iconClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950",
  },
  PAYMENT_COMPLETED: {
    icon: CircleCheck,
    iconClass: "text-green-700 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-950",
  },
  PAYMENT_REFUND_REQUESTED: {
    icon: RefreshCw,
    iconClass: "text-amber-700 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950",
  },
  CLASS_TRIAL_SELECTED: {
    icon: Calendar,
    iconClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950",
  },
  CLASS_TRIAL_REJECTED: {
    icon: CircleX,
    iconClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-950",
  },
  CLASS_MATCH_CONFIRMED: {
    icon: Handshake,
    iconClass: "text-green-700 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-950",
  },
  MATCH_PARTIAL_CONFIRM: {
    icon: UserCheck,
    iconClass: "text-amber-700 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950",
  },
  TUTOR_PROFILE_VERIFIED: {
    icon: UserCheck,
    iconClass: "text-green-700 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-950",
  },
}
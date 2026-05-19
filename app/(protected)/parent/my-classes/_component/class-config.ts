import { MClass } from "@/types/classes"

export const STATUS_CONFIG: Record<
MClass["status"],
  { label: string; variant: "default" | "success" | "error" | "warning" | "info" }
> = {
  RECRUITING: {
    label: "Recruiting",
    variant: "info",
  },
  TRIAL: {
    label: "Trial",
    variant: "info",
  },
  ACTIVE: {
    label: "Active",
    variant: "success",
  },
  COMPLETED: {
    label: "Completed",
    variant: "success",
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "error",
  },
}
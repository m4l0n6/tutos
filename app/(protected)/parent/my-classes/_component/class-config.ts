import { MClass } from "@/types/classes"

export const STATUS_CONFIG: Record<
MClass["status"],
  { label: string; variant: "default" | "success" | "error" | "warning" | "info" }
> = {
  RECRUITING: {
    label: "Đang tuyển gia sư",
    variant: "info",
  },
  TRIAL: {
    label: "Đang dạy thử",
    variant: "info",
  },
  ACTIVE: {
    label: "Đã tìm được gia sư",
    variant: "success",
  },
  COMPLETED: {
    label: "Ghép thành công",
    variant: "success",
  },
  CANCELLED: {
    label: "Đã huỷ",
    variant: "error",
  },
}
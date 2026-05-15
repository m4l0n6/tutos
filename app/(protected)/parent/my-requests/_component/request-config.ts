import { MClassRequest } from "@/types/classes"

export const REQUEST_STATUS_CONFIG: Record<
  MClassRequest["status"],
  { label: string; variant: "default" | "success" | "error" | "warning" | "info" }
> = {
  PENDING: {
    label: "Chờ duyệt",
    variant: "info",
  },
  OPEN: {
    label: "Đang mở",
    variant: "info",
  },
  CLOSED: {
    label: "Đã đóng",
    variant: "success",
  },
  CANCELLED: {
    label: "Đã huỷ",
    variant: "error",
  },
}

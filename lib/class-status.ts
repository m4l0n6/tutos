
import type { ClassStatus, ApplicationStatus } from "@/types/classes"

// ─── Union types (re-export tiện dùng) ──────────────────────────────────────

export type AnyStatus = ClassStatus | ApplicationStatus

// ─── Label ──────────────────────────────────────────────────────────────────

export const CLASS_STATUS_LABEL: Record<ClassStatus, string> = {
  RECRUITING: "Recruiting",
  TRIAL: "Trial",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
}

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  PENDING: "Pending",
  TRIAL: "Trial",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  TRIAL_FAILED: "Trial Failed",
}

/** Tra label cho bất kỳ status nào (ClassStatus hoặc ApplicationStatus). */
export function getStatusLabel(status: string): string {
  return (
    (CLASS_STATUS_LABEL as Record<string, string>)[status] ??
    (APPLICATION_STATUS_LABEL as Record<string, string>)[status] ??
    status
  )
}


export const CLASS_STATUS_CLASS: Record<ClassStatus, string> = {
  RECRUITING: "border-violet-200 bg-violet-50 text-violet-700",
  TRIAL: "border-blue-200 bg-blue-50 text-blue-700",
  ACTIVE: "border-cyan-200 bg-cyan-50 text-cyan-700",
  COMPLETED: "border-gray-200 bg-gray-50 text-gray-600",
  CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
}

export const APPLICATION_STATUS_CLASS: Record<ApplicationStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  TRIAL: "border-blue-200 bg-blue-50 text-blue-700",
  ACCEPTED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  TRIAL_FAILED: "border-orange-200 bg-orange-50 text-orange-700",
}

/** Tra Tailwind badge class cho bất kỳ status nào. */
export function getStatusClass(status: string): string {
  return (
    (CLASS_STATUS_CLASS as Record<string, string>)[status] ??
    (APPLICATION_STATUS_CLASS as Record<string, string>)[status] ??
    "border-gray-200 bg-gray-50 text-gray-600"
  )
}


export const CLASS_STATUS_DOT: Record<ClassStatus, string> = {
  RECRUITING: "bg-violet-400",
  TRIAL: "bg-blue-400",
  ACTIVE: "bg-emerald-400",
  COMPLETED: "bg-gray-400",
  CANCELLED: "bg-rose-400",
}

export const APPLICATION_STATUS_DOT: Record<ApplicationStatus, string> = {
  PENDING: "bg-amber-400",
  TRIAL: "bg-blue-400",
  ACCEPTED: "bg-emerald-400",
  REJECTED: "bg-red-400",
  TRIAL_FAILED: "bg-orange-400",
}

/** Tra Tailwind dot class cho bất kỳ status nào. */
export function getStatusDot(status: string): string {
  return (
    (CLASS_STATUS_DOT as Record<string, string>)[status] ??
    (APPLICATION_STATUS_DOT as Record<string, string>)[status] ??
    "bg-gray-300"
  )
}


export const APPLICATION_STATUS_FILTER_OPTIONS: {
  value: ApplicationStatus | "ALL"
  label: string
}[] = [
  { value: "ALL", label: "Tất cả" },
  { value: "PENDING", label: "Chờ duyệt" },
  { value: "TRIAL", label: "Học thử" },
  { value: "ACCEPTED", label: "Đã chấp nhận" },
  { value: "REJECTED", label: "Đã từ chối" },
  { value: "TRIAL_FAILED", label: "Học thử thất bại" },
]

// ─── UI status variant mapping (for `Status` component variants) ───────────
export type StatusVariant = "default" | "success" | "error" | "warning" | "info"

export const CLASS_STATUS_VARIANT: Record<ClassStatus, StatusVariant> = {
  RECRUITING: "info",
  TRIAL: "info",
  ACTIVE: "success",
  COMPLETED: "success",
  CANCELLED: "error",
}

export const APPLICATION_STATUS_VARIANT: Record<
  ApplicationStatus,
  StatusVariant
> = {
  PENDING: "warning",
  TRIAL: "info",
  ACCEPTED: "success",
  REJECTED: "error",
  TRIAL_FAILED: "warning",
}

/** Tra variant (statusVariants) cho bất kỳ status nào. */
export function getStatusVariant(status: string): StatusVariant {
  return (
    (CLASS_STATUS_VARIANT as Record<string, StatusVariant>)[status] ??
    (APPLICATION_STATUS_VARIANT as Record<string, StatusVariant>)[status] ??
    "default"
  )
}

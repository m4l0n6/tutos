import type { DayOfWeek, MClass, ClassStatus } from "@/types/classes"
import { DayOfWeekLabel } from "@/lib/contant"

export const DAY_INDEX: Record<DayOfWeek, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

export function getNextSessionDate(cls: MClass): Date | null {
  if (!cls.daysOfWeek?.length) return null
  const today = new Date()
  const todayIdx = today.getDay()
  let minDiff = Infinity
  for (const day of cls.daysOfWeek) {
    let diff = DAY_INDEX[day as DayOfWeek] - todayIdx
    if (diff <= 0) diff += 7
    if (diff < minDiff) minDiff = diff
  }
  const next = new Date(today)
  next.setDate(today.getDate() + minDiff)
  return next
}

export function formatNextSession(cls: MClass): string {
  const next = getNextSessionDate(cls)
  if (!next) return ""
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()

  const dayLabel = sameDay(next, today)
    ? "Hôm nay"
    : sameDay(next, tomorrow)
      ? "Ngày mai"
      : next.toLocaleDateString("vi-VN", { weekday: "long" })

  return `${dayLabel}, ${cls.startTime} – ${cls.endTime}`
}

export function isUpcoming(cls: MClass): boolean {
  const next = getNextSessionDate(cls)
  if (!next) return false
  return (next.getTime() - Date.now()) / 86_400_000 <= 7
}

export function shouldShowNextSession(cls: MClass): boolean {
  return !COMPLETED_STATUSES.includes(cls.status as ClassStatus)
}

export type Tab = "all" | "active" | "upcoming" | "completed"

export const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "active", label: "Đang dạy" },
  { key: "upcoming", label: "Sắp tới" },
  { key: "completed", label: "Đã hoàn thành" },
]

export const ACTIVE_STATUSES: ClassStatus[] = ["ACTIVE", "TRIAL", "RECRUITING"]
export const COMPLETED_STATUSES: ClassStatus[] = ["COMPLETED", "CANCELLED"]

export const EMPTY_MSG: Record<Tab, string> = {
  all: "Bạn chưa có lớp nào.",
  active: "Bạn chưa có lớp nào đang hoạt động.",
  upcoming: "Không có lớp nào có lịch dạy trong 7 ngày tới.",
  completed: "Bạn chưa có lớp nào đã hoàn thành.",
}

export { DayOfWeekLabel }

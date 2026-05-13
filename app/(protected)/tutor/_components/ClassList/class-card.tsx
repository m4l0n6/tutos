"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Calendar } from "lucide-react"
import { DayOfWeek, MClass } from "@/types/classes"
import ClassApplyModal from "./class-apply-modal"

interface ClassCardProps {
  classData: MClass
  showApply?: boolean
  onApply?: (classId: string) => void
  statusOverride?: string
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: "Thứ 2",
  TUESDAY: "Thứ 3",
  WEDNESDAY: "Thứ 4",
  THURSDAY: "Thứ 5",
  FRIDAY: "Thứ 6",
  SATURDAY: "Thứ 7",
  SUNDAY: "Chủ Nhật",
}

const STATUS_LABELS: Record<string, string> = {
  // ClassStatus
  RECRUITING: "Đang tuyển",
  TRIAL: "Đang học thử",
  ACTIVE: "Đang hoạt động",
  COMPLETED: "Đã hoàn thành",
  CANCELLED: "Đã hủy",
  // ApplicationStatus
  PENDING: "Chờ duyệt",
  ACCEPTED: "Đã chấp nhận",
  REJECTED: "Đã từ chối",
  TRIAL_FAILED: "Học thử thất bại",
}

// Mỗi status có màu riêng biệt, không trùng nhau
const getStatusStyles = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700" // vàng
    case "TRIAL":
      return "border-blue-200 bg-blue-50 text-blue-700" // xanh dương
    case "ACCEPTED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700" // xanh lá
    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700" // đỏ
    case "TRIAL_FAILED":
      return "border-orange-200 bg-orange-50 text-orange-700" // cam
    case "RECRUITING":
      return "border-violet-200 bg-violet-50 text-violet-700" // tím
    case "ACTIVE":
      return "border-cyan-200 bg-cyan-50 text-cyan-700" // xanh cyan
    case "COMPLETED":
      return "border-gray-200 bg-gray-50 text-gray-600" // xám
    case "CANCELLED":
      return "border-rose-200 bg-rose-50 text-rose-700" // hồng đậm
    default:
      return "border-gray-200 bg-gray-50 text-gray-600"
  }
}

export const ClassCard = ({
  classData,
  showApply = true,
  onApply,
  statusOverride,
}: ClassCardProps) => {
  const [isApplyOpen, setIsApplyOpen] = useState(false)

  const daysDisplay = classData.daysOfWeek
    ?.map((d) => DAY_LABELS[d] ?? d)
    .join(", ")

  const statusToShow = statusOverride ?? classData.status
  const statusLabel = STATUS_LABELS[statusToShow?.toUpperCase()] ?? statusToShow

  return (
    <Card className="border-on-surface/12 bg-surface flex flex-col overflow-hidden border p-4">
      {/* Header */}
      <div>
        <h3 className="text-on-surface truncate text-base leading-snug font-bold">
          {classData.name}
        </h3>
        <p className="truncate text-xs text-muted-foreground">
          {classData.level?.name} · {classData.location}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {classData.category?.name}
        </p>
      </div>

      {/* Time */}
      <div className="text-on-surface-variant/60 flex flex-col text-xs">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 shrink-0" />
          <span>
            {classData.startTime} - {classData.endTime}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 shrink-0" />
          <span>{daysDisplay}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Phí: ₫{classData.acceptanceFee?.toLocaleString?.()}</span>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 px-1.5 py-0.5 text-xs ${getStatusStyles(statusToShow)}`}
        >
          {statusLabel}
        </Badge>
      </div>

      {showApply && (
        <button
          type="button"
          className="w-full rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsApplyOpen(true)}
        >
          Ứng tuyển
        </button>
      )}

      <ClassApplyModal
        open={isApplyOpen}
        onOpenChange={setIsApplyOpen}
        classData={classData}
        onSuccess={() => onApply?.(classData.id)}
      />
    </Card>
  )
}

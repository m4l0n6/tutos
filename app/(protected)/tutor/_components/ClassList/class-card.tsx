"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Calendar, User } from "lucide-react"
import { MClass } from "@/types/classes"
import ClassApplyModal from "./class-apply-modal"

interface ClassCardProps {
  classData: MClass
  showApply?: boolean
  onApply?: (classId: string) => void
  statusOverride?: string
}

export const ClassCard = ({
  classData,
  showApply = true,
  onApply,
  statusOverride,
}: ClassCardProps) => {
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const daysDisplay = classData.daysOfWeek?.join(", ")
  const statusToShow = statusOverride ?? classData.status

  const getStatusStyles = (status: string) => {
    const normalizedStatus = status?.toUpperCase()
    switch (normalizedStatus) {
      case "PENDING":
        return "border-amber-200 bg-amber-50 text-amber-700"
      case "REJECTED":
        return "border-red-200 bg-red-50 text-red-700"
      case "ACCEPTED":
        return "border-emerald-200 bg-emerald-50 text-emerald-700"
      case "RECRUITING":
        return "border-emerald-200 bg-emerald-50 text-emerald-700"
      default:
        return "border-emerald-200 bg-emerald-50 text-emerald-700"
    }
  }

  return (
    <Card className="border-on-surface/12 bg-surface flex flex-col overflow-hidden border p-4">
      {/* Header Section - Title + Level/Location */}
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

      {/* Time Information */}
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

      {/* Salary Badge - Hero Element */}
      <div className="mt-auto flex items-center justify-between gap-2">
        {/* Fee - Subtle Secondary Label */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Phí: ₫{classData.acceptanceFee?.toLocaleString?.()}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`shrink-0 px-1.5 py-0.5 text-xs ${getStatusStyles(statusToShow)}`}
          >
            {statusToShow}
          </Badge>
        </div>
      </div>

      {showApply && (
        <button
          type="button"
          className="w-full rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsApplyOpen(true)}
        >
          Apply
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

"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Calendar } from "lucide-react"
import { DayOfWeek, MClass } from "@/types/classes"
import { DayOfWeekLabel } from "@/lib/contant"
import { getStatusLabel, getStatusClass } from "@/lib/class-status"
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

  const daysDisplay = classData.daysOfWeek
    ?.map((d) => DayOfWeekLabel[d as DayOfWeek] ?? d)
    .join(", ")

  const statusToShow = statusOverride ?? classData.status

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
          className={`shrink-0 px-1.5 py-0.5 text-xs ${getStatusClass(statusToShow)}`}
        >
          {getStatusLabel(statusToShow)}
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

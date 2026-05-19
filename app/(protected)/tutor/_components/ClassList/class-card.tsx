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
    <Card className="flex flex-col bg-surface p-4 border border-on-surface/12 overflow-hidden">
      {/* Header */}
      <div>
        <h3 className="font-bold text-on-surface text-base truncate leading-snug">
          {classData.name}
        </h3>
        <p className="text-muted-foreground text-xs truncate">
          {classData.level?.name} · {classData.location}
        </p>
        <p className="text-muted-foreground text-xs truncate">
          {classData.category?.name}
        </p>
      </div>

      {/* Time */}
      <div className="flex flex-col text-on-surface-variant/60 text-xs">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 shrink-0" />
          <span>
            {classData.startTime} - {classData.endTime}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 shrink-0" />
          <span>{daysDisplay}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center gap-2 mt-auto">
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <span>Fee: ₫{classData.acceptanceFee?.toLocaleString?.()}</span>
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
          className="bg-primary hover:bg-primary/90 px-3 py-2 rounded w-full font-medium text-primary-foreground text-sm"
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

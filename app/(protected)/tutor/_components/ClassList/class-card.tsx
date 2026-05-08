"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, Calendar, User } from "lucide-react"
import { MClass } from "@/types/classes"

interface ClassCardProps {
  classData: MClass
}

export const ClassCard = ({ classData }: ClassCardProps) => {
  const daysDisplay = classData.daysOfWeek.join(", ")

  return (
    <Card className="border-on-surface/12 bg-surface flex w-[280px] flex-col overflow-hidden border p-4">
      {/* Header Section - Title + Level/Location */}
      <div>
        <h3 className="text-on-surface truncate text-base leading-snug font-bold">
          {classData.name}
        </h3>
        <p className="truncate text-xs text-muted-foreground">
          {classData.level.name} · {classData.location}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {classData.category.name}
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
        <div className="flex items-center gap-1">
          <User className="h-3 w-3 shrink-0" />
          <span>{classData.parentName}</span>
        </div>
      </div>

      {/* Salary Badge - Hero Element */}
      <div className="mt-auto flex items-center justify-between gap-2">
        {/* Fee - Subtle Secondary Label */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Phí: ₫{classData.acceptanceFee.toLocaleString()}</span>
        </div>

        <Badge
          variant="outline"
          className="shrink-0 border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-xs text-emerald-700"
        >
          {classData.status}
        </Badge>
      </div>
    </Card>
  )
}

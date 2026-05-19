"use client"

import {
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  BookOpen,
  DollarSign,
  ChevronRight,
  GraduationCap,
  Wifi,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MClass, DayOfWeek } from "@/types/classes"
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status"
import { DayOfWeekLabel } from "@/lib/contant"
import { Button } from "@/components/ui/button"
import { getStatusLabel, getStatusVariant } from "@/lib/class-status"
import { Badge } from "@/components/ui/badge"

function formatDays(daysOfWeek: DayOfWeek[]): string {
  return daysOfWeek.map((d) => DayOfWeekLabel[d]).join(", ")
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

interface TutorClassCardProps {
  classData: MClass
  onMessage?: (classData: MClass) => void
  onReview?: (classData: MClass) => void
  onViewHistory?: (classData: MClass) => void
}

export default function TutorClassCard({
  classData,
  onMessage,
  onReview,
  onViewHistory,
}: TutorClassCardProps) {
  const {
    name,
    category,
    subject,
    level,
    daysOfWeek,
    startTime,
    endTime,
    location,
    status,
    acceptanceFee,
  } = classData

  const statusLabel = getStatusLabel(status)
  const statusVariant = getStatusVariant(status)

  const isOnline =
    location.toLowerCase().includes("online") ||
    location.toLowerCase().includes("google meet") ||
    location.toLowerCase().includes("zoom")

  return (
    <Card className="group shadow-sm hover:shadow-md rounded-2xl w-full overflow-hidden transition-all hover:-translate-y-1 duration-300">
      <CardContent>
        <div className="p-4">
          {/* Header Row */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <h3 className="pr-2 font-semibold text-slate-800 text-base truncate leading-tight">
                  {name}
                </h3>
              </div>
              <Status variant={statusVariant}>
                <StatusIndicator />
                <StatusLabel>{statusLabel}</StatusLabel>
              </Status>
            </div>
            {/* Subject + Level tags */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge>
                <BookOpen className="w-3 h-3" />
                {category.name}
              </Badge>
              <Badge variant="outline">
                <BookOpen className="w-3 h-3" />
                {subject.name}
              </Badge>
              <Badge variant="outline">
                <GraduationCap className="w-3 h-3" />
                {level.name}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Schedule + Location */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 w-full">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex justify-center items-center bg-primary-50 rounded-lg shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-medium">
                {formatDays(daysOfWeek)}{" "}
                <span className="font-normal">
                  ({startTime} - {endTime})
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <div className="flex justify-center items-center bg-primary-50 rounded-lg shrink-0">
                {isOnline ? (
                  <Wifi className="w-4 h-4" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <span className="truncate">{location}</span>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 w-full">
            <div className="flex items-center gap-2 mt-3 text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Acceptance Fee:</span>
              <span className="font-semibold">
                {formatCurrency(acceptanceFee)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <User className="w-4 h-4" />
              <span>Total tutors:</span>
              <span className="font-semibold">
                {classData.totalTutorApplication}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="flex justify-items gap-2 w-full">
            <div className="flex items-center gap-2">
              {classData.status === "TRIAL" && (
                <Button size="sm" onClick={() => onMessage?.(classData)}>
                  <MessageCircle className="w-4 h-4" />
                  Message to Tutor
                </Button>
              )}

              {classData.status === "COMPLETED" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReview?.(classData)}
                >
                  <Star className="w-4 h-4" />
                  Review Tutor
                </Button>
              )}
            </div>

            <div className="flex flex-1 justify-end">
              <Button
                size="sm"
                onClick={() => onViewHistory?.(classData)}
                variant="outline"
              >
                View detail
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

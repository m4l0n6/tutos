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
    <Card className="group w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent>
        <div className="p-4">
          {/* Header Row */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate pr-2 text-base leading-tight font-semibold text-slate-800">
                  {name}
                </h3>
              </div>
              <Status variant={statusVariant}>
                <StatusIndicator />
                <StatusLabel>{statusLabel}</StatusLabel>
              </Status>
            </div>
            {/* Subject + Level tags */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge>
                <BookOpen className="h-3 w-3" />
                {category.name}
              </Badge>
              <Badge variant="outline">
                <BookOpen className="h-3 w-3" />
                {subject.name}
              </Badge>
              <Badge variant="outline">
                <GraduationCap className="h-3 w-3" />
                {level.name}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Schedule + Location */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex min-w-0 items-center gap-2">
              <div className="bg-primary-50 flex shrink-0 items-center justify-center rounded-lg">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="font-medium">
                {formatDays(daysOfWeek)}{" "}
                <span className="font-normal">
                  ({startTime} - {endTime})
                </span>
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <div className="bg-primary-50 flex shrink-0 items-center justify-center rounded-lg">
                {isOnline ? (
                  <Wifi className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
              </div>
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Acceptance Fee */}
          <div className="mt-3 flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4" />
            <span>Học phí tiếp nhận:</span>
            <span className="font-semibold">
              {formatCurrency(acceptanceFee)}
            </span>
          </div>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="justify-items flex w-full gap-2">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => onMessage?.(classData)}>
                <MessageCircle className="h-4 w-4" />
                Nhắn tin cho trung tâm
              </Button>

              {classData.status === "COMPLETED" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReview?.(classData)}
                >
                  <Star className="h-4 w-4" />
                  Đánh giá gia sư
                </Button>
              )}
            </div>

            <div className="flex flex-1 justify-end">
              <Button
                size="sm"
                onClick={() => onViewHistory?.(classData)}
                variant="outline"
              >
                Xem chi tiết
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

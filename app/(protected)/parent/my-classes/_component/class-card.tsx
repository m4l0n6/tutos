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
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MClass, DayOfWeek } from "@/types/classes"
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status"
import { DayOfWeekLabel } from "@/lib/contant"

const STATUS_CONFIG: Record<
  MClass["status"],
  { label: string; variant: "default" | "success" | "error" | "warning" | "info" }
> = {
  RECRUITING: {
    label: "Đang tuyển gia sư",
    variant: "warning",
  },
  TRIAL: {
    label: "Đang dùng thử",
    variant: "info",
  },
  ACTIVE: {
    label: "Đã xác nhận gia sư",
    variant: "default",
  },
  COMPLETED: {
    label: "Hoàn thành",
    variant: "success",
  },
  CANCELLED: {
    label: "Đã huỷ",
    variant: "error",
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
    subject,
    level,
    daysOfWeek,
    startTime,
    endTime,
    location,
    status,
    acceptanceFee,
    parentName,
  } = classData

  const statusCfg = STATUS_CONFIG[status]

  const isOnline =
    location.toLowerCase().includes("online") ||
    location.toLowerCase().includes("google meet") ||
    location.toLowerCase().includes("zoom")

  return (
    <Card className="group bg-white shadow-sm hover:shadow-md border border-slate-200 rounded-2xl w-full overflow-hidden transition-all duration-300">
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
                <Status variant={statusCfg.variant}>
                  <StatusIndicator />
                  <StatusLabel>{statusCfg.label}</StatusLabel>
                </Status>
              </div>    
              {/* Subject + Level tags */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 bg-primary-50 px-2 py-0.5 border border-primary-100 rounded-full font-medium text-primary text-xs">
                  <BookOpen className="w-3 h-3" />
                  {subject.name}
                </span>
                <span className="inline-flex items-center gap-1 bg-primary-50 px-2 py-0.5 border border-primary-100 rounded-full font-medium text-primary text-xs">
                  <GraduationCap className="w-3 h-3" />
                  {level.name}
                </span>
              </div>
            </div>

          <Separator className="bg-slate-100 my-4" />

          {/* Schedule + Location */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex justify-center items-center bg-primary-50 rounded-lg shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-slate-700">
                {formatDays(daysOfWeek)}{" "}
                <span className="font-normal text-slate-500">
                  ({startTime} - {endTime})
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <div className="flex justify-center items-center bg-primary-50 rounded-lg shrink-0">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-primary" />
                ) : (
                  <MapPin className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Acceptance Fee */}
          <div className="flex items-center gap-2 mt-3 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>Học phí tiếp nhận:</span>
            <span className="font-semibold text-primary">
              {formatCurrency(acceptanceFee)}
            </span>
          </div>

          <Separator className="bg-slate-100 my-4" />

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="gap-1.5 bg-primary hover:bg-primary/90 shadow-primary/20 shadow-sm px-4 rounded-xl font-medium text-primary-foreground text-xs transition-all duration-200"
              onClick={() => onMessage?.(classData)}
            >
              <MessageCircle className="w-4 h-4" />
              Nhắn tin cho trung tâm
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 hover:bg-primary/5 px-4 border-primary/30 rounded-xl font-medium text-primary text-xs transition-all duration-200"
              onClick={() => onReview?.(classData)}
            >
              <Star className="w-4 h-4" />
              Đánh giá gia sư
            </Button>

            <button
              className="flex items-center gap-1 ml-auto font-medium text-slate-500 hover:text-primary text-xs transition-colors duration-200"
              onClick={() => onViewHistory?.(classData)}
            >
              Xem lịch sử buổi dạy
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

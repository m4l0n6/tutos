"use client"

import {
  Calendar,
  MapPin,
  MessageCircle,
  ChevronRight,
  BookOpen,
  GraduationCap,
  DollarSign,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MClassRequest, DayOfWeek } from "@/types/classes"
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status"
import { DayOfWeekLabel } from "@/lib/contant"
import { Button } from "@/components/ui/button"
import { REQUEST_STATUS_CONFIG } from "./request-config"
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

interface RequestCardProps {
  request: MClassRequest
  onMessage?: (request: MClassRequest) => void
  onViewDetails?: (request: MClassRequest) => void
  onEdit?: (request: MClassRequest) => void
}

export default function RequestCard({
  request,
  onMessage,
  onViewDetails,
  onEdit,
}: RequestCardProps) {
  const {
    subject,
    level,
    daysOfWeek,
    startTime,
    endTime,
    location,
    status,
    minBudget,
    maxBudget,
    description,
  } = request

  const statusCfg = REQUEST_STATUS_CONFIG[status]

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
                  Yêu cầu tìm gia sư
                </h3>
              </div>
              <Status variant={statusCfg.variant}>
                <StatusIndicator />
                <StatusLabel>{statusCfg.label}</StatusLabel>
              </Status>
            </div>
            {/* Subject + Level tags */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline">
                <BookOpen className="w-3 h-3" />
                {subject.name}
              </Badge>
              <Badge variant="outline">
                <GraduationCap className="w-3 h-3" />
                {level.name}
              </Badge>
            </div>
            {/* Description */}
            {description && (
              <p className="mt-2 text-slate-600 text-sm line-clamp-2">
                {description}
              </p>
            )}
          </div>

          <Separator className="my-4" />

          {/* Schedule + Location */}
          <div className="flex flex-wrap gap-4 text-sm">
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
                  <MapPin className="w-4 h-4 rotate-45" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2 mt-3 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>Ngân sách:</span>
            <span className="font-semibold">
              {formatCurrency(minBudget)} - {formatCurrency(maxBudget)}
            </span>
          </div>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="flex justify-items gap-2 w-full">
            <div className="flex items-center gap-2">
              
            </div>

            <div className="flex flex-1 justify-end">
              <Button
                size="sm"
                onClick={() => onViewDetails?.(request)}
                variant="outline"
              >
                Xem chi tiết
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

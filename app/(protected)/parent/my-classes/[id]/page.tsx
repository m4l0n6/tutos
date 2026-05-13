"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useGetClassById } from "@/hooks/queries/useClassQuery"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BookOpen,
  GraduationCap,
  Calendar,
  MapPin,
  DollarSign,
  Users,
} from "lucide-react"
import { DayOfWeekLabel } from "@/lib/contant"
import { DayOfWeek, MClass, ApplicationStatus } from "@/types/classes"
import { Status, StatusLabel, StatusIndicator } from "@/components/ui/status"

// ─── Configs ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  MClass["status"],
  { label: string; variant: "default" | "success" | "error" | "warning" | "info" }  > = {
  RECRUITING: {
    label: "Đang tuyển gia sư", 
    variant: "info",
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

const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; variant: "default" | "success" | "error" | "warning" | "info" }
> = {
  PENDING: {
    label: "Đang chờ duyệt",
    variant: "info",
  },
  ACCEPTED: {
    label: "Đã chấp nhận",
    variant: "success",
  },
  REJECTED: {
    label: "Đã từ chối",
    variant: "error",
  },
  TRIAL: {
    label: "Dạy thử",
    variant: "info",
  },
  TRIAL_FAILED: {
    label: "Dạy thử thất bại",
    variant: "error",
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND"
}

function formatDays(days: DayOfWeek[]) {
  return days.map((d) => DayOfWeekLabel[d]).join(", ")
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ClassDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Card 1 skeleton */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-3">
            <Skeleton className="w-2/3 h-7" />
            <Skeleton className="rounded-full w-32 h-6" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="rounded-full w-28 h-6" />
            <Skeleton className="rounded-full w-24 h-6" />
          </div>

          <Separator />

          {/* Info grid */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="mt-0.5 rounded w-4 h-4 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="w-24 h-3.5" />
                  <Skeleton className="w-40 h-4" />
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Card 2 skeleton — applications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="rounded w-5 h-5" />
            <Skeleton className="w-44 h-6" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 p-4 border rounded-md"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <Skeleton className="rounded-full w-10 h-10 shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="rounded-md w-20 h-5" />
                </div>
              </div>

              {/* Cover letter + rate */}
              <div className="flex-1 space-y-1.5">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Skeleton className="rounded-md w-24 h-8" />
                <Skeleton className="rounded-md w-20 h-8" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ClassDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: classData, isLoading } = useGetClassById(id)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1 space-y-6 mx-auto px-8 py-8 w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/parent/my-classes">My Classes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading ? (
                  <Skeleton className="inline-block w-40 h-4" />
                ) : (
                  (classData?.name ?? id)
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Loading */}
        {isLoading && <ClassDetailSkeleton />}

        {/* Not found */}
        {!isLoading && !classData && (
          <p className="text-muted-foreground">Không tìm thấy lớp học.</p>
        )}

        {/* Content */}
        {classData && (
          <div className="space-y-6">
            {/* ── 1. Thông tin cơ bản ── */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <CardTitle className="text-xl">{classData.name}</CardTitle>
                  <Status variant={STATUS_CONFIG[classData.status].variant}>
                    <StatusIndicator />
                    <StatusLabel>
                      {STATUS_CONFIG[classData.status].label}
                    </StatusLabel>
                  </Status>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full font-medium text-primary text-sm">
                    <BookOpen className="w-3.5 h-3.5" />
                    {classData.subject.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full font-medium text-primary text-sm">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {classData.level.name}
                  </span>
                </div>

                <Separator />

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <InfoRow
                    icon={<Calendar className="w-4 h-4" />}
                    label="Lịch học"
                  >
                    {formatDays(classData.daysOfWeek)} ({classData.startTime} –{" "}
                    {classData.endTime})
                  </InfoRow>
                  <InfoRow
                    icon={<MapPin className="w-4 h-4" />}
                    label="Địa điểm"
                  >
                    {classData.location}
                  </InfoRow>
                  <InfoRow
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Học phí tiếp nhận"
                  >
                    <span className="font-semibold text-primary">
                      {formatCurrency(classData.acceptanceFee)}
                    </span>
                  </InfoRow>
                  <InfoRow
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Ngân sách phụ huynh"
                  >
                    {formatCurrency(classData.request.minBudget)} –{" "}
                    {formatCurrency(classData.request.maxBudget)}
                  </InfoRow>
                </div>

                {classData.request.description && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <p className="font-medium text-lg">Mô tả yêu cầu</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {classData.request.description}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* ── 2. Danh sách gia sư ứng tuyển ── */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">
                    Gia sư ứng tuyển
                    <span className="ml-2 font-normal text-muted-foreground text-sm">
                      ({classData.applications.length})
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {classData.applications.length === 0 ? (
                  <p className="py-6 text-muted-foreground text-sm text-center">
                    Chưa có gia sư nào ứng tuyển.
                  </p>
                ) : (
                  classData.applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 p-4 border rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {app.tutorProfile.user.fullName
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {app.tutorProfile.user.fullName}
                          </p>
                          <Status
                            variant={
                              APPLICATION_STATUS_CONFIG[app.status].variant
                            }
                          >
                            <StatusLabel>
                              {APPLICATION_STATUS_CONFIG[app.status].label}
                            </StatusLabel>
                          </Status>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Cover Letter:</span>{" "}
                          {app.coverLetter || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Proposed Rate:</span>{" "}
                          {app.proposedRate
                            ? formatCurrency(app.proposedRate)
                            : "N/A"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button size="sm" variant="outline">
                          <Link
                            href={`/tutor/${app.tutorProfile.id}`}
                          >
                            Xem hồ sơ
                          </Link>
                        </Button>
                        <Button size="sm">Dạy thử</Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="mt-0.5 text-muted-foreground shrink-0">{icon}</span>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium text-slate-700">{children}</p>
      </div>
    </div>
  )
}

export default ClassDetailsPage
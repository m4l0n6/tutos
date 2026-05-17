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
import { DayOfWeek } from "@/types/classes"
import { Status, StatusLabel, StatusIndicator } from "@/components/ui/status"
import { getStatusLabel, getStatusVariant } from "@/lib/class-status"
import { ClassDetailSkeleton } from "../../../tutor/my-classes/[id]/_component/class-detail-skeleton"
import { Badge } from "@/components/ui/badge"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND"
}

function formatDays(days: DayOfWeek[]) {
  return days.map((d) => DayOfWeekLabel[d]).join(", ")
}

const ClassDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: classData, isLoading } = useGetClassById(id)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-7xl flex-1 space-y-6 px-8 py-8">
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
                  <Skeleton className="inline-block h-4 w-40" />
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
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <CardTitle className="text-xl">{classData.name}</CardTitle>
                  <Status variant={getStatusVariant(classData.status)}>
                    <StatusIndicator />
                    <StatusLabel>
                      {getStatusLabel(classData.status)}
                    </StatusLabel>
                  </Status>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>
                    <BookOpen className="h-3.5 w-3.5" />
                    {classData.subject.category.name}
                  </Badge>
                  <Badge variant="outline">
                    <BookOpen className="h-3.5 w-3.5" />
                    {classData.subject.name}
                  </Badge>
                  <Badge variant="outline">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {classData.level.name}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoRow
                    icon={<Calendar className="h-4 w-4" />}
                    label="Lịch học"
                  >
                    {formatDays(classData.daysOfWeek)} ({classData.startTime} –{" "}
                    {classData.endTime})
                  </InfoRow>
                  <InfoRow
                    icon={<MapPin className="h-4 w-4" />}
                    label="Địa điểm"
                  >
                    {classData.location}
                  </InfoRow>
                  <InfoRow
                    icon={<DollarSign className="h-4 w-4" />}
                    label="Phí tiếp nhận"
                  >
                    <span className="font-semibold">
                      {formatCurrency(classData.acceptanceFee)}
                    </span>
                  </InfoRow>
                  <InfoRow
                    icon={<DollarSign className="h-4 w-4" />}
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
                      <p className="text-lg font-medium">Mô tả yêu cầu</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
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
                  <Users className="h-5 w-5" />
                  <CardTitle className="text-lg">
                    Gia sư ứng tuyển
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({classData.applications.length})
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {classData.applications.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    Chưa có gia sư nào ứng tuyển.
                  </p>
                ) : (
                  classData.applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex flex-col items-start justify-between gap-4 rounded-md border p-4 sm:flex-row sm:items-center"
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
                          <div>{app.tutorProfile.location}</div>
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

                      <div className="flex shrink-0 items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Link href={`/tutor/${app.tutorProfile.id}`}>
                            Xem hồ sơ
                          </Link>
                        </Button>
                        {app.status !== "TRIAL" && (
                          <Button size="sm">Dạy thử</Button>
                        )}
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
      <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium text-slate-700">{children}</p>
      </div>
    </div>
  )
}

export default ClassDetailsPage

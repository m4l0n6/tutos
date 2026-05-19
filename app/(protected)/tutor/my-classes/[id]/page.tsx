"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  useGetClassById,
  useConfirmTrial,
  useRejectTrial,
} from "@/hooks/queries/useClassQuery"
import { useCreatePayment } from "@/hooks/queries/usePaymentQuery"
import { useAuth } from "@/context/AuthContext"
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
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  BookOpen,
  GraduationCap,
  Calendar,
  MapPin,
  DollarSign,
  Lock,
  Phone,
  Mail,
  User,
  MessageCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  ShieldCheck,
  FileText,
  Receipt,
  RotateCcw,
} from "lucide-react"
import { DayOfWeekLabel } from "@/lib/contant"
import { DayOfWeek, MClass, MClassApplication, MPayment } from "@/types/classes"
import { Status, StatusLabel, StatusIndicator } from "@/components/ui/status"
import { getStatusLabel, getStatusVariant } from "@/lib/class-status"
import { ClassDetailSkeleton } from "./_component/class-detail-skeleton"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND"
}

function formatDays(days: DayOfWeek[]) {
  return days.map((d) => DayOfWeekLabel[d]).join(", ")
}

// ─── Fee calculation ──────────────────────────────────────────────────────────
// A (depositFee)    = proposedRate / 2          (50% of 1 session)
// B (totalFee)      = daysPerWeek × 4 × proposedRate × 40%
// C (remainingFee)  = B - A

interface FeeBreakdown {
  proposedRate: number
  daysPerWeek: number
  depositFee: number // A
  totalFee: number // B
  remainingFee: number // C
}

function calcFees(
  application: MClassApplication | undefined,
  daysOfWeek: DayOfWeek[],
  acceptanceFee: number,
  payments: MPayment[] | undefined
): FeeBreakdown {
  const proposedRate =
    application?.proposedRate && application.proposedRate > 0
      ? application.proposedRate
      : (application?.tutorProfile?.hourlyRate ?? 0)

  const daysPerWeek = daysOfWeek.length
  const A = Math.round(proposedRate / 2)
  const B = acceptanceFee
  const totalPaid =
    payments
      ?.filter((payment) => payment.status === "COMPLETED")
      ?.reduce((sum, payment) => sum + payment.amount, 0) ?? 0
  const C = Math.max(0, B - totalPaid)

  return {
    proposedRate,
    daysPerWeek,
    depositFee: A,
    totalFee: B,
    remainingFee: C,
  }
}

// ─── Fee Breakdown Card ───────────────────────────────────────────────────────

function FeeBreakdownCard({ fees }: { fees: FeeBreakdown }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          <Receipt className="h-4 w-4" />
          Chi tiết phí
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Lương/buổi (đề xuất)</span>
            <span>{formatCurrency(fees.proposedRate)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Số buổi/tuần</span>
            <span>{fees.daysPerWeek} buổi</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span>Tiền cọc </span>
              <span className="text-xs text-muted-foreground">
                (50% × 1 buổi)
              </span>
            </div>
            <span className="font-medium">
              {formatCurrency(fees.depositFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span>Phí nhận lớp </span>
              <span className="text-xs text-muted-foreground">
                ({fees.daysPerWeek} buổi × 4 tuần × 40%)
              </span>
            </div>
            <span className="font-medium">
              {formatCurrency(fees.totalFee - fees.depositFee)}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-base font-semibold">
            <span>Phí còn lại</span>
            <span className="text-primary">
              {formatCurrency(fees.remainingFee)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Right Sidebar ────────────────────────────────────────────────────────────

function RightSidebar({
  classId,
  classData,
  myApplication,
  user,
}: {
  classId: string
  classData: MClass
  myApplication: MClassApplication | undefined
  user: { id: string; role: string } | null
}) {
  const { mutate: createPayment, isPending: isPaymentPending } =
    useCreatePayment()
  const { mutate: confirmTrial, isPending: isConfirmPending } =
    useConfirmTrial(classId)
  const { mutate: rejectTrial, isPending: isRejectPending } =
    useRejectTrial(classId)

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const fees = calcFees(
    myApplication,
    classData.daysOfWeek,
    classData.acceptanceFee,
    classData.payments
  )

  const isDepositPaid = myApplication?.isDepositPaid ?? false
  const isTrialConfirmedByTutor = classData.isTrialConfirmedByTutor
  const isTrialConfirmedByParent = classData.isTrialConfirmedByParent
  const parent = classData.request?.parent

  const hasBalancePaid =
    classData.payments?.some(
      (p: MPayment) => p.type === "BALANCE" && p.status === "COMPLETED"
    ) ?? false

  const showPayBalance =
    user?.role === "TUTOR" &&
    classData.selectedTutorId === user.id &&
    classData.status === "TRIAL" &&
    isDepositPaid &&
    !hasBalancePaid &&
    fees.remainingFee > 0

  const totalPaid =
    classData.payments
      ?.filter((p: MPayment) => p.status === "COMPLETED")
      ?.reduce((sum: number, p: MPayment) => sum + p.amount, 0) ?? 0
  const canConfirmFinal =
    classData.status === "TRIAL" && totalPaid >= fees.totalFee
  const rejectReasonTrimmed = rejectReason.trim()
  const shouldShowRemainingNotice =
    classData.status === "TRIAL" && !showPayBalance && fees.remainingFee > 0

  const handleRejectTrial = () => {
    if (!rejectReasonTrimmed) return

    rejectTrial(
      { reason: rejectReasonTrimmed },
      {
        onSuccess: () => {
          setRejectDialogOpen(false)
          setRejectReason("")
        },
      }
    )
  }

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {isDepositPaid ? (
                <ShieldCheck className="h-4 w-4 text-green-500" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Thông tin phụ huynh
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {isDepositPaid ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Họ tên</p>
                    <p className="text-sm font-medium">
                      {parent?.fullName ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Số điện thoại
                    </p>
                    <p className="text-sm font-medium">
                      {parent?.phone ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">
                      {parent?.email ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-lg border bg-muted/30 p-4">
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/75 backdrop-blur-[2px]">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Thanh toán để xem thông tin
                  </p>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4 shrink-0 rounded" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {isTrialConfirmedByTutor && isTrialConfirmedByParent ? (
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
                <p className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Lớp học đã được xác nhận
                </p>
              </div>
            ) : isTrialConfirmedByTutor ? (
              <div className="space-y-3">
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950">
                  <p className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
                    <Clock className="h-4 w-4 shrink-0" />
                    Vui lòng chờ phụ huynh xác nhận
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/tutor/chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Nhắn tin với phụ huynh
                  </Link>
                </Button>
              </div>
            ) : isDepositPaid ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="shrink-0"
                    asChild
                  >
                    <Link
                      href="/tutor/chat"
                      aria-label="Nhắn tin với phụ huynh"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </Link>
                  </Button>

                  {showPayBalance && (
                    <Button
                      className="flex-1"
                      onClick={() =>
                        createPayment({ classId, type: "BALANCE" })
                      }
                      disabled={isPaymentPending}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {isPaymentPending
                        ? "Đang xử lý..."
                        : `Thanh toán phí nhận lớp còn lại`}
                    </Button>
                  )}
                </div>

                {canConfirmFinal ? (
                  <Button
                    className="w-full"
                    onClick={() => confirmTrial()}
                    disabled={isConfirmPending}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {isConfirmPending
                      ? "Đang xác nhận..."
                      : "Xác nhận kết quả dạy thử"}
                  </Button>
                ) : (
                  shouldShowRemainingNotice && (
                    <p className="text-center text-xs text-muted-foreground">
                      Cần thanh toán phí còn lại{" "}
                      <span className="font-semibold text-foreground">
                        {formatCurrency(fees.remainingFee)}
                      </span>{" "}
                      để xác nhận chốt lớp.
                    </p>
                  )
                )}

                {classData.status === "TRIAL" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setRejectDialogOpen(true)}
                    disabled={isRejectPending}
                  >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Hủy lớp, hoàn cọc
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  <p className="mb-1 font-medium">Hướng dẫn:</p>
                  <ol className="list-inside list-decimal space-y-0.5">
                    <li>Nhấn nút bên dưới để tới VNPay</li>
                    <li>Hoàn tất thanh toán phí cọc</li>
                    <li>Thông tin phụ huynh tự động mở khóa</li>
                  </ol>
                </div>
                <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Phí cọc (A)</span>
                  <span className="font-semibold">
                    {formatCurrency(fees.depositFee)}
                  </span>
                </div>
                <Button
                  className="w-full"
                  onClick={() => createPayment({ classId, type: "DEPOSIT" })}
                  disabled={isPaymentPending}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {isPaymentPending ? "Đang xử lý..." : "Thanh toán phí cọc"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <FeeBreakdownCard fees={fees} />
      </div>

      <Dialog
        open={rejectDialogOpen}
        onOpenChange={(open) => {
          setRejectDialogOpen(open)
          if (!open) setRejectReason("")
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy lớp, hoàn cọc</DialogTitle>
            <DialogDescription>
              Hành động này sẽ gửi yêu cầu hủy lớp và hoàn cọc. Bạn phải nhập lý
              do trước khi tiếp tục.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <p className="text-sm font-medium">Lý do hủy lớp</p>
            <Textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="Nhập lý do hủy lớp, hoàn cọc..."
              className="min-h-28"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Đóng
            </Button>
            <Button onClick={handleRejectTrial} disabled={!rejectReasonTrimmed}>
              {isRejectPending ? "Đang gửi..." : "Xác nhận hủy lớp"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ClassDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { data: classData, isLoading } = useGetClassById(id)

  const myApplication = classData?.applications?.find(
    (app) => app.tutorProfile.userId === user?.id
  )

  const isMySelectedClass =
    !!classData &&
    !!myApplication &&
    !!classData.selectedTutorId &&
    (classData.selectedTutorId === user?.id ||
      classData.selectedTutorId === myApplication.tutorProfileId)

  const isMyClass =
    isMySelectedClass &&
    (classData?.status === "TRIAL" || classData?.status === "ACTIVE")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-7xl max-w-7xl flex-1 space-y-6 px-8 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/tutor/my-classes">My Classes</Link>
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

        {isLoading && <ClassDetailSkeleton />}

        {!isLoading && !classData && (
          <p className="text-muted-foreground">Không tìm thấy lớp học.</p>
        )}

        {classData && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* ── Cột trái — thông tin lớp ── */}
            <Card className="w-full">
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

              <CardContent className="space-y-6">
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

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    <div className="space-y-1.5">
                      <p className="font-medium">Mô tả yêu cầu</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {classData.request.description}
                      </p>
                    </div>
                  </>
                )}
                {myApplication && (
                  <>
                    <Separator />
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                        <FileText className="h-4 w-4" />
                        Đơn ứng tuyển của bạn
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {myApplication.coverLetter && (
                        <div className="rounded-lg border-l-4 border-primary bg-muted/40 p-3">
                          <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Cover Letter
                          </p>
                          <p className="text-sm leading-relaxed italic">
                            &quot;{myApplication.coverLetter}&quot;
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                        <div>
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Proposed Rate
                          </p>
                          <p className="text-lg font-bold">
                            {formatCurrency(myApplication.proposedRate ?? 0)}
                          </p>
                        </div>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </>
                )}
              </CardContent>
            </Card>

            {/* ── Cột phải — chỉ render khi isMyClass ── */}
            {isMyClass && (
              <RightSidebar
                classId={id}
                classData={classData}
                myApplication={myApplication}
                user={user}
              />
            )}
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
    <div className="flex items-start gap-2.5 text-sm">
      <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-medium">{children}</p>
      </div>
    </div>
  )
}

export default ClassDetailsPage

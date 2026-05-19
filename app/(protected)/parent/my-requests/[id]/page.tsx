"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useGetClassRequestById } from "@/hooks/queries/useClassQuery"
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
import {
  BookOpen,
  GraduationCap,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react"
import { DayOfWeekLabel } from "@/lib/contant"
import { DayOfWeek } from "@/types/classes"
import { Status, StatusLabel, StatusIndicator } from "@/components/ui/status"
import { REQUEST_STATUS_CONFIG } from "../_component/request-config"
import { RequestDetailSkeleton } from "./_component/request-detail-skeleton"
import { Badge } from "@/components/ui/badge"
import { useCancelClassRequest } from "@/hooks/queries/useClassQuery"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

function formatDays(days: DayOfWeek[]) {
  return days.map((d) => DayOfWeekLabel[d]).join(", ")
}

const RequestDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data: request, isLoading } = useGetClassRequestById(id)
    const router = useRouter()

    const { mutate: cancelRequest, isPending } = useCancelClassRequest(id)

    const handleCancel = () => {
      cancelRequest(id, {
        onSuccess: () => {
            toast.success("Canceled request successfully")
            router.push("/parent/my-requests")
        },
        onError: () => toast.error("Failed to cancel request, please try again"),
      })
    }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1 space-y-6 mx-auto px-8 py-8 w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/parent/my-requests">My Requests</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading ? (
                  <Skeleton className="inline-block w-40 h-4" />
                ) : (
                  `Request #${id.slice(0, 8)}`
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Loading */}
        {isLoading && <RequestDetailSkeleton />}

        {/* Not found */}
        {!isLoading && !request && (
          <p className="text-muted-foreground">Request not found.</p>
        )}

        {/* Content */}
        {request && (
          <div className="space-y-6">
            {/* ── Request Information ── */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div>
                    <CardTitle className="text-xl">
                      Find Tutor Request
                    </CardTitle>
                    <p className="mt-1 text-muted-foreground text-sm">
                      Created Date:{" "}
                      {new Date(request.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <Status
                    variant={REQUEST_STATUS_CONFIG[request.status].variant}
                  >
                    <StatusIndicator />
                    <StatusLabel>
                      {REQUEST_STATUS_CONFIG[request.status].label}
                    </StatusLabel>
                  </Status>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    <BookOpen className="w-3.5 h-3.5" />
                    {request.subject.name}
                  </Badge>
                  <Badge variant="outline">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {request.level.name}
                  </Badge>
                </div>

                <Separator />

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <InfoRow
                    icon={<Calendar className="w-4 h-4" />}
                    label="Schedule"
                  >
                    {formatDays(request.daysOfWeek)} ({request.startTime} –{" "}
                    {request.endTime})
                  </InfoRow>
                  <InfoRow
                    icon={<MapPin className="w-4 h-4" />}
                    label="Location"
                  >
                    {request.location}
                  </InfoRow>
                  <InfoRow
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Budget"
                  >
                    <span className="font-semibold">
                      {formatCurrency(request.minBudget)} –{" "}
                      {formatCurrency(request.maxBudget)}
                    </span>
                  </InfoRow>
                  {request.timeNote && (
                    <InfoRow
                      icon={<Calendar className="w-4 h-4" />}
                      label="Schedule Notes"
                    >
                      {request.timeNote}
                    </InfoRow>
                  )}
                </div>

                {request.description && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <p className="font-medium text-lg">Description</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {request.description}
                      </p>
                    </div>
                  </>
                )}

                {request.status === "PENDING" && (
                  <>
                    <Separator />
                    <div className="flex justify-end gap-2 pt-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Cancel Request</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirm Cancel Request
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this request? This action cannot be undone.
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Không</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleCancel}
                              disabled={isPending}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            >
                              {isPending ? "Canceling..." : "Confirm Cancel"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </>
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

export default RequestDetailsPage

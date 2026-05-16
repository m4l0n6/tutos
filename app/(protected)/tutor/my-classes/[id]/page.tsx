"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, MapPin } from "lucide-react"
import { useParams } from "next/navigation"
import { useGetClassById } from "@/hooks/queries/useClassQuery"
import { getStatusClass, getStatusLabel } from "@/lib/class-status"
import { getSubjectIcon } from "@/lib/subject-icons"

export default function MyClassDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const { data: cls, isLoading, isError } = useGetClassById(id ?? "")
  const { icon: Icon, colorClass } = getSubjectIcon(cls?.subject?.name ?? "")

  return (
    <div className="min-h-screen bg-background px-8 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Chi tiết lớp học
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">ID: {id}</p>
          </div>

          <Link
            href="/tutor/my-classes"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Đang tải dữ liệu lớp học...
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-destructive/40 bg-card p-6 text-sm text-destructive">
            Không thể tải thông tin lớp học.
          </div>
        ) : cls ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {cls.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cls.level?.name && `${cls.level.name} · `}Phụ huynh:{" "}
                    {cls.parentName}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${getStatusClass(cls.status)}`}
              >
                {getStatusLabel(cls.status)}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock className="h-4 w-4" />
                  Lịch học
                </div>
                <p className="text-sm text-muted-foreground">
                  {cls.daysOfWeek?.length
                    ? cls.daysOfWeek.join(", ")
                    : "Chưa có lịch"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cls.startTime} – {cls.endTime}
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin className="h-4 w-4" />
                  Địa điểm
                </div>
                <p className="text-sm text-muted-foreground">
                  {cls.location || "Chưa cập nhật"}
                </p>
              </div>

              <div className="rounded-xl border border-border p-4 sm:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BookOpen className="h-4 w-4" />
                  Môn học / khối
                </div>
                <p className="text-sm text-muted-foreground">
                  {cls.subject?.name || "Chưa có môn học"}
                  {cls.level?.name ? ` · ${cls.level.name}` : ""}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
            Không tìm thấy lớp học này.
          </div>
        )}
      </div>
    </div>
  )
}

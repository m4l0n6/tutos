"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Clock, MapPin, BookOpen, Tag } from "lucide-react"
import { useGetTutorClass } from "@/hooks/queries/useClassQuery"
import { getSubjectIcon } from "@/lib/subject-icons"
import { getStatusLabel, getStatusClass } from "@/lib/class-status"
import { DayOfWeek, MClass } from "@/types/classes"
import { DayOfWeekLabel } from "@/lib/contant"

function MyClassCard({ cls }: { cls: MClass }) {
  const router = useRouter()
  const { icon: Icon, colorClass } = getSubjectIcon(cls.subject?.name ?? "")

  const daysDisplay = (cls.daysOfWeek ?? [])
    .map((d) => DayOfWeekLabel[d as DayOfWeek] ?? d)
    .join(", ")

  const statusToShow = cls.status

  return (
    <button
      onClick={() => router.push("/tutor/my-classes")}
      className="group flex w-full flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm active:scale-[0.98]"
    >
      {/* Row 1: Icon + name + status badge */}
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] leading-snug font-semibold text-foreground">
            {cls.name}
          </p>
          <p className="text-on-surface-variant/60 truncate text-[11px]">
            Phụ huynh: {cls.parentName}
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusClass(statusToShow)}`}
        >
          {getStatusLabel(statusToShow)}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-border/60" />

      {/* Row 2: Meta info grid */}
      <div className="text-on-surface-variant/60 grid grid-cols-1 gap-1.5 text-[11px]">
        {/* Thời gian */}
        <div className="flex items-start gap-1.5">
          <Clock className="mt-px h-3 w-3 shrink-0" />
          <span className="leading-snug">
            {cls.startTime} – {cls.endTime}
            {daysDisplay ? ` · ${daysDisplay}` : ""}
          </span>
        </div>

        {/* Địa điểm */}
        {cls.location && (
          <div className="text-on-surface-variant/60 flex items-start gap-1.5">
            <MapPin className="mt-px h-3 w-3 shrink-0" />
            <span className="line-clamp-1 leading-snug">{cls.location}</span>
          </div>
        )}

        {/* Môn + cấp độ */}
        <div className="text-on-surface-variant/60 flex items-start gap-1.5">
          <BookOpen className="mt-px h-3 w-3 shrink-0" />
          <span className="leading-snug">
            {cls.subject?.name}
            {cls.level?.name ? ` · ${cls.level.name}` : ""}
          </span>
        </div>

        {/* Danh mục */}
        {cls.category?.name && (
          <div className="text-on-surface-variant/60 flex items-start gap-1.5">
            <Tag className="mt-px h-3 w-3 shrink-0" />
            <span className="leading-snug">{cls.category.name}</span>
          </div>
        )}
      </div>
    </button>
  )
}

const PREVIEW_LIMIT = 4

export function MyClassList() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)

  const { data: classList = [], isLoading, isError } = useGetTutorClass()

  const previewClasses = classList.slice(0, PREVIEW_LIMIT)
  const hasMore = classList.length > PREVIEW_LIMIT

  return (
    <section
      ref={sectionRef}
      className="space-y-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl leading-none font-bold text-primary">
          Lớp học của tôi
        </h2>
        <button
          onClick={() => router.push("/tutor/my-classes")}
          className="text-sm font-medium text-primary hover:underline md:hidden"
        >
          Xem tất cả
        </button>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="rounded-xl border border-dashed border-muted-foreground/40 p-8 text-center">
          <p className="text-sm text-muted-foreground">Đang tải lớp học...</p>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-dashed border-destructive/40 p-8 text-center">
          <p className="text-sm text-destructive">
            Không thể tải danh sách. Vui lòng thử lại.
          </p>
        </div>
      ) : classList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-muted-foreground/40 p-8 text-center">
          <p className="text-sm text-muted-foreground">Chưa có lớp học nào.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {previewClasses.map((cls) => (
              <MyClassCard key={cls.id} cls={cls} />
            ))}
          </div>

          {hasMore && (
            <div
              className={`pointer-events-none absolute inset-0 flex items-end justify-center pb-3 transition-opacity duration-200 md:pointer-events-auto ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-xl bg-gradient-to-t from-background/90 to-transparent" />
              <button
                onClick={() => router.push("/tutor/my-classes")}
                className="relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/95 px-5 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all hover:border-primary hover:shadow-md"
              >
                <ArrowRight className="h-4 w-4" />
                Xem tất cả {classList.length} lớp
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

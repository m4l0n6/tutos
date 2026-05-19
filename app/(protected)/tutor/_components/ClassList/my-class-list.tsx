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
      className="group flex flex-col gap-3 bg-card hover:shadow-sm p-4 border border-border hover:border-primary/30 rounded-xl w-full text-left active:scale-[0.98] transition-all"
    >
      {/* Row 1: Icon + name + status badge */}
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[13px] text-foreground truncate leading-snug">
            {cls.name}
          </p>
          <p className="text-[11px] text-on-surface-variant/60 truncate">
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
      <div className="border-border/60 border-t" />

      {/* Row 2: Meta info grid */}
      <div className="gap-1.5 grid grid-cols-1 text-[11px] text-on-surface-variant/60">
        {/* Thời gian */}
        <div className="flex items-start gap-1.5">
          <Clock className="mt-px w-3 h-3 shrink-0" />
          <span className="leading-snug">
            {cls.startTime} – {cls.endTime}
            {daysDisplay ? ` · ${daysDisplay}` : ""}
          </span>
        </div>

        {/* Location */}
        {cls.location && (
          <div className="flex items-start gap-1.5 text-on-surface-variant/60">
            <MapPin className="mt-px w-3 h-3 shrink-0" />
            <span className="line-clamp-1 leading-snug">{cls.location}</span>
          </div>
        )}

        {/* Subject + Level */}
        <div className="flex items-start gap-1.5 text-on-surface-variant/60">
          <BookOpen className="mt-px w-3 h-3 shrink-0" />
          <span className="leading-snug">
            {cls.subject?.name}
            {cls.level?.name ? ` · ${cls.level.name}` : ""}
          </span>
        </div>

        {/* Category */}
        {cls.category?.name && (
          <div className="flex items-start gap-1.5 text-on-surface-variant/60">
            <Tag className="mt-px w-3 h-3 shrink-0" />
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
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl leading-none">
          My Classes
        </h2>
        <button
          onClick={() => router.push("/tutor/my-classes")}
          className="md:hidden font-medium text-primary text-sm hover:underline"
        >
          Xem tất cả
        </button>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="p-8 border border-muted-foreground/40 border-dashed rounded-xl text-center">
          <p className="text-muted-foreground text-sm">Loading classes...</p>
        </div>
      ) : isError ? (
        <div className="p-8 border border-destructive/40 border-dashed rounded-xl text-center">
          <p className="text-destructive text-sm">
            Cannot load list. Please try again.
          </p>
        </div>
      ) : classList.length === 0 ? (
        <div className="p-8 border border-muted-foreground/40 border-dashed rounded-xl text-center">
          <p className="text-muted-foreground text-sm">No classes yet.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-background/90 to-transparent rounded-b-xl h-24" />
              <button
                onClick={() => router.push("/tutor/my-classes")}
                className="inline-flex z-10 relative items-center gap-2 bg-background/95 shadow-sm hover:shadow-md backdrop-blur-sm px-5 py-2 border border-primary/30 hover:border-primary rounded-full font-medium text-primary text-sm transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                View All {classList.length} Classes
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

"use client"

import React from "react"
import Link from "next/link"
import { Clock, MapPin, BookOpen } from "lucide-react"
import { getSubjectIcon } from "@/lib/subject-icons"
import { getStatusLabel, getStatusClass } from "@/lib/class-status"
import { formatNextSession } from "./utils"
import type { MClass } from "@/types/classes"
import { DayOfWeekLabel } from "@/lib/contant"

export default function ClassCard({
  cls,
  showNext = false,
}: {
  cls: MClass
  showNext?: boolean
}) {
  const { icon: Icon, colorClass } = getSubjectIcon(cls.subject?.name ?? "")

  const nextSession = showNext ? formatNextSession(cls) : null

  const daysDisplay = (cls.daysOfWeek ?? [])
    .map((d) => DayOfWeekLabel[d as keyof typeof DayOfWeekLabel] ?? d)
    .join(", ")

  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/25 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${colorClass}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${getStatusClass(cls.status)}`}
        >
          {getStatusLabel(cls.status)}
        </span>
      </div>

      <div>
        <h3
          title={cls.name}
          className="truncate text-[15px] leading-snug font-bold text-foreground"
        >
          {cls.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {cls.level?.name && `${cls.level.name} · `}Phụ huynh: {cls.parentName}
        </p>
      </div>

      {nextSession && (
        <div className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>
            <span className="mr-1 font-semibold">Buổi học kế tiếp:</span>
            {nextSession}
          </span>
        </div>
      )}

      <div className="border-t border-border/60" />

      <div className="flex flex-col gap-1.5 text-[11px] text-muted-foreground">
        {daysDisplay && (
          <div className="flex items-start gap-1.5">
            <Clock className="mt-px h-3 w-3 shrink-0" />
            <span className="leading-snug">
              {daysDisplay} · {cls.startTime} – {cls.endTime}
            </span>
          </div>
        )}
        {cls.location && (
          <div className="flex items-start gap-1.5">
            <MapPin className="mt-px h-3 w-3 shrink-0" />
            <span className="line-clamp-1 leading-snug">{cls.location}</span>
          </div>
        )}
        <div className="flex items-start gap-1.5">
          <BookOpen className="mt-px h-3 w-3 shrink-0" />
          <span className="leading-snug">
            {cls.subject?.name}
            {cls.level?.name ? ` · ${cls.level.name}` : ""}
          </span>
        </div>
      </div>
      {/* Hover overlay: blurred background + action button */}
      <div className="backdrop-blur-0 pointer-events-none absolute inset-0 flex items-center justify-center bg-white/0 opacity-0 transition-all duration-150 group-hover:bg-white/5 group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
        <Link
          href={`/tutor/my-classes/${cls.id}`}
          className="pointer-events-auto inline-flex translate-y-4 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground opacity-0 shadow-sm transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

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
    <div className="group relative flex flex-col gap-3 bg-card hover:shadow-sm p-4 border border-border hover:border-primary/25 rounded-2xl overflow-hidden transition-all">
      <div className="flex justify-between items-center">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${colorClass}`}
        >
          <Icon className="w-4 h-4" />
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
          className="font-bold text-[15px] text-foreground truncate leading-snug"
        >
          {cls.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {cls.level?.name && `${cls.level.name} · `}Phụ huynh: {cls.parentName}
        </p>
      </div>

      {nextSession && (
        <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1.5 rounded-md font-medium text-[11px] text-primary">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            <span className="mr-1 font-semibold">Next Session:</span>
            {nextSession}
          </span>
        </div>
      )}

      <div className="border-border/60 border-t" />

      <div className="flex flex-col gap-1.5 text-[11px] text-muted-foreground">
        {daysDisplay && (
          <div className="flex items-start gap-1.5">
            <Clock className="mt-px w-3 h-3 shrink-0" />
            <span className="leading-snug">
              {daysDisplay} · {cls.startTime} – {cls.endTime}
            </span>
          </div>
        )}
        {cls.location && (
          <div className="flex items-start gap-1.5">
            <MapPin className="mt-px w-3 h-3 shrink-0" />
            <span className="line-clamp-1 leading-snug">{cls.location}</span>
          </div>
        )}
        <div className="flex items-start gap-1.5">
          <BookOpen className="mt-px w-3 h-3 shrink-0" />
          <span className="leading-snug">
            {cls.subject?.name}
            {cls.level?.name ? ` · ${cls.level.name}` : ""}
          </span>
        </div>
      </div>
      {/* Hover overlay: blurred background + action button */}
      <div className="absolute inset-0 flex justify-center items-center bg-white/0 group-hover:bg-white/5 opacity-0 group-hover:opacity-100 backdrop-blur-0 group-hover:backdrop-blur-[1px] transition-all duration-150 pointer-events-none">
        <Link
          href={`/tutor/my-classes/${cls.id}`}
          className="inline-flex items-center gap-2 bg-primary opacity-0 group-hover:opacity-100 shadow-sm px-3 py-2 rounded-md font-semibold text-primary-foreground text-sm transition-[transform,opacity] translate-y-4 group-hover:translate-y-0 duration-300 ease-out pointer-events-auto"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

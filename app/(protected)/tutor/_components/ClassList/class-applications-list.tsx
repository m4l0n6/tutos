"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { ClassCard } from "./class-card"
import { ClassApplication, ApplicationStatus } from "@/types/classes"
import {
  APPLICATION_STATUS_FILTER_OPTIONS,
  getStatusClass,
} from "@/lib/class-status"

interface Props {
  title: string
  data: Array<MClassApplication>
  onRefresh?: () => void
  isLoading?: boolean
  isError?: boolean
}

export const ClassApplicationsList = ({
  title,
  data,
  onRefresh,
  isLoading = false,
  isError = false,
}: Props) => {
  const [visibleCount, setVisibleCount] = useState(10)
  const showMore = () => setVisibleCount((prev) => prev + 10)

  const [activeStatus, setActiveStatus] = useState<ApplicationStatus | "ALL">(
    "ALL"
  )

  const filtered =
    activeStatus === "ALL"
      ? data
      : data.filter((app) => app.status === activeStatus)

  const visibleData = filtered.slice(0, visibleCount)
  const remaining = Math.max(0, filtered.length - visibleCount)
  const hasData = filtered && filtered.length > 0

  return (
    <div>
      {/* Dòng 1: Title + Nút làm mới */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-xl leading-none">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 hover:bg-muted disabled:opacity-50 px-3 py-1 rounded font-medium text-muted-foreground hover:text-foreground text-sm"
            title="Làm mới"
          >
            <RotateCcw
              className={`size-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Làm mới
          </button>
        )}
      </div>

      {/* Dòng 2: Status filter pills */}
      <div className="flex flex-wrap gap-2 mt-3 mb-4">
        {APPLICATION_STATUS_FILTER_OPTIONS.map((opt) => {
          const count =
            opt.value === "ALL"
              ? data.length
              : data.filter((a) => a.status === opt.value).length

          if (opt.value !== "ALL" && count === 0) return null

          const isActive = activeStatus === opt.value

          return (
            <button
              key={opt.value}
              onClick={() => setActiveStatus(opt.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt.label}
              <span
                className={`inline-flex size-4 items-center justify-center rounded-full text-[10px] ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {isLoading ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      ) : isError ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-destructive">
            Cannot load requests list. Please try again.
          </p>
        </div>
      ) : !hasData ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">No requests yet</p>
        </div>
      ) : (
        <>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {visibleData.map((app) => (
              <ClassCard
                key={app.id}
                classData={app.class}
                showApply={false}
                statusOverride={app.status}
              />
            ))}
          </div>
          {remaining > 0 && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded font-medium text-primary-foreground text-sm"
                onClick={showMore}
              >
                View More {remaining >= 10 ? 10 : remaining}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ClassApplicationsList

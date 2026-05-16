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
  data: Array<ClassApplication>
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl leading-none font-bold text-primary">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
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
      <div className="mt-3 mb-4 flex flex-wrap gap-2">
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
        <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <p className="text-muted-foreground">Đang tải yêu cầu...</p>
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <p className="text-destructive">
            Không thể tải danh sách yêu cầu. Vui lòng thử lại.
          </p>
        </div>
      ) : !hasData ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <p className="text-muted-foreground">Chưa có yêu cầu</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
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
            <div className="mt-6 flex justify-center">
              <button
                className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                onClick={showMore}
              >
                Xem thêm {remaining >= 10 ? 10 : remaining}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ClassApplicationsList

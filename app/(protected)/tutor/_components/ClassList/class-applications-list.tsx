"use client"

import { RotateCcw } from "lucide-react"
import { ClassCard } from "./class-card"
import { ClassApplication } from "@/types/classes"

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
  const hasData = data && data.length > 0

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
            title="Làm mới"
          >
            <RotateCcw className="size-4" />
            Làm mới
          </button>
        )}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {data.map((app) => (
            <ClassCard
              key={app.id}
              classData={app.class}
              showApply={false}
              statusOverride={app.status}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ClassApplicationsList

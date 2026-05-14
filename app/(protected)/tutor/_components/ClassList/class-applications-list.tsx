"use client"

import { RotateCcw } from "lucide-react"
import { ClassCard } from "./class-card"
import { MClassApplication } from "@/types/classes"

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
  const hasData = data && data.length > 0

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-primary text-xl">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 hover:bg-muted disabled:opacity-50 px-3 py-1 rounded font-medium text-muted-foreground hover:text-foreground text-sm"
            title="Làm mới"
          >
            <RotateCcw className="size-4" />
            Làm mới
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Đang tải yêu cầu...</p>
        </div>
      ) : isError ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-destructive">
            Không thể tải danh sách yêu cầu. Vui lòng thử lại.
          </p>
        </div>
      ) : !hasData ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Chưa có yêu cầu</p>
        </div>
      ) : (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
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

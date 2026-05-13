import { useState, useMemo } from "react"
import { RotateCcw } from "lucide-react"
import { ClassCard } from "./class-card"
import { MClass } from "@/types/classes"
import { ClassFilters, ClassFilterState } from "./class-filters"

interface ClassListProps {
  title: string
  data: Array<MClass>
  appliedClassIds?: string[]
  onRefresh?: () => void
  isLoading?: boolean
  isError?: boolean
  onFilterChange: (filters: ClassFilterState) => void
}

export const ClassList = ({
  title,
  data,
  appliedClassIds = [],
  onRefresh,
  isLoading = false,
  isError = false,
  onFilterChange,
}: ClassListProps) => {
  const [visibleCount, setVisibleCount] = useState(12)
  const showMore = () => setVisibleCount((prev) => prev + 12)

  const filteredData = useMemo(() => {
    if (!appliedClassIds || appliedClassIds.length === 0) return data
    const appliedSet = new Set(appliedClassIds)
    return data.filter((c) => !appliedSet.has(c.id))
  }, [data, appliedClassIds])

  const visibleData = useMemo(
    () => filteredData.slice(0, visibleCount),
    [filteredData, visibleCount]
  )
  const remaining = Math.max(0, filteredData.length - visibleCount)
  const hasData = filteredData.length > 0

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

      {/* Dòng 2: Filters */}
      <div className="mt-3 mb-4">
        <ClassFilters onFilterChange={onFilterChange} />
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <p className="text-muted-foreground">Đang tải lớp học...</p>
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <p className="text-destructive">
            Không thể tải danh sách lớp. Vui lòng thử lại.
          </p>
        </div>
      ) : !hasData ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <p className="text-muted-foreground">Chưa có lớp học</p>
        </div>
      ) : (
        <>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
            }}
          >
            {visibleData.map((item, idx) => (
              <ClassCard key={item.id || idx} classData={item} />
            ))}
          </div>
          {remaining > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                onClick={showMore}
              >
                Xem thêm {remaining >= 12 ? 12 : remaining}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

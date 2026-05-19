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
  const [visibleCount, setVisibleCount] = useState(15)
  const showMore = () => setVisibleCount((prev) => prev + 15)

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

      {/* Dòng 2: Filters */}
      <div className="mt-3 mb-4">
        <ClassFilters onFilterChange={onFilterChange} />
      </div>

      {isLoading ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">Loading classes...</p>
        </div>
      ) : isError ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-destructive">
            Cannot load classes. Please try again.
          </p>
        </div>
      ) : !hasData ? (
        <div className="p-8 border border-muted-foreground/50 border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">No classes</p>
        </div>
      ) : (
        <>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {visibleData.map((item, idx) => (
              <ClassCard key={item.id || idx} classData={item} />
            ))}
          </div>
          {remaining > 0 && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded font-medium text-primary-foreground text-sm"
                onClick={showMore}
              >
                View More {remaining >= 15 ? 15 : remaining}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

import { useState } from "react"
import { ClassCard } from "./class-card"

interface ClassListProps {
  title: string
  data: Array<any>
}

export const ClassList = ({ title, data }: ClassListProps) => {
  const [visibleCount, setVisibleCount] = useState(8)
  const showMore = () => setVisibleCount((prev) => prev + 8)
  const visibleData = data.slice(0, visibleCount)
  const remaining = data.length - visibleCount

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-primary">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
            Show {remaining >= 8 ? 8 : remaining} more
          </button>
        </div>
      )}
    </div>
  )
}

"use client"
import { useRouter } from "next/navigation"
import * as React from "react"
import TutorClassCard from "./_component/class-card"
import { useGetMyParentClasses } from "@/hooks/queries/useClassQuery"
import { ClassFilter } from "./_component/class-filter-menu"
import type { ClassStatus, MClass } from "@/types/classes"
import { ClassCardSkeleton } from "./_component/class-skeleton-card"

const ParentMyClassPage = () => {
  const router = useRouter()
  const [status, setStatus] = React.useState<ClassStatus | undefined>(undefined)
  const [searchValue, setSearchValue] = React.useState("")
  const { data: myClasses, isLoading } = useGetMyParentClasses(status)

  const filteredClasses = React.useMemo(() => {
    if (!myClasses) return []

    return myClasses.filter((classData) => {
      const searchLower = searchValue.toLowerCase()
      return (
        classData.name.toLowerCase().includes(searchLower)
      )
    })
  }, [myClasses, searchValue])

  const handleViewDetail = (classData: MClass) => {
    router.push(`/parent/my-classes/${classData.id}`)
  }
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1 space-y-8 mx-auto px-8 py-8 w-7xl">
        <h1 className="font-bold text-2xl">My Classes</h1>
        <ClassFilter
          value={status}
          onValueChange={setStatus}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ClassCardSkeleton key={i} />
              ))
            : filteredClasses?.map((classData) => (
                <TutorClassCard
                  key={classData.id}
                  classData={classData}
                  onViewHistory={handleViewDetail}
                />
              ))}
        </div>

        {/* Empty state */}
        {!isLoading && filteredClasses?.length === 0 && (
          <p className="py-16 text-muted-foreground text-center">
            You dont have any classes yet.
          </p>
        )}
      </main>
    </div>
  )
}

export default ParentMyClassPage

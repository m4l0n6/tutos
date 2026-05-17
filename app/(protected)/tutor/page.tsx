"use client"

import * as React from "react"
import { useAuth } from "@/context/AuthContext"
import { ClassList } from "./_components/ClassList/class-list"
import { ClassApplicationsList } from "./_components/ClassList/class-applications-list"
import { MyClassList } from "./_components/ClassList/my-class-list"
import { useGetClass } from "@/hooks/queries/useClassQuery"
import { useGetClassApplication } from "@/hooks/queries/useClassApplicationQuery"
import { TutorStats } from "./_components/TutorStats"
import { ClassFilterState } from "./_components/ClassList/class-filters"
import { DayOfWeek, MClass } from "@/types/classes"

const TutorPage = () => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.toLocaleDateString("vi-VN", { weekday: "long" })
  const dateString = currentDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const { user } = useAuth()
  const [filters, setFilters] = React.useState<ClassFilterState>({
    status: "RECRUITING",
  })

  const {
    data: classList = [],
    isLoading: isClassLoading,
    isError: isClassError,
    refetch: refetchClasses,
  } = useGetClass()

  const {
    data: classApplications = [],
    isLoading: isAppLoading,
    isError: isAppError,
    refetch: refetchApplications,
  } = useGetClassApplication()

  const appliedClassIds = (classApplications || [])
    .map(
      (a: { classId?: string; class?: { id?: string } }) =>
        a.classId ?? a.class?.id
    )
    .filter(Boolean)

  const handleFilterChange = React.useCallback(
    (newFilters: ClassFilterState) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  const filteredClassList = React.useMemo(() => {
    return classList.filter((c: MClass) => {
      if (filters.categoryId) {
        const filterCategories = filters.categoryId.split(",").filter(Boolean)
        if (
          filterCategories.length > 0 &&
          !filterCategories.includes(c.category.id)
        ) {
          return false
        }
      }

      if (filters.subjectId) {
        const filterSubjects = filters.subjectId.split(",").filter(Boolean)
        if (
          filterSubjects.length > 0 &&
          !filterSubjects.includes(c.subject.id)
        ) {
          return false
        }
      }

      if (filters.levelId) {
        const filterLevels = filters.levelId.split(",").filter(Boolean)
        if (filterLevels.length > 0 && !filterLevels.includes(c.level.id)) {
          return false
        }
      }

      if (filters.status) {
        if (c.status !== filters.status) {
          return false
        }
      }

      if (filters.dayOfWeek) {
        const filterDays = filters.dayOfWeek.split(",").filter(Boolean)
        if (
          filterDays.length > 0 &&
          !filterDays.some((day) => c.daysOfWeek.includes(day as DayOfWeek))
        ) {
          return false
        }
      }

      return true
    })
  }, [classList, filters])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="max-w-10xl mx-auto w-full flex-1 space-y-8 px-8 py-8">
        {/* Header Section */}
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Xin chào, {user?.fullName}
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Hôm nay là {dayOfWeek}, ngày {dateString}. Chúc bạn có một ngày
              làm việc hiệu quả!
            </p>
          </div>
        </header>

        {/* Statistics Bento Grid */}
        <TutorStats />

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-8">
            {/* My Classes */}
            <MyClassList />

            {/* Applications Section */}
            <ClassApplicationsList
              title="Đơn ứng tuyển của tôi"
              data={classApplications}
              onRefresh={refetchApplications}
              isLoading={isAppLoading}
              isError={isAppError}
            />

            {/* Classes Section */}
            <ClassList
              title="Lớp học mới nhất"
              data={filteredClassList}
              appliedClassIds={appliedClassIds}
              onRefresh={refetchClasses}
              isLoading={isClassLoading}
              isError={isClassError}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default TutorPage

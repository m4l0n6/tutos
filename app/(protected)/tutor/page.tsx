"use client"

import { GraduationCap, Clock, Wallet } from "lucide-react"
import { Stat, StatIndicator, StatLabel, StatValue } from "@/components/ui/stat"
import { useAuth } from "@/context/AuthContext"
import { ClassList } from "./_components/ClassList/class-list"
import { useGetClass } from "@/hooks/queries/useClassQuery"

const TutorPage = () => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.toLocaleDateString("vi-VN", { weekday: "long" })
  const dateString = currentDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const { user } = useAuth()
  const {
    data: classList = [],
    isLoading: isClassLoading,
    isError: isClassError,
  } = useGetClass()

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
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Stat>
            <StatIndicator variant="icon" color="success">
              <GraduationCap className="size-4" />
            </StatIndicator>
            <StatLabel>Lớp đang dạy</StatLabel>
            <StatValue>03</StatValue>
          </Stat>

          <Stat>
            <StatIndicator variant="icon" color="warning">
              <Clock className="size-4" />
            </StatIndicator>
            <StatLabel>Yêu cầu chờ duyệt</StatLabel>
            <StatValue>02</StatValue>
          </Stat>

          <Stat>
            <StatIndicator variant="icon" color="info">
              <Wallet className="size-4" />
            </StatIndicator>
            <StatLabel>Tổng tiền nhận tháng này dự kiến</StatLabel>
            <StatValue>4.200k VNĐ</StatValue>
          </Stat>
        </section>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {isClassLoading && (
              <p className="text-sm text-muted-foreground">
                Đang tải lớp học...
              </p>
            )}

            {isClassError && (
              <p className="text-sm text-destructive">
                Không thể tải danh sách lớp. Vui lòng thử lại.
              </p>
            )}

            {!isClassLoading && !isClassError && (
              <ClassList title="Lớp học mới nhất" data={classList} />
            )}
          </div>

          <aside className="space-y-8 lg:col-span-4"></aside>
        </div>
      </main>
    </div>
  )
}

export default TutorPage

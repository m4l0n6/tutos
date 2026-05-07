"use client"

import { Plus, GraduationCap, Clock, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stat, StatIndicator, StatLabel, StatValue } from "@/components/ui/stat"
import { useAuth } from "@/context/AuthContext"
import { ClassList } from "./_components/ClassList/class-list"
import { MClass } from "@/types/classes"

// 4 mock class data
const mockClassList: MClass[] = [
  {
    id: "1",
    requestId: "r1",
    name: "Lớp Tiếng Anh nâng cao - 5",
    subject: "Tiếng Anh",
    level: "Lớp 12",
    daysOfWeek: ["MONDAY", "THURSDAY"],
    startTime: "18:00",
    endTime: "20:00",
    timeNote: null,
    location: "Cau Giay, Hanoi",
    adminNote: null,
    acceptanceFee: 500000,
    status: "RECRUITING",
    createdAt: "2026-05-07T12:36:17.402Z",
    updatedAt: "2026-05-07T12:36:17.402Z",
    request: {
      id: "r1",
      parentId: "p1",
      subject: "Tiếng Anh",
      level: "Lớp 12",
      description: "Cần gia sư kiên nhẫn cho con học Tiếng Anh.",
      daysOfWeek: ["MONDAY", "THURSDAY"],
      startTime: "1080",
      endTime: "1200",
      timeNote: null,
      location: "Cau Giay, Hanoi",
      minBudget: 200000,
      maxBudget: 400000,
      status: "OPEN",
      createdAt: "2026-05-07T12:36:16.549Z",
      updatedAt: "2026-05-07T12:36:16.549Z",
      parent: {
        fullName: "Parent 1",
        id: "p1",
        email: "",
        role: "PARENT",
        createdAt: "",
        updatedAt: "",
      },
    },
    isTrialConfirmedByParent: false,
    isTrialConfirmedByTutor: false,
  },
  {
    id: "2",
    requestId: "r2",
    name: "Lớp Toán nâng cao",
    subject: "Toán",
    level: "Lớp 10",
    daysOfWeek: ["TUESDAY", "FRIDAY"],
    startTime: "17:00",
    endTime: "19:00",
    timeNote: null,
    location: "Ba Dinh, Hanoi",
    adminNote: null,
    acceptanceFee: 400000,
    status: "RECRUITING",
    createdAt: "2026-05-07T12:36:17.402Z",
    updatedAt: "2026-05-07T12:36:17.402Z",
    request: {
      id: "r2",
      parentId: "p2",
      subject: "Toán",
      level: "Lớp 10",
      description: "Cần gia sư dạy Toán nâng cao cho học sinh lớp 10.",
      daysOfWeek: ["TUESDAY", "FRIDAY"],
      startTime: "1020",
      endTime: "1140",
      timeNote: null,
      location: "Ba Dinh, Hanoi",
      minBudget: 250000,
      maxBudget: 350000,
      status: "OPEN",
      createdAt: "2026-05-07T12:36:16.549Z",
      updatedAt: "2026-05-07T12:36:16.549Z",
      parent: {
        fullName: "Parent 2",
        id: "p2",
        email: "",
        role: "PARENT",
        createdAt: "",
        updatedAt: "",
      },
    },
    isTrialConfirmedByParent: false,
    isTrialConfirmedByTutor: false,
  },
  {
    id: "3",
    requestId: "r3",
    name: "Lớp Lý cơ bản",
    subject: "Vật Lý",
    level: "Lớp 11",
    daysOfWeek: ["WEDNESDAY", "SATURDAY"],
    startTime: "16:00",
    endTime: "18:00",
    timeNote: null,
    location: "Dong Da, Hanoi",
    adminNote: null,
    acceptanceFee: 350000,
    status: "RECRUITING",
    createdAt: "2026-05-07T12:36:17.402Z",
    updatedAt: "2026-05-07T12:36:17.402Z",
    request: {
      id: "r3",
      parentId: "p3",
      subject: "Vật Lý",
      level: "Lớp 11",
      description: "Tìm gia sư dạy Lý cơ bản, ưu tiên có kinh nghiệm.",
      daysOfWeek: ["WEDNESDAY", "SATURDAY"],
      startTime: "960",
      endTime: "1080",
      timeNote: null,
      location: "Dong Da, Hanoi",
      minBudget: 180000,
      maxBudget: 300000,
      status: "OPEN",
      createdAt: "2026-05-07T12:36:16.549Z",
      updatedAt: "2026-05-07T12:36:16.549Z",
      parent: {
        fullName: "Parent 3",
        id: "p3",
        email: "",
        role: "PARENT",
        createdAt: "",
        updatedAt: "",
      },
    },
    isTrialConfirmedByParent: false,
    isTrialConfirmedByTutor: false,
  },
  {
    id: "4",
    requestId: "r4",
    name: "Lớp Hóa học nâng cao",
    subject: "Hóa Học",
    level: "Lớp 9",
    daysOfWeek: ["THURSDAY", "SUNDAY"],
    startTime: "15:00",
    endTime: "17:00",
    timeNote: null,
    location: "Hai Ba Trung, Hanoi",
    adminNote: null,
    acceptanceFee: 300000,
    status: "RECRUITING",
    createdAt: "2026-05-07T12:36:17.402Z",
    updatedAt: "2026-05-07T12:36:17.402Z",
    request: {
      id: "r4",
      parentId: "p4",
      subject: "Hóa Học",
      level: "Lớp 9",
      description: "Cần gia sư dạy Hóa học nâng cao cho học sinh lớp 9.",
      daysOfWeek: ["THURSDAY", "SUNDAY"],
      startTime: "900",
      endTime: "1020",
      timeNote: null,
      location: "Hai Ba Trung, Hanoi",
      minBudget: 220000,
      maxBudget: 320000,
      status: "OPEN",
      createdAt: "2026-05-07T12:36:16.549Z",
      updatedAt: "2026-05-07T12:36:16.549Z",
      parent: {
        fullName: "Parent 4",
        id: "p4",
        email: "",
        role: "PARENT",
        createdAt: "",
        updatedAt: "",
      },
    },
    isTrialConfirmedByParent: false,
    isTrialConfirmedByTutor: false,
  },
]

const TutorPage = () => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.toLocaleDateString("vi-VN", { weekday: "long" })
  const dateString = currentDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const { user } = useAuth()
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
            <ClassList title="Lớp học mới nhất" data={mockClassList} />
          </div>

          <aside className="space-y-8 lg:col-span-4"></aside>
        </div>
      </main>
    </div>
  )
}

export default TutorPage

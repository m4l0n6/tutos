"use client"

'use client';

import { useState } from 'react';
import { Plus, GraduationCap, Clock, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stat, StatIndicator, StatLabel, StatValue } from '@/components/ui/stat';
import { SearchingRequests } from './_component/dashboard/searching-requests';
import { Notifications } from './_component/dashboard/notifications';
import { WeeklySchedule } from './_component/dashboard/weekly-schedule';
import { PromotionalBanner } from './_component/dashboard/promotional-banner';
import { useAuth } from '@/context/AuthContext';

const mockSearchingRequests = [
  {
    id: "1",
    subject: "Toán Nâng Cao 10",
    student: "Nam",
    frequency: "2 buổi / tuần",
    tutorAvatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeoW2TOCgSNnie4zvqsMZXoOgKuCFDNp8INX8UnWty4pVxYAdqmFKIcZeinlFn56QUqSN8DlMRuwEXorGn_wxs80_puee_yh__dS7g5n0FCsomPhg5fn0HnizHE3w0IbT7gi8Kwmk9-5AWzgIIr62x9gNsH2nWuNotIQCKvZ12RdbRDYKtaA5A4bU_UEuwEYY6suVOLwxVjVr1MmWPLxMg_-GxOU5XmW3iQsZYJNDodxiyi-0LbSblEy_zheBLhB4CNgLSwpouojQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAg5UkQ2VLsqcUdKm70nzeVXsobVHQxFfJmzPD8laNpsz-F7Xgnz5Zi_dBod6nZ_zyEga-XEZEEq9A7gz3jIl3JJcuVtCbwhTfEt8rrqwjzepRzgDqkzELdmmSEOnEUth6KT_zHAX7fpDy-BTyzlDFjitSXWHMIGZE0TCxWXegKXFIM4TX0MgRH_w4IU0SQ-6wZ7Px0lkx-RUe9LWn-xLiKaS9eWdhwEYl-8IgW0XYberT7MUG2FaxA5prdg-gmp_QI0U_nJetgtEw",
    ],
    additionalTutors: 5,
  },
  {
    id: "2",
    subject: "Tiếng Anh Giao Tiếp 7",
    student: "Bảo Anh",
    frequency: "3 buổi / tuần",
    tutorAvatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPu5-uPhPlJOvnaq7w4hPLIr9fSrUJbxQH3VygKoUCpH2mX_4_f7GNlc5c0sNgqA1PxnHSSxQ57thEdyXETWZjvBEjGSb1FumN7WoSB6mDBLpZYmkQk1IVf2Nc5pdQKCbNLr7z6FCxY4F6g7gz_LL_pbuhQFz1ulYNI29b4tvmt0fxkgsDfO_EjkVMRGeXoS9z6W5EnGTWsFNZP0FtSuIJEnhDKHMNx6eqEZovDFGX3AWNqcyx78P3q4wuXvpmwz6i6N9vDqbJJbA",
    ],
    additionalTutors: 2,
  },
]

const mockNotifications = [
  {
    id: "1",
    type: "success" as const,
    message: (
      <>
        Gia sư <strong>Trần Hoàng Nam</strong> đã nhận lớp{" "}
        <strong>Advanced Math 10</strong> of yours. Please check details and
        contact a tutor to arrange class schedule.
      </>
    ),
    timestamp: "2 phút trước",
  },
  {
    id: "2",
    type: "info" as const,
    message: (
      <>
        System: Class Reminder for <strong>Physics 11</strong> will be held at
        lúc 19:00 tối nay.
      </>
    ),
    timestamp: "1 hour ago",
  },
]

const mockSchedule = [
  {
    time: "17:30 - 19:30",
    subject: "Toán Nâng Cao 10",
    tutor: "Trần Hoàng Nam",
    isActive: true,
  },
  {
    time: "19:30 - 21:00",
    subject: "Vật Lý 11",
    tutor: "Lê Thu Trang",
    isActive: false,
  },
]

const ParentDashboardPage = () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleDateString('vi-VN', { weekday: 'long' });
  const dateString = currentDate.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const { user } = useAuth();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Modal */}
      
      <main className="flex-1 space-y-8 mx-auto px-8 py-8 w-full max-w-7xl">
        {/* Header Section */}
        <div className="flex md:flex-row flex-col justify-between md:items-end gap-4">
          <div>
            <h1 className="font-bold text-2xl">Hello, {user?.fullName}</h1>
            <p className="text-body-lg text-on-surface-variant">
              Today is {dayOfWeek}, {dateString}. Wish you and your children a wonderful day.
              học tập hiệu quả!
            </p>
          </div>
        </div>

        {/* Statistics Bento Grid */}
        <section className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <Stat>
            <StatIndicator variant="icon" color="success">
              <GraduationCap className="size-4" />
            </StatIndicator>
            <StatLabel>Classes Attending</StatLabel>
            <StatValue>03</StatValue>
          </Stat>

          <Stat>
            <StatIndicator variant="icon" color="warning">
              <Clock className="size-4" />
            </StatIndicator>
            <StatLabel>Requests Pending Tutors</StatLabel>
            <StatValue>02</StatValue>
          </Stat>

          <Stat>
            <StatIndicator variant="icon" color="info">
              <Wallet className="size-4" />
            </StatIndicator>
            <StatLabel>Total Monthly Costs</StatLabel>
            <StatValue>4.200k VNĐ</StatValue>
          </Stat>
        </section>

        {/* Main Dashboard Layout */}
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
          {/* Column: Requests & Notifications */}
          <div className="space-y-8 lg:col-span-8">
            <SearchingRequests requests={mockSearchingRequests} />
            {/* <Notifications notifications={mockNotifications} /> */}
          </div>

          {/* Column: Weekly Schedule Widget */}
          <aside className="space-y-8 lg:col-span-4">
            <WeeklySchedule currentDay={4} schedule={mockSchedule} />
            <PromotionalBanner />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default ParentDashboardPage

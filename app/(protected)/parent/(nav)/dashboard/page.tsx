
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from './_components/stat-card';
import { SearchingRequests } from './_components/searching-requests';
import { Notifications } from './_components/notifications';
import { WeeklySchedule } from './_components/weekly-schedule';
import { PromotionalBanner } from './_components/promotional-banner';
import { CreateRequestModal } from './_components/create-request-modal';

const mockSearchingRequests = [
  {
    id: '1',
    subject: 'Toán Nâng Cao 10',
    student: 'Nam',
    frequency: '2 buổi / tuần',
    tutorAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCeoW2TOCgSNnie4zvqsMZXoOgKuCFDNp8INX8UnWty4pVxYAdqmFKIcZeinlFn56QUqSN8DlMRuwEXorGn_wxs80_puee_yh__dS7g5n0FCsomPhg5fn0HnizHE3w0IbT7gi8Kwmk9-5AWzgIIr62x9gNsH2nWuNotIQCKvZ12RdbRDYKtaA5A4bU_UEuwEYY6suVOLwxVjVr1MmWPLxMg_-GxOU5XmW3iQsZYJNDodxiyi-0LbSblEy_zheBLhB4CNgLSwpouojQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg5UkQ2VLsqcUdKm70nzeVXsobVHQxFfJmzPD8laNpsz-F7Xgnz5Zi_dBod6nZ_zyEga-XEZEEq9A7gz3jIl3JJcuVtCbwhTfEt8rrqwjzepRzgDqkzELdmmSEOnEUth6KT_zHAX7fpDy-BTyzlDFjitSXWHMIGZE0TCxWXegKXFIM4TX0MgRH_w4IU0SQ-6wZ7Px0lkx-RUe9LWn-xLiKaS9eWdhwEYl-8IgW0XYberT7MUG2FaxA5prdg-gmp_QI0U_nJetgtEw',
    ],
    additionalTutors: 5,
  },
  {
    id: '2',
    subject: 'Tiếng Anh Giao Tiếp 7',
    student: 'Bảo Anh',
    frequency: '3 buổi / tuần',
    tutorAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPu5-uPhPlJOvnaq7w4hPLIr9fSrUJbxQH3VygKoUCpH2mX_4_f7GNlc5c0sNgqA1PxnHSSxQ57thEdyXETWZjvBEjGSb1FumN7WoSB6mDBLpZYmkQk1IVf2Nc5pdQKCbNLr7z6FCxY4F6g7gz_LL_pbuhQFz1ulYNI29b4tvmt0fxkgsDfO_EjkVMRGeXoS9z6W5EnGTWsFNZP0FtSuIJEnhDKHMNx6eqEZovDFGX3AWNqcyx78P3q4wuXvpmwz6i6N9vDqbJJbA',
    ],
    additionalTutors: 2,
  },
];

const mockNotifications = [
  {
    id: '1',
    type: 'success' as const,
    message: 'Gia sư <strong>Nguyễn Văn A</strong> đã đăng ký nhận lớp <strong>Toán 10</strong> của bạn.',
    timestamp: '2 phút trước',
  },
  {
    id: '2',
    type: 'info' as const,
    message: 'Hệ thống: Nhắc nhở buổi học môn <strong>Lý 11</strong> sẽ diễn ra vào lúc 19:00 tối nay.',
    timestamp: '1 giờ trước',
  },
];

const mockSchedule = [
  {
    time: '17:30 - 19:30',
    subject: 'Toán Nâng Cao 10',
    tutor: 'Trần Hoàng Nam',
    isActive: true,
  },
  {
    time: '19:30 - 21:00',
    subject: 'Vật Lý 11',
    tutor: 'Lê Thu Trang',
    isActive: false,
  },
];

const ParentDashboardPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleDateString('vi-VN', { weekday: 'long' });
  const dateString = currentDate.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Modal */}
      <CreateRequestModal open={modalOpen} onOpenChange={setModalOpen} />
      <main className="flex-1 space-y-8 mx-auto px-8 py-8 w-full max-w-7xl">
        {/* Header Section */}
        <header className="flex md:flex-row flex-col justify-between md:items-end gap-4">
          <div>
            <h1 className="mb-2 text-primary text-xl">Chào buổi sáng, Chị Minh Anh</h1>
            <p className="text-body-lg text-on-surface-variant">
              Hôm nay là {dayOfWeek}, ngày {dateString}. Chúc các con một ngày học tập hiệu quả!
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary shadow-lg hover:brightness-110 px-6 py-3 rounded-lg font-label-sm text-on-primary active:scale-95 transition-all"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Tạo yêu cầu mới
          </Button>
        </header>

        {/* Statistics Bento Grid */}
        <section className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <StatCard
            icon={<span className="flex justify-center items-center w-6 h-6 text-primary material-symbols-outlined">school</span>}
            backgroundColor="bg-secondary-container"
            iconColor="text-primary"
            label="Lớp đang học"
            value="03"
            unit="lớp"
          />
          <StatCard
            icon={<span className="flex justify-center items-center w-6 h-6 text-tertiary material-symbols-outlined">pending_actions</span>}
            backgroundColor="bg-tertiary-fixed"
            iconColor="text-tertiary"
            label="Yêu cầu chờ gia sư"
            value="02"
            unit="đang tìm"
          />
          <StatCard
            icon={<span className="flex justify-center items-center w-6 h-6 text-on-primary-container material-symbols-outlined">account_balance_wallet</span>}
            backgroundColor="bg-primary-container"
            iconColor="text-on-primary-container"
            label="Tổng chi phí tháng này"
            value="4.200k"
            unit="VNĐ"
          />
        </section>

        {/* Main Dashboard Layout */}
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
          {/* Column: Requests & Notifications */}
          <div className="space-y-8 lg:col-span-8">
            <SearchingRequests requests={mockSearchingRequests} />
            <Notifications notifications={mockNotifications} />
          </div>

          {/* Column: Weekly Schedule Widget */}
          <aside className="space-y-8 lg:col-span-4">
            <WeeklySchedule currentDay={4} schedule={mockSchedule} />
            <PromotionalBanner />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboardPage;
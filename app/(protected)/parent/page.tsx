"use client"

'use client';

import { useState, useMemo } from 'react';
import { GraduationCap, Clock, Wallet, PlusIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stat, StatIndicator, StatLabel, StatValue } from '@/components/ui/stat';
import { PromotionalBanner } from './_component/dashboard/promotional-banner';
import { useAuth } from '@/context/AuthContext';
import { CreateRequestModal } from './my-requests/_component/create-request-modal';
import RequestCard from './my-requests/_component/request-card';
import { RequestCardSkeleton } from './my-requests/_component/request-skeleton-card';
import { useGetMyParentClassesRequest } from '@/hooks/queries/useClassQuery';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ParentDashboardPage = () => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.toLocaleDateString("vi-VN", { weekday: "long" })
  const dateString = currentDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const { data: requests, isLoading } = useGetMyParentClassesRequest()

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <CreateRequestModal open={modalOpen} onOpenChange={setModalOpen} />

      <main className="flex-1 space-y-8 mx-auto px-8 py-8 w-full max-w-7xl">
        {/* Header Section */}
        <div className="flex md:flex-row flex-col justify-between md:items-end gap-4">
          <div>
            <h1 className="font-bold text-2xl">Hello, {user?.fullName}</h1>
            <p className="text-body-lg text-on-surface-variant">
              Today is {dayOfWeek}, {dateString}. Wish you and your children a
              wonderful day. học tập hiệu quả!
            </p>
          </div>
          <div>
            <Button onClick={() => setModalOpen(true)} size="lg">
              <PlusIcon className="w-4 h-4" />
              New Request
            </Button>
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
            {/* Requests Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-xl">My Requests</h2>
                </div>
                <div>
                  <Link href="/parent/my-requests" className="text-primary hover:underline">
                    View all
                  </Link>
                </div>
              </div>

              {/* Requests Grid */}
              <div className="gap-4 grid">
                {isLoading ? (
                  <>
                    <RequestCardSkeleton />
                    <RequestCardSkeleton />
                    <RequestCardSkeleton />
                  </>
                ) : requests && requests.length > 0 ? (
                  requests
                      .slice(0, 3)
                    .map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                    />
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-slate-500">No requests found</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <PromotionalBanner />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default ParentDashboardPage

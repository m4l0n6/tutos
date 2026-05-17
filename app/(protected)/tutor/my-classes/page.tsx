"use client"

import { useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import { useGetTutorClass } from "@/hooks/queries/useClassQuery"
import type { MClass } from "@/types/classes"
import ClassCard from "./ClassCard"
import SkeletonCard from "./SkeletonCard"
import styles from "./my-classes.module.css"
import {
  TABS,
  ACTIVE_STATUSES,
  COMPLETED_STATUSES,
  isUpcoming,
  getNextSessionDate,
  shouldShowNextSession,
  EMPTY_MSG,
} from "./utils"

export default function MyClassesPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "upcoming" | "completed"
  >("all")

  const {
    data: classList = [],
    isLoading,
    isError,
    refetch,
  } = useGetTutorClass()

  const activeClasses = useMemo(
    () => classList.filter((c) => ACTIVE_STATUSES.includes(c.status as any)),
    [classList]
  )

  const upcomingClasses = useMemo(
    () =>
      activeClasses
        .filter(isUpcoming)
        .sort(
          (a, b) =>
            (getNextSessionDate(a)?.getTime() ?? 0) -
            (getNextSessionDate(b)?.getTime() ?? 0)
        ),
    [activeClasses]
  )

  const completedClasses = useMemo(
    () => classList.filter((c) => COMPLETED_STATUSES.includes(c.status as any)),
    [classList]
  )

  const tabCounts: Record<string, number> = {
    all: classList.length,
    active: activeClasses.length,
    upcoming: upcomingClasses.length,
    completed: completedClasses.length,
  }

  const displayList: MClass[] =
    activeTab === "all"
      ? classList
      : activeTab === "active"
        ? activeClasses
        : activeTab === "upcoming"
          ? upcomingClasses
          : completedClasses

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="max-w-10xl mx-auto w-full flex-1 px-8 py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Lớp học của tôi</h1>
            {!isLoading && !isError && (
              <p className="mt-1 text-sm text-muted-foreground">
                Bạn đang có{" "}
                <span className="font-semibold text-foreground">
                  {classList.length} lớp học
                </span>{" "}
                trong hệ thống.
              </p>
            )}
          </div>

          <div className="flex w-fit items-center gap-1 rounded-xl border border-border bg-muted/40 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {tabCounts[tab.key] > 0 && (
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {tabCounts[tab.key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            <RotateCcw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Làm mới
          </button>
        </div>

        {isLoading ? (
          <div className={`${styles.responsiveGrid} gap-4`}>
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-destructive/40 py-20 text-center">
            <p className="text-sm text-destructive">
              Không thể tải danh sách. Vui lòng thử lại.
            </p>
          </div>
        ) : displayList.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-sm text-muted-foreground">
              {EMPTY_MSG[activeTab]}
            </p>
          </div>
        ) : (
          <div className={`${styles.responsiveGrid} gap-4`}>
            {displayList.map((cls) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                showNext={shouldShowNextSession(cls)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

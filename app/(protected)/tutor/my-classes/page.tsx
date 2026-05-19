"use client"

import { useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import { useGetTutorClass } from "@/hooks/queries/useClassQuery"
import type { ClassStatus, MClass } from "@/types/classes"
import ClassCard from "./_component/ClassCard"
import SkeletonCard from "./_component/SkeletonCard"
import styles from "./_component/my-classes.module.css"
import {
  TABS,
  ACTIVE_STATUSES,
  COMPLETED_STATUSES,
  shouldShowNextSession,
  EMPTY_MSG,
} from "./_component/utils"

export default function MyClassesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all"
  )

  const {
    data: classList = [],
    isLoading,
    isError,
    refetch,
  } = useGetTutorClass()

  const activeClasses = useMemo(
    () =>
      classList.filter((c) =>
        ACTIVE_STATUSES.includes(c.status as ClassStatus)
      ),
    [classList]
  )
  const completedClasses = useMemo(
    () =>
      classList.filter((c) =>
        COMPLETED_STATUSES.includes(c.status as ClassStatus)
      ),
    [classList]
  )

  const tabCounts: Record<string, number> = {
    all: classList.length,
    active: activeClasses.length,
    completed: completedClasses.length,
  }

  const displayList: MClass[] =
    activeTab === "all"
      ? classList
      : activeTab === "active"
        ? activeClasses
        : completedClasses

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1 mx-auto px-8 py-8 w-full max-w-10xl">
        <div className="flex md:flex-row flex-col md:justify-between md:items-start gap-4 mb-6">
          <div>
            <h1 className="font-bold text-primary text-2xl">My Classes</h1>
            {!isLoading && !isError && (
              <p className="mt-1 text-muted-foreground text-sm">
                You currently have{" "}
                <span className="font-semibold text-foreground">
                  {classList.length} classes
                </span>{" "}
                in the system.
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 bg-muted/40 p-1 border border-border rounded-xl w-fit">
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

        <div className="flex justify-end mb-6">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 hover:bg-muted disabled:opacity-50 px-3 py-1.5 border border-border rounded-lg font-medium text-muted-foreground text-sm transition-colors"
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
          <div className="flex flex-col justify-center items-center py-20 border border-destructive/40 border-dashed rounded-2xl text-center">
            <p className="text-destructive text-sm">
              Cannot load list. Please try again.
            </p>
          </div>
        ) : displayList.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 border border-border border-dashed rounded-2xl text-center">
            <p className="text-muted-foreground text-sm">
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

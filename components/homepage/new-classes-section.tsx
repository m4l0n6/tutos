"use client"

import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export type TutoringClass = {
  id: string
  subject: string
  title: string
  pricePerSession: number
  address: string
  schedule: string
}

interface NewClassesSectionProps {
  classes?: TutoringClass[]
  onRegister?: (classId: string) => void
  onViewAll?: () => void
}

export function NewClassesSection({
  classes = defaultClasses,
  onRegister,
  onViewAll,
}: NewClassesSectionProps) {
  return (
    <div className="mx-auto px-4 md:px-8 py-10 w-full max-w-6xl font-sans">
      {/* Header */}
      <div className="flex justify-between items-end gap-4 mb-7">
        <div>
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tighter">
            New classes seeking tutors
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Latest tutor requests updated from parents
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1.5 font-medium text-[13px] whitespace-nowrap transition-colors shrink-0"
        >
          View all classes
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* Grid */}
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {classes.map((cls) => (
          <ClassCard key={cls.id} cls={cls} onRegister={onRegister} />
        ))}
      </div>
    </div>
  )
}

interface ClassCardProps {
  cls: TutoringClass
  onRegister?: (classId: string) => void
}

function ClassCard({ cls, onRegister }: ClassCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-0 rounded-xl overflow-hidden",
        "border border-border bg-background",
        "transition-all duration-200 hover:border-foreground/20 hover:shadow-md",
      )}
    >
      <div className="flex flex-col gap-4 p-5">
        {/* Subject badge + price */}
        <div className="flex justify-between items-center gap-2">
          <span className="bg-muted px-2.5 py-1 rounded-md font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
            {cls.subject}
          </span>
          <span className="font-semibold tabular-nums text-[13px] text-foreground">
            {(cls.pricePerSession / 1000).toFixed(0)}k
            <span className="font-normal text-muted-foreground">/session</span>
          </span>
        </div>

        {/* Title */}
        <p className="font-semibold text-[15px] text-foreground leading-snug tracking-tight">
          {cls.title}
        </p>

        {/* Divider */}
        <div className="border-border border-t" />

        {/* Meta */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-muted-foreground shrink-0" />
            <span className="text-[12px] text-muted-foreground line-clamp-1">
              {cls.address}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-3.5 text-muted-foreground shrink-0" />
            <span className="text-[12px] text-muted-foreground">
              {cls.schedule}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => onRegister?.(cls.id)}
          className={cn(
            "mt-1 py-2 rounded-lg w-full font-medium text-[13px]",
            "transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
          )}
        >
          Register now
        </Button>
      </div>
    </div>
  )
}

const defaultClasses: TutoringClass[] = [
  {
    id: "1",
    subject: "Mathematics",
    title: "Algebra & Calculus",
    pricePerSession: 250000,
    address: "Hoang Quoc Viet, Hanoi",
    schedule: "Mon, Wed 6-7 PM",
  },
  {
    id: "2",
    subject: "English",
    title: "Business Communication",
    pricePerSession: 200000,
    address: "Tran Duy Hung, Ha Noi",
    schedule: "Tue, Thu 7-8 PM",
  },
  {
    id: "3",
    subject: "Physics",
    title: "High School Physics",
    pricePerSession: 280000,
    address: "Cau Giay, Hanoi",
    schedule: "Sat, Sun 2-3 PM",
  },
  {
    id: "4",
    subject: "Chemistry",
    title: "Organic Chemistry",
    pricePerSession: 300000,
    address: "Ba Dinh, Hanoi",
    schedule: "Wed, Fri 6-7 PM",
  },
]

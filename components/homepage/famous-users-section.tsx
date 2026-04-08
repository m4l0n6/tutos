"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export type FamousUser = {
  id: string
  name: string
  image: string
  rating: number
  badges: string[]
  description: string
  specializations?: string[]
}

interface FamousUsersProps {
  tutors?: FamousUser[]
}

export function FamousUsersSection({
  tutors = defaultTutors,
}: FamousUsersProps) {
  return (
    <div className="mx-auto px-4 md:px-8 py-12 w-full max-w-6xl font-sans">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
        <div>
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tighter">
            Meet our best educators
          </h2>
        </div>
        <p className="hidden md:block max-w-[260px] text-[13px] text-muted-foreground text-right leading-relaxed">
          Experienced, modern methods, and genuinely dedicated to every student.
        </p>
      </div>

      {/* Tutors Grid */}
      <div className="gap-px grid grid-cols-2 lg:grid-cols-4 bg-border border border-border rounded-xl divide-x divide-border overflow-hidden">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-7 pt-5 border-border border-t">
        <p className="text-[12px] text-muted-foreground">
          <span className="font-medium text-foreground">200+</span> verified
          tutors available
        </p>
        <button className="hover:bg-muted px-3.5 py-1.5 border border-border rounded-md font-medium text-[12px] text-foreground transition-colors">
          View all →
        </button>
      </div>
    </div>
  )
}

interface TutorCardProps {
  tutor: FamousUser
}

function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="group flex flex-col bg-background hover:bg-muted/50 transition-colors duration-200 cursor-pointer">
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={tutor.image}
          alt={tutor.name}
          fill
          className="grayscale-[20%] group-hover:grayscale-0 object-cover group-hover:scale-[1.04] transition-all duration-500 ease-out"
        />
        {/* Rating Badge */}
        <div className="top-2.5 right-2.5 absolute flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-0.5 border border-border/60 rounded-full">
          <Star className="fill-amber-400 size-3 text-amber-400" />
          <span className="font-medium text-[12px] text-foreground">
            {tutor.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2.5 p-3.5 pb-4">
        <h3 className="font-medium text-[14px] text-foreground tracking-tight">
          {tutor.name}
        </h3>

        <p className="text-[12px] text-muted-foreground leading-relaxed">
          {tutor.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {tutor.badges.map((badge) => (
            <span
              key={badge}
              className="bg-muted px-2 py-0.5 border border-border rounded-md text-[11px] text-muted-foreground"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Specializations */}
        {tutor.specializations && tutor.specializations.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-1 mt-auto pt-2.5 border-border border-t"
            )}
          >
            {tutor.specializations.map((spec, i) => (
              <span
                key={spec}
                className="font-medium text-[10px] text-muted-foreground uppercase tracking-widest"
              >
                {spec}
                {i < tutor.specializations!.length - 1 && (
                  <span className="ml-1">·</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const defaultTutors: FamousUser[] = [
  {
    id: "1",
    name: "Emily Carter",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=666&fit=crop&crop=face",
    rating: 5.0,
    badges: ["Hanoi Univ. of Education", "Math tutor"],
    description: "Dedicated · Modern approach · Proven results",
    specializations: ["Math", "Grades 1–12"],
  },
  {
    id: "2",
    name: "James Nguyen",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=666&fit=crop&crop=face",
    rating: 4.9,
    badges: ["Hanoi Univ. of Education", "Math tutor"],
    description: "Patient · Clear explanations · Exam-focused",
    specializations: ["Math", "Exam prep"],
  },
  {
    id: "3",
    name: "Sophie Tran",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=666&fit=crop&crop=face",
    rating: 5.0,
    badges: ["Hanoi Univ. of Education", "STEM tutor"],
    description: "Creative · Play-based learning · Critical thinking",
    specializations: ["Math", "STEM"],
  },
  {
    id: "4",
    name: "Daniel Le",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=666&fit=crop&crop=face",
    rating: 4.8,
    badges: ["Univ. of Foreign Languages", "English tutor"],
    description: "Enthusiastic · In-depth knowledge · Clear progress",
    specializations: ["Math", "Languages"],
  },
]

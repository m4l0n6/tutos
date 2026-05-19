"use client"

import { useState } from "react"
import { Check, Heart, GraduationCap } from "lucide-react"
import { useRole } from "@/hooks/queries/useAuthQuery"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getToken } from "@/lib/auth"
import { api } from "@/lib/axios"
import { userKeys } from "@/hooks/queries/useUserQuery"
import { useQueryClient } from "@tanstack/react-query"

type Role = "TUTOR" | "PARENT" | null

interface RoleOption {
  id: "TUTOR" | "PARENT"
  title: string
  description: string
}

const roles: RoleOption[] = [
  {
    id: "PARENT",
    title: "Phụ huynh",
    description:
      "I want to find suitable tutors and monitor my child's learning progress",
  },
  {
    id: "TUTOR",
    title: "Tutor",
    description:
      "I want to connect with students and manage my teaching schedule",
  },
]

interface RoleSelectorProps {
  onConfirm?: (role: "TUTOR" | "PARENT") => void
}

export default function RoleSelector({ onConfirm }: RoleSelectorProps) {
    const [selected, setSelected] = useState<Role>(null)
    const { mutate } = useRole()
    const router = useRouter()
    const queryClient = useQueryClient()

  const handleConfirm = () => {
    if (selected) {
        mutate(
          { role: selected },
          {
            onSuccess: async (response) => {
              toast.success("Role set successfully! Redirecting...")

              const token = getToken()
              const res = await api.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
              })
              const updatedUser = res.data.data

              queryClient.setQueryData(userKeys.me(), updatedUser)
              
              if (onConfirm) onConfirm(selected)

              if (selected === "TUTOR") {
                router.push("/tutor")
              } else {
                router.push("/parent")
              }
            },
            onError: (error) => {
              toast.error("Role set failed")
              console.error("Failed to set role:", error)
            },
          }
        )
    }
  }

  return (
    // h-svh thay vì min-h-svh: không cho content đẩy cao hơn viewport
    <div className="flex justify-center items-center w-full h-svh overflow-hidden">
      <div className="flex flex-col items-center gap-8 px-4 py-10 w-full">
        {/* Heading */}
        <div className="text-center">
          <h2 className="mb-1.5 font-medium text-gray-900 text-2xl">
            Bạn là ai?
          </h2>
          <p className="text-gray-500 text-sm">
            Select the appropriate role to start using our platform
          </p>
        </div>

        {/* Cards */}
        <div className="gap-4 grid grid-cols-2 w-full max-w-lg">
          {roles.map((role) => {
            const isSelected = selected === role.id
            return (
              <div
                key={role.id}
                onClick={() => setSelected(role.id)}
                // relative is required so the absolute badge doesn't escape the card
                className={`relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border bg-white p-8 text-center transition-all duration-200 ${
                  isSelected
                    ? "-translate-y-0.5 border-2 border-primary"
                    : "border-gray-200"
                }`}
              >
                {/* Chỉ render badge khi selected — tránh element absolute vô hình gây overflow */}
                {isSelected && (
                  <div className="-top-3 -right-3 absolute flex justify-center items-center bg-primary rounded-full w-6 h-6 text-primary-foreground pointer-events-none">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center items-center bg-primary/10 rounded-full w-16 h-16 text-primary">
                  {role.id === "PARENT" ? (
                    <Heart size={28} strokeWidth={1.5} />
                  ) : (
                    <GraduationCap size={28} strokeWidth={1.5} />
                  )}
                </div>

                {/* Title */}
                <p className="font-medium text-gray-900 text-base">
                  {role.title}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {role.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`rounded px-10 py-2.5 text-sm font-medium transition-all duration-200 ${
            selected
              ? "cursor-pointer border border-primary bg-primary text-white hover:bg-primary/90"
              : "cursor-not-allowed border border-gray-300 text-gray-400 opacity-40"
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

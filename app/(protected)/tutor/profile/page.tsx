"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"
import {
  useGetLevels,
  useGetSubjects,
} from "@/hooks/queries/useMasterDataQuery"
import { useGetTutorProfileByID } from "@/hooks/queries/useTutorProfileQuery"
import { TutorProfileForm } from "../_components/tutor-profile-form"

export default function Page() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const { data: tutorProfile, isLoading } = useGetTutorProfileByID(user?.id)
  const { data: subjects = [] } = useGetSubjects()
  const { data: levels = [] } = useGetLevels()

  const subjectNameMap = useMemo(
    () => new Map(subjects.map((item) => [item.id, item.name])),
    [subjects]
  )
  const levelNameMap = useMemo(
    () => new Map(levels.map((item) => [item.id, item.name])),
    [levels]
  )

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center px-6 py-12">
        <div className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-muted-foreground shadow-sm">
          <Spinner />
          <span>Đang tải hồ sơ gia sư...</span>
        </div>
      </div>
    )
  }

  if (!tutorProfile) return <TutorProfileForm />

  if (isEditing) {
    return (
      <TutorProfileForm
        mode="update"
        initialProfile={tutorProfile}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Tutor profile
          </p>
          <h1 className="text-3xl font-bold text-primary">Hồ sơ gia sư</h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Quản lý thông tin hồ sơ để phụ huynh và hệ thống ghép lớp chính xác
            hơn.
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Chỉnh sửa hồ sơ</Button>
      </div>

      <section className="rounded-3xl border bg-card p-5 shadow-sm md:p-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="size-28 rounded-full">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="rounded-full text-2xl">
                {user?.fullName?.slice(0, 2)?.toUpperCase() || "TV"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-foreground">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground">{user?.phone}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Học thức</p>
                <p className="font-medium text-foreground">
                  {tutorProfile.education}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Mức phí theo giờ
                </p>
                <p className="font-medium text-foreground">
                  {tutorProfile.hourlyRate.toLocaleString("vi-VN")} đ/giờ
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-muted-foreground">Khu vực</p>
                <p className="font-medium text-foreground">
                  {tutorProfile.location}
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-muted-foreground">Bio</p>
                <p className="whitespace-pre-line text-foreground">
                  {tutorProfile.bio}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Môn học</p>
                <div className="flex flex-wrap gap-2">
                  {(tutorProfile.subjectIds ?? []).map((id) => (
                    <Badge key={id} variant="secondary">
                      {subjectNameMap.get(id) ?? id}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Cấp độ</p>
                <div className="flex flex-wrap gap-2">
                  {(tutorProfile.levelIds ?? []).map((id) => (
                    <Badge key={id} variant="secondary">
                      {levelNameMap.get(id) ?? id}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tài liệu đính kèm</p>
              <div className="space-y-2">
                {(tutorProfile.cvUrls ?? []).length > 0 ? (
                  tutorProfile.cvUrls.map((url, index) => (
                    <a
                      key={`${url}-${index}`}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border px-3 py-2 text-sm text-primary underline-offset-4 hover:underline"
                    >
                      {`File đính kèm ${index + 1}`}
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Chưa có tài liệu đính kèm.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

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
      <div className="flex justify-center items-center mx-auto px-6 py-12 w-full max-w-4xl min-h-[70vh]">
        <div className="flex items-center gap-3 bg-card shadow-sm px-4 py-3 border rounded-2xl text-muted-foreground">
          <Spinner />
          <span>Loading tutor profile...</span>
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
    <div className="mx-auto px-4 md:px-8 py-8 md:py-10 w-full max-w-5xl">
      <div className="flex md:flex-row flex-col md:justify-between md:items-start gap-4 mb-6">
        <div className="space-y-2">
          <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.2em]">
            Tutor profile
          </p>
          <h1 className="font-bold text-primary text-3xl">Tutor Profile</h1>
          <p className="max-w-2xl text-muted-foreground text-sm md:text-base">
            Manage profile information so parents and the system can match classes accurately
            hơn.
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </div>

      <section className="bg-card shadow-sm p-5 md:p-6 border rounded-3xl">
        <div className="gap-6 grid lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="rounded-full size-28">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="rounded-full text-2xl">
                {user?.fullName?.slice(0, 2)?.toUpperCase() || "TV"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-foreground">{user?.fullName}</p>
              <p className="text-muted-foreground text-sm">{user?.phone}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="gap-4 grid md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Học thức</p>
                <p className="font-medium text-foreground">
                  {tutorProfile.education}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">
                  Hourly Rate
                </p>
                <p className="font-medium text-foreground">
                  {tutorProfile.hourlyRate.toLocaleString("en-US")} $/hour
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-muted-foreground text-sm">Khu vực</p>
                <p className="font-medium text-foreground">
                  {tutorProfile.location}
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-muted-foreground text-sm">Bio</p>
                <p className="text-foreground whitespace-pre-line">
                  {tutorProfile.bio}
                </p>
              </div>
            </div>

            <div className="gap-4 grid md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Subject</p>
                <div className="flex flex-wrap gap-2">
                  {(tutorProfile.subjectIds ?? []).map((id) => (
                    <Badge key={id} variant="secondary">
                      {subjectNameMap.get(id) ?? id}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Cấp độ</p>
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
              <p className="text-muted-foreground text-sm">Tài liệu đính kèm</p>
              <div className="space-y-2">
                {(tutorProfile.cvUrls ?? []).length > 0 ? (
                  tutorProfile.cvUrls.map((url, index) => (
                    <a
                      key={`${url}-${index}`}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-3 py-2 border rounded-lg text-primary text-sm hover:underline underline-offset-4"
                    >
                      {`File đính kèm ${index + 1}`}
                    </a>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No documents attached.
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

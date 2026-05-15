"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "@/components/loading"
import { Footer } from "@/components/wrapper/footer"
import { Header } from "./_components/wrapper/header"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { useGetTutorProfileByID } from "@/hooks/queries/useTutorProfileQuery"
import { TutorProfileForm } from "./_components/tutor-profile-form"

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const {
    data: tutorProfile,
    isLoading,
    isError,
  } = useGetTutorProfileByID(user?.id)

  useEffect(() => {
    if (!loading && user && user.role !== "TUTOR") {
      router.replace("/forbidden")
    }
  }, [user, loading])

  if (loading) return <Loading />
  if (!user) return <Loading />
  if (user.role !== "TUTOR") return <Loading />

  if (isLoading) {
    return <Loading text="Đang tải hồ sơ gia sư" />
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
        <Empty className="max-w-xl">
          <EmptyHeader>
            <EmptyTitle>Không thể tải hồ sơ gia sư</EmptyTitle>
            <EmptyDescription>
              Vui lòng tải lại trang hoặc thử lại sau ít phút.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      </div>
    )
  }

  if (!tutorProfile) {
    return <TutorProfileForm />
  }

  return (
    <>
      <Header />
      <main className="flex min-w-full flex-col items-center justify-between bg-background">
        {children}
      </main>
      <Footer />
    </>
  )
}

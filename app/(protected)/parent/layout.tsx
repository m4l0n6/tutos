"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "@/components/loading"
import { Footer } from "@/components/wrapper/footer"
import { Header } from "./_component/header"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && user.role !== "PARENT") {
      router.replace("/forbidden")
    }
  }, [user, loading])

  if (loading) return <Loading />
  if (!user || user.role !== "PARENT") return null

  return <>
        <Header />
        <main className="flex flex-col justify-between items-center bg-accent py-8 min-w-full">
          <div className="z-[-99] absolute inset-0 flex justify-center items-center pointer-events-none mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {children}
        </main>
        <Footer />
      </>
}

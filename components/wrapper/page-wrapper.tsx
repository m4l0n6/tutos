"use client"
import { Header } from "./header"
import { useAuth } from "@/context/AuthContext"
import { Loading } from "../loading"
import { useRouter } from "next/navigation" // ← sửa
import { useEffect } from "react" // ← thêm

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading])

  if (loading) return <Loading />

  return (
    <>
      <Header />
      <main className="flex flex-col justify-between items-center pt-16 min-w-full min-h-screen">
        <div className="z-[-99] absolute inset-0 flex justify-center items-center pointer-events-none mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </main>
    </>
  )
}

"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "@/components/loading"
import { AppShell } from "@/components/app-shell/app-shell"
import { LayoutGridIcon, ShapesIcon, MessagesSquareIcon, HelpCircleIcon, BookOpenIcon } from "lucide-react"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && user.role !== "PARENT") {
      router.replace("/forbidden")
    }
  }, [user, loading])

  if (loading) return <Loading />
  if (!user) return <Loading />
  if (user.role !== "PARENT") return <Loading />

  const navGroups = [
    {
      label: "Main",
      items: [
        {
          title: "Dashboard",
          path: "/parent",
          icon: <LayoutGridIcon />,
        },
        {
          title: "My Classes",
          path: "/parent/my-classes",
          icon: <ShapesIcon />,
        },
        { title: "Chat", path: "/parent/chat", icon: <MessagesSquareIcon /> },
      ],
    },
  ]

  const footerNavLinks = [
    {
      title: "Help Center",
      path: "#/help",
      icon: <HelpCircleIcon />,
    },
    {
      title: "Documentation",
      path: "#/documentation",
      icon: <BookOpenIcon />,
    },
  ]

  return (
    <AppShell
      navGroups={navGroups}
      footerNavLinks={footerNavLinks}
      user={user}
      logout={logout}
    >
      {children}
    </AppShell>
  )
}

"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/wrapper/footer"
import { Header } from "./_component/header"

const ParentPage = () => {
  const { logout } = useAuth()
  return (
    <div>
      Parent Page
    </div>
  )
}

export default ParentPage

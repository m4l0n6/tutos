"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"

const TutorPage = () => {
  const { logout } = useAuth()
  return (
    <div>
      <div>TutorPage</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default TutorPage

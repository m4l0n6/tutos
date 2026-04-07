"use client"
import { useAuth } from "@/context/AuthContext"
import { Button } from "../ui/button"

const DashboardPage = () => {
  const { user, logout } = useAuth()
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Xin chào {user?.fullName}!</p>
      <Button onClick={logout}>Đăng xuất</Button>
    </div>
  )
}

export default DashboardPage

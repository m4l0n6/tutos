"use client"
import { useState, useEffect } from "react"
import { getToken, logout } from "@/lib/auth"
import { User } from "@/types/auth"
import axios from "axios"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)



  const handleGetUser = async () => {
    setLoading(true)
    try {
      const token = getToken()
        if (!token) {
            setUser(null)
            return
        }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data)
      setUser(response.data)
    } catch (error) {
      console.error("Error fetching user:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
    }

  return { user, loading, logout, handleGetUser }
}

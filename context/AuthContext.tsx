"use client"
import { createContext, useContext } from "react"
import { useMe } from "@/hooks/queries/useUserQuery"
import { logout } from "@/lib/auth"
import { MUser } from "@/types/auth"

type AuthContextType = {
  user: MUser | null
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useMe()

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, loading: isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export type UserRole = "PARENT" | "TUTOR" | "ADMIN"

export type MUser = {
  id: string
  email: string
  fullName: string
  phone: string
  isActive: boolean
  role: UserRole
  avatarUrl: string
  createdAt: string
}

export type RegisterParams = {
  email: string
  password: string
  fullName: string
  phone: string
}
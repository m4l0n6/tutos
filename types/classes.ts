import { MUser } from "./auth"

export type MClassRequest = {
  id: string
  parentId: string
  subject: string
  level: string
  description: string
  daysOfWeek: string[]
  startTime: number
  endTime: number
  timeNote: string | null
  location: string
  minBudget: number
  maxBudget: number
  status: "PENDING" | "OPEN" | "CLOSED" | "CANCELLED" | string
  createdAt: string
  updatedAt: string
  parent: MUser
}

export type MClass = {
  id: string
  requestId: string
  name: string
  subject: string
  level: string
  daysOfWeek: string[]
  startTime: string
  endTime: string
  timeNote: string | null
  location: string
  adminNote: string | null
  acceptanceFee: number
  status: "RECRUITING" | "TRIAL" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  selectedTutorId: string | null
  createdAt: string
  updatedAt: string
  request: MClassRequest
  isTrialConfirmedByParent: boolean
  isTrialConfirmedByTutor: boolean
}

import { MUser } from "./auth"

export type DayOfWeekType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export type ClassStatusRequest = "PENDING" | "OPEN" | "CLOSED" | "CANCELLED"

export type ClassStatus =
  | "RECRUITING"
  | "TRIAL"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"

export type MClassRequest = {
  id: string
  parentId: string
  subject: string
  level: string
  description: string
  daysOfWeek: DayOfWeekType[]
  startTime: string
  endTime: string
  timeNote: string | null
  location: string
  minBudget: number
  maxBudget: number
  status: ClassStatusRequest
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
  daysOfWeek: DayOfWeekType[]
  startTime: string
  endTime: string
  timeNote: string | null
  location: string
  adminNote: string | null
  acceptanceFee: number
  status: ClassStatus
  selectedTutorId: string
  createdAt: string
  updatedAt: string
  request: MClassRequest
  isTrialConfirmedByParent: boolean
  isTrialConfirmedByTutor: boolean
}

export type TClassResquestParam = {
  subject: string
  level: string
  description: string
  daysOfWeek: DayOfWeekType[]
  startTime: string
  endTime: string
  timeNote: string
  location: string
  minBudget: number
  maxBudget: number
}

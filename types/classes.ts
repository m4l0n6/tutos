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
  subject: MSubject
  level: MLevel
  category: MCategory
  daysOfWeek: DayOfWeekType[]
  startTime: string
  endTime: string
  timeNote: string | null
  location: string
  adminNote: string | null
  acceptanceFee: number
  status: ClassStatus
  selectedTutorId: string | null
  parentName: string
  isTrialConfirmedByParent: boolean
  isTrialConfirmedByTutor: boolean
  createdAt: string
  updatedAt: string
}

export type MCategory = {
  id: string
  name: string
}

export type MSubject = {
  id: string
  name: string
}

export type MLevel = {
  id: string
  name: string
}

export type TClassResquestParam = {
  subject: MSubject
  level: MLevel
  description: string
  daysOfWeek: DayOfWeekType[]
  startTime: string
  endTime: string
  timeNote: string
  location: string
  minBudget: number
  maxBudget: number
}

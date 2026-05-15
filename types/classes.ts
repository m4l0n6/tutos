import { MUser } from "./auth"
import { TSubjectClassRequest, TSubjectClass } from "./subject"
import { TLevelClassRequest, TLevelClass } from "./level"
import { TCategoryClass } from "./category"

export type ClassStatus =
  | "RECRUITING"
  | "TRIAL"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"

export type ClassRequestStatus = "PENDING" | "OPEN" | "CLOSED" | "CANCELLED"

export type ApplicationStatus =
  | "PENDING"
  | "TRIAL"
  | "ACCEPTED"
  | "REJECTED"
  | "TRIAL_FAILED"

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export type MClassRequest = {
  id: string
  parentId: string
  subject: TSubjectClassRequest
  level: TLevelClassRequest
  description: string | null
  daysOfWeek: DayOfWeek[]
  startTime: string
  endTime: string
  timeNote: string | null
  location: string
  status: ClassRequestStatus
  minBudget: number
  maxBudget: number
  createdAt: string
  updatedAt: string
  parent: MUser

  subjectId: string
  levelId: string
}

export type MClass = {
  id: string
  requestId: string
  name: string
  category: TCategoryClass
  subject: TSubjectClass
  level: TLevelClass
  parentName: string
  daysOfWeek: DayOfWeek[]
  startTime: string
  endTime: string
  timeNote: string | null
  location: string
  adminNote: string | null
  acceptanceFee: number
  status: ClassStatus
  selectedTutorId: string | null
  createdAt: string
  updatedAt: string
  request: MClassRequest
  applications: MClassApplication[]
  isTrialConfirmedByParent: boolean
  isTrialConfirmedByTutor: boolean
}

export type MClassApplication = {
  id: string
  classId: string
  tutorProfileId: string
  coverLetter: string
  proposedRate: number
  status: ApplicationStatus
  isDepositPaid: boolean
  isContactViewed: boolean
}

export type TClassResquestParam = {
  subjectId: string
  levelId: string
  description: string
  daysOfWeek: DayOfWeek[]
  startTime: string
  endTime: string
  timeNote: string
  location: string
  minBudget: number
  maxBudget: number
}

export type ClassApplication = {
  id: string
  classId: string
  tutorProfileId?: string
  coverLetter?: string
  proposedRate?: number
  status: string
  appliedAt?: string
  updatedAt?: string
  class: MClass
}

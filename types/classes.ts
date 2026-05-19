import { MUser } from "./auth"
import { TSubjectClassRequest, TSubjectClass } from "./subject"
import { TLevelClassRequest, TLevelClass } from "./level"
import { TCategoryClass } from "./category"
import { ITutorProfile } from "./tutor"

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
  subject: TSubjectClassRequest
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
  payment: MPayment[]
  totalTutorApplication: number
}

export type MPayment = {
  id: string
  classId: string
  amount: number
  paidAt: string | null
  proofUrl: string | null
  reason: string | null
  relatedPaymentId: MPayment | null
  status: string
  transactionRef: string | null
  type: string
  updatedAt?: string
  userId: string
}

export type MClassApplication = {
  id: string
  classId: string
  tutorProfileId: string
  coverLetter: string
  proposedRate: number
  status: ApplicationStatus
  appliedAt?: string
  updatedAt?: string
  isDepositPaid: boolean
  isContactViewed: boolean
  tutorProfile: ITutorProfile

  class: MClass
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

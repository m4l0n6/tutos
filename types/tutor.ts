export type TutorProfile = {
  id: string
  userId: string
  bio: string
  education: string
  cvUrls: string[]
  subjectIds: string[]
  levelIds: string[]
  hourlyRate: number
  location: string
  createdAt: string
  updatedAt: string
}

export type CreateTutorProfileParams = {
  bio: string
  education: string
  cvUrls?: string[]
  files?: File[]
  subjectIds: string[]
  levelIds: string[]
  hourlyRate: number
  location: string
}

export type UpdateTutorProfileParams = Partial<CreateTutorProfileParams>

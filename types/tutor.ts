export type TutorProfile = {
  id: string
  userId: string
  bio: string
  education: string
  cvUrls: string[]
  subjects: string[]
  levels: string[]
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
  subjects: string[]
  levels: string[]
  hourlyRate: number
  location: string
}

export type UpdateTutorProfileParams = Partial<CreateTutorProfileParams>

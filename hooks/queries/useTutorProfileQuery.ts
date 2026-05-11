import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { api } from "@/lib/axios"
import type {
  TutorProfile,
  CreateTutorProfileParams,
  UpdateTutorProfileParams,
} from "@/types/tutor"

export const tutorProfileKeys = {
  all: ["tutorProfile"] as const,
  profile: (userId: string) => [...tutorProfileKeys.all, userId] as const,
}

export function useGetTutorProfileByID(userId: string | undefined) {
  return useQuery({
    queryKey: tutorProfileKeys.profile(userId || ""),
    queryFn: async () => {
      if (!userId) return null

      try {
        const res = await api.get(`/tutor-profiles/${userId}`)
        return res.data.data as TutorProfile
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          return null
        }

        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
  })
}

export function useCreateTutorProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateTutorProfileParams) => {
      const formData = new FormData()

      formData.append("bio", payload.bio)
      formData.append("education", payload.education)
      formData.append("hourlyRate", String(payload.hourlyRate))
      formData.append("location", payload.location)

      payload.subjectIds.forEach((id) => formData.append("subjectIds", id))
      payload.levelIds.forEach((id) => formData.append("levelIds", id))

      if (payload.cvUrls) {
        payload.cvUrls.forEach((url) => formData.append("cvUrls", url))
      }

      if (payload.files) {
        payload.files.forEach((file) =>
          formData.append("files", file, file.name)
        )
      }

      const res = await api.post("/tutor-profiles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return res.data.data as TutorProfile
    },
    onSuccess: (data) => {
      queryClient.setQueryData(tutorProfileKeys.profile(data.userId), data)
      console.log("Profile created successfully:", data)
    },
    onError: (error) => {
      console.error("Profile creation failed:", error)
    },
  })
}

export function useUpdateTutorProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateTutorProfileParams) => {
      const formData = new FormData()

      if (payload.bio !== undefined)
        formData.append("bio", payload.bio as string)
      if (payload.education !== undefined)
        formData.append("education", payload.education as string)
      if (payload.hourlyRate !== undefined)
        formData.append("hourlyRate", String(payload.hourlyRate))
      if (payload.location !== undefined)
        formData.append("location", payload.location as string)

      if (payload.subjectIds)
        payload.subjectIds.forEach((id) => formData.append("subjectIds", id))
      if (payload.levelIds)
        payload.levelIds.forEach((id) => formData.append("levelIds", id))

      if (payload.cvUrls)
        payload.cvUrls.forEach((url) => formData.append("cvUrls", url))

      if (payload.files)
        payload.files.forEach((file) =>
          formData.append("files", file, file.name)
        )

      const res = await api.patch("/tutor-profiles/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return res.data.data as TutorProfile
    },
    onSuccess: (data) => {
      queryClient.setQueryData(tutorProfileKeys.profile(data.userId), data)
      console.log("Profile updated successfully:", data)
    },
    onError: (error) => {
      console.error("Profile update failed:", error)
    },
  })
}

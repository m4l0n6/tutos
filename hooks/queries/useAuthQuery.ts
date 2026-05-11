import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { RegisterParams } from "@/types/auth"
import { userKeys } from "@/hooks/queries/useUserQuery"

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterParams) =>
      api.post<string>("/auth/register", payload).then((res) => res.data),
    onSuccess: (data) => {
      console.log("Register successful:", data)
    },
    onError: (error) => {
      console.error("Register failed:", error)
    },
  })
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: (payload: { email: string; otp: string }) =>
      api.post("/auth/verify-otp", payload).then((res) => res.data),
    onSuccess: (data) => {
      console.log("OTP verified successfully:", data)
    },
    onError: (error) => {
      console.error("OTP verification failed:", error)
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      api.post("/auth/login", payload).then((res) => res.data),
    onSuccess: (data) => {
      if (data.data?.accessToken) {
        localStorage.setItem("access_token", data.data.accessToken)
      }
      if (data.data?.user) {
        queryClient.setQueryData(userKeys.me(), data.data.user)
      }
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })
}


export function useRole() {
  return useMutation({
    mutationFn: (payload: { role: "TUTOR" | "PARENT" }) =>
      api.post("/auth/onboarding", payload).then((res) => res.data),
    onSuccess: (data) => {
      console.log("Role set successfully:", data)
    },
    onError: (error) => {
      console.error("Failed to set role:", error)
    }
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { RegisterParams } from "@/types/auth"
import { userKeys } from "@/hooks/queries/useUserQuery"

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterParams) =>
      api.post<string>("/auth/register", payload).then((res) => res.data),
    onSuccess: (data) => {
      console.log("Đăng ký thành công:", data)
    },
    onError: (error) => {
      console.error("Đăng ký thất bại:", error)
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

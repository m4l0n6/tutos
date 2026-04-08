// lib/axios.ts
import axios from "axios"
import { getToken, logout } from "@/lib/auth"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Tự động gắn token vào mọi request
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      logout()
    }
    return Promise.reject(error)
  }
)

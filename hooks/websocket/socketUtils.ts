"use client"

import { getToken } from "@/lib/auth"
import { Socket } from "socket.io-client"
export const emitWithAck = (
  socket: Socket | null,
  eventName: string,
  data?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!socket?.connected) {
      reject(new Error(`Socket not connected — cannot emit "${eventName}"`))
      return
    }
    socket.emit(eventName, data, (response: any) => {
      if (response?.error) reject(new Error(response.error))
      else resolve(response)
    })
  })
}

export const getSocketStatus = (socket: Socket | null) => ({
  connected: socket?.connected ?? false,
  id: socket?.id ?? null,
  status: !socket
    ? "not-initialized"
    : socket.connected
      ? "connected"
      : "disconnected",
})

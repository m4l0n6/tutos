// Context & Provider — gắn vào root layout
export { SocketProvider, useSocketContext } from "./SocketContext"

// Thin hooks cho từng trang
export { useChatSocket } from "./useChatSocket"
export { useNotificationSocket } from "./useNotificationSocket"

// Types
export type {
  MessageEntity,
  NotificationEntity,
  UnreadCountUpdate,
} from "./types"

// Utils (tuỳ chọn)
export { emitWithAck, getSocketStatus } from "./socketUtils"

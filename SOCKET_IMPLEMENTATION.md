# Socket.io Integration Implementation Guide

## ✅ Hoàn tất các file

Tôi đã tạo một bộ Socket.io hooks hoàn chỉnh cho Next.js application của bạn:

### 📦 Các file đã tạo:

1. **`hooks/websocket/useSocket.ts`** - Generic socket hook chính
2. **`hooks/websocket/useChatSocket.ts`** - Specialized hook cho Chat namespace
3. **`hooks/websocket/useNotificationSocket.ts`** - Specialized hook cho Notifications namespace
4. **`hooks/websocket/socketUtils.ts`** - Utility functions hỗ trợ
5. **`hooks/websocket/index.ts`** - Export tất cả hooks
6. **`context/SocketProvider.tsx`** - Ready-to-use Context Provider
7. **`components/SocketHeaderExample.tsx`** - Example component với badges
8. **`hooks/websocket/README.md`** - Tài liệu chi tiết
9. **`hooks/websocket/USAGE_EXAMPLES.ts`** - Nhiều ví dụ thực tế

---

## 🚀 Implementation Steps

### Step 1: Cấu hình Environment

Thêm vào `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://ketnoigiasu.bvdk333.work
```

### Step 2: Wrap App với SocketProvider

Sửa `app/layout.tsx` hoặc `app/providers.tsx`:

```tsx
'use client'

import { SocketProvider } from '@/context/SocketProvider'
import { ReactNode } from 'react'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  )
}
```

### Step 3: Sử dụng trong Components

#### Option A: Dùng Context (Recommended)

```tsx
'use client'

import { useSocketContext } from '@/context/SocketProvider'

export function ChatBadge() {
  const { chat } = useSocketContext()

  return (
    <div>
      💬 {chat.unreadCount > 0 && <span>{chat.unreadCount}</span>}
    </div>
  )
}
```

#### Option B: Dùng Hook trực tiếp

```tsx
'use client'

import { useChatSocket } from '@/hooks/websocket'

export function MyComponent() {
  const { isConnected, unreadCount, sendMessage } = useChatSocket()

  return <div>{unreadCount} unread</div>
}
```

### Step 4: Hiển thị Chat & Notifications

```tsx
'use client'

import { useSocketContext } from '@/context/SocketProvider'
import { toast } from 'sonner'
import { useEffect } from 'react'

export function AppNotifications() {
  const { chat, notifications } = useSocketContext()

  // Listen for new messages with toast
  useEffect(() => {
    const unsubscribe = chat.socket?.on('newMessage', (message) => {
      if (!document.hidden) {
        toast.message(
          `${message.senderName}: ${message.content}`,
          { icon: '💬' }
        )
      }
    })

    return () => {
      unsubscribe?.()
    }
  }, [chat.socket])

  // Listen for new notifications with toast
  useEffect(() => {
    const unsubscribe = notifications.socket?.on('newNotification', (notif) => {
      toast.success(notif.content, { icon: '🔔' })
    })

    return () => {
      unsubscribe?.()
    }
  }, [notifications.socket])

  return null
}
```

---

## 📝 Key Features

✅ **Type-safe**: Full TypeScript support với interfaces
✅ **Auto-reconnection**: Tự động reconnect khi mất kết nối
✅ **Token authentication**: JWT token tự động gửi khi connect
✅ **Event handling**: Dễ dàng lắng nghe và xử lý sự kiện
✅ **Memory efficient**: Tự động cleanup khi component unmount
✅ **Context integration**: Dùng Context để access sockets từ bất kì component
✅ **Utility functions**: Hỗ trợ emit with ack, re-authentication, etc.

---

## 🎯 Usage Examples

### Chat Component

```tsx
'use client'

import { useChatSocket } from '@/hooks/websocket'
import { useState } from 'react'

export function ChatWindow({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const { sendMessage, markAsRead, isConnected } = useChatSocket({
    onNewMessage: (message) => {
      if (message.conversationId === conversationId) {
        setMessages(prev => [...prev, message])
      }
    },
  })

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(conversationId, input)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(msg => (
          <div key={msg._id} className="bg-gray-100 p-2 rounded">
            <strong>{msg.senderName}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type message..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleSend}
          disabled={!isConnected}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
```

### Header Component with Badges

```tsx
import { SocketHeaderExample } from '@/components/SocketHeaderExample'

export function AppHeader() {
  return <SocketHeaderExample />
}
```

---

## 🔧 Configuration

### Auto-reconnection settings

```tsx
const { socket, isConnected } = useSocket('chat', {
  reconnection: true,
  reconnectionDelay: 1000,        // Start with 1s delay
  reconnectionDelayMax: 5000,     // Max 5s delay
  reconnectionAttempts: 5,        // Try 5 times
  transports: ['websocket', 'polling']
})
```

---

## 🐛 Debugging

### Enable console logs

Tất cả hooks đã có `console.log` trong file:

- `[Socket]` - Base socket events
- `[Chat]` - Chat-specific events
- `[Notifications]` - Notification events
- `[SocketUtils]` - Utility functions

### Check connection status

```tsx
const { isConnected } = useChatSocket()
console.log('Chat connected:', isConnected)

// Or with socket ref
const { socket } = useChatSocket()
console.log('Socket ID:', socket?.id)
console.log('Socket status:', socket?.connected)
```

---

## 📋 Checklist to Go Live

- [ ] Add `NEXT_PUBLIC_API_URL` to `.env.local`
- [ ] Install `socket.io-client` (nếu chưa): `npm install socket.io-client`
- [ ] Wrap app với `<SocketProvider>`
- [ ] Test chat message sending: `sendMessage()`
- [ ] Test unread count update: Subscribe to `onUnreadCountUpdate`
- [ ] Test notification toast: Subscribe to `onNewNotification`
- [ ] Test connection status in Network tab (DevTools)
- [ ] Test re-authentication after token refresh
- [ ] Test in production environment
- [ ] Monitor backend logs for connection issues

---

## 🤝 Integration with Your Components

### Thêm vào Header

```tsx
// app/components/Header.tsx
import { SocketHeaderExample } from '@/components/SocketHeaderExample'

export function Header() {
  return <SocketHeaderExample />
}
```

### Thêm vào Messages Page

```tsx
// app/(protected)/tutor/messages/page.tsx
'use client'

import { ChatWindow } from '@/components/ChatWindow'
import { useSocketContext } from '@/context/SocketProvider'

export default function MessagesPage() {
  const { chat } = useSocketContext()

  return (
    <div>
      <h1>Messages ({chat.unreadCount} unread)</h1>
      <ChatWindow conversationId="conv-123" />
    </div>
  )
}
```

---

## 🔒 Security

- ✅ Token lấy từ `localStorage` hoặc cookies
- ✅ Token gửi kèm `Bearer` prefix trong auth header
- ✅ Auto-disconnect khi không có token
- ✅ Re-authenticate khi token refresh

---

## 📚 File Reference

| File                       | Purpose                                |
| -------------------------- | -------------------------------------- |
| `useSocket.ts`             | Generic hook cho bất kì namespace      |
| `useChatSocket.ts`         | Hook chuyên dụng cho chat              |
| `useNotificationSocket.ts` | Hook chuyên dụng cho notifications     |
| `socketUtils.ts`           | Helper functions (emit with ack, etc.) |
| `SocketProvider.tsx`       | Context provider (recommended setup)   |
| `SocketHeaderExample.tsx`  | Example UI component                   |
| `README.md`                | Tài liệu API chi tiết                  |
| `USAGE_EXAMPLES.ts`        | Nhiều ví dụ sử dụng                    |

---

## ✨ Next Steps

1. **Test locally**:

   ```bash
   npm install socket.io-client
   ```

2. **Verify backend URL**: Kiểm tra URL chính xác trong `.env.local`

3. **Check token**: Mở DevTools Console, chạy:

   ```js
   localStorage.getItem("access_token")
   ```

4. **Monitor connection**: Mở Network tab trong DevTools, chọn WS filter

5. **Test features**:
   - Send message via chat hook
   - Check unread count updates
   - Verify notifications appear

---

Mọi thứ đã sẵn sàng để bạn sử dụng! 🎉

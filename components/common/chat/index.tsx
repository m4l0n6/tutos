
"use client"
import { useState } from "react"
import { ChatHeader } from "./chat-header"
import { ChatSidebar } from "./chat-sidebar"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"

interface Message {
  from: "me" | "them"
  text: string
  time: string
}

interface Conversation {
  id: number
  name: string
  initials: string
  avClass: string
  time: string
  preview: string
  badge: number
  online: boolean
  messages: Message[]
}


function nowTime(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}


const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Jacquenetta Slowgrave",
    initials: "JS",
    avClass: "purple",
    time: "10 phút",
    preview: "Tuyệt! Hẹn gặp sau nhé!",
    badge: 8,
    online: true,
    messages: [
      {
        from: "them",
        text: "Good morning! How are you today?",
        time: "09:10",
      },
      {
        from: "me",
        text: "Mình ổn, cảm ơn bạn! Còn bạn thì sao?",
        time: "09:11",
      },
      {
        from: "them",
        text: "Mình cũng tốt! Chiều nay mình có thể gặp bạn không?",
        time: "09:30",
      },
      { from: "me", text: "Sure! What time works for you?", time: "09:32" },
      { from: "them", text: "Around 3 PM is fine?", time: "09:45" },
      { from: "me", text: "Oke! Gặp nhau ở đâu?", time: "09:46" },
      { from: "them", text: "Tuyệt! Hẹn gặp sau nhé!", time: "10:00" },
    ],
  },
  {
    id: 2,
    name: "Nickola Peever",
    initials: "NP",
    avClass: "teal",
    time: "40 phút",
    preview: "Nghe hay đấy! Hẹn gặp nhé.",
    badge: 2,
    online: false,
    messages: [
      { from: "me", text: "Tối nay đi ăn nhà hàng mới không?", time: "11:00" },
      { from: "them", text: "Nghe hay đấy! Hẹn gặp nhé.", time: "11:20" },
    ],
  },
  {
    id: 3,
    name: "Farand Hume",
    initials: "FH",
    avClass: "coral",
    time: "Yesterday",
    preview: "Around 7 PM at the new Italian restaurant?",
    badge: 0,
    online: true,
    messages: [
      {
        from: "them",
        text: "Around 7 PM at the new Italian restaurant?",
        time: "18:00",
      },
      { from: "me", text: "Sure, I'll be there on time!", time: "18:05" },
    ],
  },
  {
    id: 4,
    name: "Ossie Peasey",
    initials: "OP",
    avClass: "blue",
    time: "13 days ago",
    preview: "Hi Bonnie, I'm here!",
    badge: 0,
    online: false,
    messages: [
      { from: "them", text: "Hi Bonnie, I'm here!", time: "08:00" },
      { from: "me", text: "I'll be there soon!", time: "08:10" },
    ],
  },
  {
    id: 5,
    name: "Hall Negri",
    initials: "HN",
    avClass: "pink",
    time: "2 days ago",
    preview: "No worries! I reserved a table for you.",
    badge: 0,
    online: false,
    messages: [
      { from: "me", text: "I might be 10 minutes late.", time: "19:45" },
      { from: "them", text: "No worries! I reserved a table for you.", time: "19:50" },
    ],
  },
  {
    id: 6,
    name: "Elyssa Segot",
    initials: "ES",
    avClass: "amber",
    time: "Yesterday",
    preview: "She just told me today.",
    badge: 0,
    online: true,
    messages: [
      { from: "them", text: "She just told me today.", time: "14:00" },
      { from: "me", text: "Thật à? Chuyện gì vậy?", time: "14:05" },
    ],
  },
  {
    id: 7,
    name: "Gil Wilfing",
    initials: "GW",
    avClass: "green",
    time: "1 day ago",
    preview: "Gặp bạn trong 5 phút nữa!",
    badge: 0,
    online: false,
    messages: [
      { from: "them", text: "Gặp bạn trong 5 phút nữa!", time: "15:55" },
    ],
  },
]

const AUTO_REPLIES = [
  "Được rồi, mình hiểu!",
  "Cảm ơn bạn đã nhắn!",
  "OK! Mình sẽ xem lại nhé.",
  "Hay đấy! Mình đồng ý.",
  "Oke bạn ơi!",
]


export const ChatComponent = () => {
    const [conversations, setConversations] = useState<Conversation[]>(
      INITIAL_CONVERSATIONS
    )
    const [activeId, setActiveId] = useState<number>(1)
    const [search, setSearch] = useState("")
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const activeConv = conversations.find((c) => c.id === activeId)!

    function sendMessage() {
      const text = input.trim()
      if (!text) return
      const time = nowTime()
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                preview: text,
                messages: [...c.messages, { from: "me", text, time }],
              }
            : c
        )
      )
      setInput("")
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          const reply =
            AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
          const t2 = nowTime()
          setIsTyping(false)
          setConversations((prev) =>
            prev.map((c) =>
              c.id === activeId
                ? {
                    ...c,
                    preview: reply,
                    messages: [
                      ...c.messages,
                      { from: "them", text: reply, time: t2 },
                    ],
                  }
                : c
            )
          )
        }, 1500)
      }, 500)
    }

  return (
    <>
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        search={search}
        onSearchChange={setSearch}
        onSelectConv={setActiveId}
      />

      {/* ── Main chat ── */}
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader activeConv={activeConv} />
        <ChatMessages activeConv={activeConv} isTyping={isTyping} />
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSendMessage={sendMessage}
        />
      </div>
    </>
  )
}


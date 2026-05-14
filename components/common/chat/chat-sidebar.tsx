import { Search, MessageSquarePlus } from "lucide-react"
import { ConvItem } from "./conv-item"

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

interface Message {
  from: "me" | "them"
  text: string
  time: string
}

interface ChatSidebarProps {
  conversations: Conversation[]
  activeId: number
  search: string
  onSearchChange: (value: string) => void
  onSelectConv: (id: number) => void
}

export function ChatSidebar({
  conversations,
  activeId,
  search,
  onSearchChange,
  onSelectConv,
}: ChatSidebarProps) {
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col bg-white border-[#e0e0e0] border-r w-72 min-w-72">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-[#e0e0e0] border-b">
        <span className="font-medium text-[#111] text-[15px]">Chats</span>
        <div className="flex gap-1">
          <button
            className="flex justify-center items-center hover:bg-gray-100 rounded-lg w-7.5 h-7.5 text-4xl transition"
            title="Tìm kiếm"
          >
            <Search size={16} />
          </button>
          <button
            className="flex justify-center items-center hover:bg-gray-100 rounded-lg w-7.5 h-7.5 text-4xl transition"
            title="Soạn tin mới"
          >
            <MessageSquarePlus size={16} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-[#e0e0e0] border-b">
        <div className="relative">
          <svg
            className="top-1/2 left-2.5 absolute -translate-y-1/2 pointer-events-none"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#aaa"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm hội thoại..."
            className="bg-[#f5f5f5] focus:bg-white pr-2.5 pl-7.5 border border-[#e0e0e0] rounded-lg outline-none w-full h-8 text-[#111] text-sm transition"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((c) => (
          <ConvItem
            key={c.id}
            conv={c}
            active={c.id === activeId}
            onClick={() => onSelectConv(c.id)}
          />
        ))}
      </div>
    </div>
  )
}

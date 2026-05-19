import { Video, Phone, Info } from "lucide-react"
import { Avatar } from "./avatar"

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

interface ChatHeaderProps {
  activeConv: Conversation
}

export function ChatHeader({ activeConv }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 border-[#e0e0e0] border-b">
      <Avatar
        initials={activeConv.initials}
        avClass={activeConv.avClass}
        size={36}
        fontSize={11}
      />
      <div className="flex-1">
        <div className="font-medium text-[#111] text-sm">{activeConv.name}</div>
        <div className="flex items-center gap-1 text-[#1D9E75] text-xs">
          {activeConv.online && (
            <span className="inline-block bg-[#1D9E75] rounded-full w-1.5 h-1.5" />
          )}
          {activeConv.online ? "Online" : "Offline"}
        </div>
      </div>
      <div className="flex gap-1">
        {/* <button
          className="flex justify-center items-center hover:bg-gray-100 rounded-lg w-7.5 h-7.5 text-4xl transition"
          title="Video call"
        >
          <Video size={16} />
        </button>
        <button
          className="flex justify-center items-center hover:bg-gray-100 rounded-lg w-7.5 h-7.5 text-4xl transition"
          title="Cuộc gọi"
        >
          <Phone size={16} />
        </button>
        <button
          className="flex justify-center items-center hover:bg-gray-100 rounded-lg w-7.5 h-7.5 text-4xl transition"
          title="Information"
        >
          <Info size={16} />
        </button> */}
      </div>
    </div>
  )
}

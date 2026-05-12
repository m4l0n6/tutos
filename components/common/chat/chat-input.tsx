import { Paperclip, Smile, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  input: string
  onInputChange: (value: string) => void
  onSendMessage: () => void
}

export function ChatInput({
  input,
  onInputChange,
  onSendMessage,
}: ChatInputProps) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-3 border-[#e0e0e0] border-t">
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
        placeholder="Nhập tin nhắn..."
        className="flex-1 bg-[#f5f5f5] focus:bg-white px-3.5 py-2 border border-[#e0e0e0] rounded-full outline-none text-[#111] text-sm transition"
      />
      <Button
        onClick={onSendMessage}
        title="Gửi"
        className="flex justify-center items-center bg-[#7F77DD] hover:bg-[#534AB7] rounded-full w-8.5 h-8.5 text-white text-base transition-colors"
      >
        <Send size={15} />
      </Button>
    </div>
  )
}

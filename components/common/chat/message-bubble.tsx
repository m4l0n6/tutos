import { Avatar } from "./avatar";

interface Message {
  from: "me" | "them";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  initials: string;
  avClass: string;
  time: string;
  preview: string;
  badge: number;
  online: boolean;
  messages: Message[];
}

interface MessageBubbleProps {
  msg: Message;
  conv: Conversation;
}

export function MessageBubble({ msg, conv }: MessageBubbleProps) {
  const isSent = msg.from === "me";
  return (
    <div className={`flex gap-2 items-end ${isSent ? "flex-row-reverse" : "flex-row"}`}>
      {!isSent && <Avatar initials={conv.initials} avClass={conv.avClass} size={28} fontSize={10} />}
      <div
        className={`max-w-[65%] px-3.5 py-2.25 text-sm leading-6 ${
          isSent
            ? "bg-[#534AB7] text-white border border-[#534AB7] rounded-[14px_14px_4px_14px]"
            : "bg-[#f0f0f0] text-[#111] border border-[#e0e0e0] rounded-[14px_14px_14px_4px]"
        }`}
      >
        {msg.text}
      </div>
      <span className="px-1 text-[#999] text-xs">
        {msg.time}
      </span>
    </div>
  );
}

import React from "react";
import { Avatar } from "./avatar";

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

interface Message {
  from: "me" | "them"
  text: string
  time: string
}

interface ConvItemProps {
  conv: Conversation;
  active: boolean;
  onClick: () => void;
}

export function ConvItem({ conv, active, onClick }: ConvItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-all ${
        active
          ? "border-l-2 border-l-[#7F77DD] bg-[#f5f5f5]"
          : `border-l-2 border-l-transparent ${isHovered ? "bg-[#f5f5f5]" : "bg-transparent"}`
      }`}
    >
      <Avatar initials={conv.initials} avClass={conv.avClass} />
      <div className="flex-1 min-w-0">
        <div className="overflow-hidden font-medium text-[#111] text-sm text-ellipsis whitespace-nowrap">
          {conv.name}
        </div>
        <div className="mt-0.5 overflow-hidden text-[#666] text-xs text-ellipsis whitespace-nowrap">
          {conv.preview}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[#999] text-xs whitespace-nowrap">
          {conv.time}
        </span>
        {conv.badge > 0 && (
          <span className="flex justify-center items-center bg-[#7F77DD] px-1.25 rounded-full min-w-[18px] h-[18px] font-medium text-white text-xs">
            {conv.badge}
          </span>
        )}
      </div>
    </div>
  );
}

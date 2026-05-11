import React from "react";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";

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

interface ChatMessagesProps {
  activeConv: Conversation;
  isTyping: boolean;
}

export function ChatMessages({ activeConv, isTyping }: ChatMessagesProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, isTyping]);

  return (
    <div className="flex flex-col flex-1 gap-3.5 px-4 py-4 overflow-y-auto">
      <div className="relative my-1 text-[#aaa] text-xs text-center">
        <span className="z-10 relative bg-white px-2.5">
          Hôm nay
        </span>
        <div className="top-1/2 right-0 left-0 z-0 absolute bg-[#e0e0e0] h-px" />
      </div>
      {activeConv.messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} conv={activeConv} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}

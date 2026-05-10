import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, isTyping]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "var(--color-text-tertiary, #aaa)",
          position: "relative",
          margin: "4px 0",
        }}
      >
        <span
          style={{
            background: "var(--color-background-primary, #fff)",
            padding: "0 10px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Hôm nay
        </span>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "0.5px",
            background: "var(--color-border-tertiary, #e0e0e0)",
            zIndex: 0,
          }}
        />
      </div>
      {activeConv.messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} conv={activeConv} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}

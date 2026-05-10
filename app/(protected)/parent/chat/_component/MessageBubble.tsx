import { Avatar } from "./Avatar";

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
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexDirection: isSent ? "row-reverse" : "row" }}>
      {!isSent && <Avatar initials={conv.initials} avClass={conv.avClass} size={28} fontSize={10} />}
      <div
        style={{
          maxWidth: "65%",
          padding: "9px 13px",
          borderRadius: isSent ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          fontSize: 13,
          lineHeight: 1.5,
          background: isSent ? "#534AB7" : "var(--color-background-secondary, #f0f0f0)",
          color: isSent ? "#fff" : "var(--color-text-primary, #111)",
          border: isSent ? "0.5px solid #534AB7" : "0.5px solid var(--color-border-tertiary, #e0e0e0)",
        }}
      >
        {msg.text}
      </div>
      <span style={{ fontSize: 10, color: "var(--color-text-tertiary, #999)", padding: "0 4px" }}>
        {msg.time}
      </span>
    </div>
  );
}

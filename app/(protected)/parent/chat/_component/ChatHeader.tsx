import { Video, Phone, Info } from "lucide-react";
import { Avatar } from "./Avatar";

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
  from: "me" | "them";
  text: string;
  time: string;
}

interface ChatHeaderProps {
  activeConv: Conversation;
  iconBtn: React.CSSProperties;
}

export function ChatHeader({ activeConv, iconBtn }: ChatHeaderProps) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "0.5px solid var(--color-border-tertiary, #e0e0e0)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Avatar initials={activeConv.initials} avClass={activeConv.avClass} size={36} fontSize={11} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
          {activeConv.name}
        </div>
        <div style={{ fontSize: 12, color: "#1D9E75", display: "flex", alignItems: "center", gap: 4 }}>
          {activeConv.online && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1D9E75",
                display: "inline-block",
              }}
            />
          )}
          {activeConv.online ? "Online" : "Offline"}
        </div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <button style={iconBtn} title="Video call">
          <Video size={16} />
        </button>
        <button style={iconBtn} title="Cuộc gọi">
          <Phone size={16} />
        </button>
        <button style={iconBtn} title="Thông tin">
          <Info size={16} />
        </button>
      </div>
    </div>
  );
}

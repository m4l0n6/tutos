import { Search, MessageSquarePlus } from "lucide-react";
import { ConvItem } from "./ConvItem";

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

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectConv: (id: number) => void;
  iconBtn: React.CSSProperties;
}

export function ChatSidebar({
  conversations,
  activeId,
  search,
  onSearchChange,
  onSelectConv,
  iconBtn,
}: ChatSidebarProps) {
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: 280,
        minWidth: 280,
        borderRight: "0.5px solid var(--color-border-tertiary, #e0e0e0)",
        display: "flex",
        flexDirection: "column",
        background: "var(--color-background-primary, #fff)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 16,
          borderBottom: "0.5px solid var(--color-border-tertiary, #e0e0e0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
          Chats
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={iconBtn} title="Tìm kiếm">
            <Search size={16} />
          </button>
          <button style={iconBtn} title="Soạn tin mới">
            <MessageSquarePlus size={16} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "10px 12px", borderBottom: "0.5px solid var(--color-border-tertiary, #e0e0e0)" }}>
        <div style={{ position: "relative" }}>
          <svg
            style={{
              position: "absolute",
              left: 9,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-tertiary, #aaa)"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm hội thoại..."
            style={{
              width: "100%",
              height: 32,
              border: "0.5px solid var(--color-border-tertiary, #e0e0e0)",
              borderRadius: 8,
              padding: "0 10px 0 30px",
              fontSize: 13,
              background: "var(--color-background-secondary, #f5f5f5)",
              color: "var(--color-text-primary, #111)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
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
  );
}

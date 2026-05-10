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
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        cursor: "pointer",
        borderLeft: `2px solid ${active ? "#7F77DD" : "transparent"}`,
        background: active ? "var(--color-background-secondary, #f5f5f5)" : "transparent",
        transition: "background 0.12s",
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLDivElement).style.background = "var(--color-background-secondary, #f5f5f5)";
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      <Avatar initials={conv.initials} avClass={conv.avClass} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-text-primary, #111)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {conv.name}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary, #666)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: 2,
          }}
        >
          {conv.preview}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-tertiary, #999)", whiteSpace: "nowrap" }}>
          {conv.time}
        </span>
        {conv.badge > 0 && (
          <span
            style={{
              background: "#7F77DD",
              color: "#fff",
              borderRadius: 999,
              minWidth: 18,
              height: 18,
              fontSize: 10,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 5px",
            }}
          >
            {conv.badge}
          </span>
        )}
      </div>
    </div>
  );
}

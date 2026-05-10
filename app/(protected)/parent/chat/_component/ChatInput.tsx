import { Paperclip, Smile, Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  iconBtn: React.CSSProperties;
}

export function ChatInput({
  input,
  onInputChange,
  onSendMessage,
  iconBtn,
}: ChatInputProps) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderTop: "0.5px solid var(--color-border-tertiary, #e0e0e0)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button style={iconBtn} title="Đính kèm">
        <Paperclip size={16} />
      </button>
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
        placeholder="Nhập tin nhắn..."
        style={{
          flex: 1,
          border: "0.5px solid var(--color-border-tertiary, #e0e0e0)",
          borderRadius: 999,
          padding: "8px 14px",
          fontSize: 13,
          background: "var(--color-background-secondary, #f5f5f5)",
          color: "var(--color-text-primary, #111)",
          outline: "none",
          fontFamily: "inherit",
        }}
      />
      <button style={iconBtn} title="Emoji">
        <Smile size={16} />
      </button>
      <button
        onClick={onSendMessage}
        title="Gửi"
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "#7F77DD",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 15,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#534AB7";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#7F77DD";
        }}
      >
        <Send size={15} />
      </button>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div
      style={{
        fontSize: 12,
        color: "var(--color-text-secondary, #666)",
        padding: "0 16px 6px",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span style={{ display: "inline-flex", gap: 3 }}>
        {[0, 200, 400].map((delay, i) => (
          <span
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--color-text-secondary, #888)",
              display: "inline-block",
              animation: `chatBlink 1.2s ease-in-out ${delay}ms infinite`,
            }}
          />
        ))}
      </span>
      đang nhập...
      <style>{`@keyframes chatBlink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }`}</style>
    </div>
  );
}

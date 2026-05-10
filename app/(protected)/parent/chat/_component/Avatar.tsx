const AVATAR_COLORS: Record<string, { bg: string; text: string }> = {
  purple: { bg: "#EEEDFE", text: "#534AB7" },
  teal: { bg: "#E1F5EE", text: "#0F6E56" },
  coral: { bg: "#FAECE7", text: "#993C1D" },
  blue: { bg: "#E6F1FB", text: "#185FA5" },
  pink: { bg: "#FBEAF0", text: "#993556" },
  amber: { bg: "#FAEEDA", text: "#854F0B" },
  green: { bg: "#EAF3DE", text: "#3B6D11" },
};

interface AvatarProps {
  initials: string;
  avClass: string;
  size?: number;
  fontSize?: number;
}

export function Avatar({ initials, avClass, size = 38, fontSize = 12 }: AvatarProps) {
  const colors = AVATAR_COLORS[avClass] ?? { bg: "#eee", text: "#555" };
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "50%",
        background: colors.bg,
        color: colors.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        fontSize,
      }}
    >
      {initials}
    </div>
  );
}

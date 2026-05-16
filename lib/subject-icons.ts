/**
 * Subject → Lucide icon mapping.
 * Subject names are sourced directly from /api/master-data/subjects.
 * Uses exact name matching (case-insensitive) with a keyword fallback.
 */

import {
  Languages,
  Calculator,
  FlaskConical,
  Atom,
  BookOpen,
  Music,
  Palette,
  Code2,
  Microscope,
  Scroll,
  Earth,
  BookMarked,
  Piano,
  Mic2,
  LucideIcon,
} from "lucide-react"

export type SubjectIconConfig = {
  icon: LucideIcon
  /** Tailwind bg + text colour classes for the icon pill */
  colorClass: string
}

// ─── Exact subject name → icon (matches API data) ──────────────────────────

export const SUBJECT_ICON_BY_NAME: Record<string, SubjectIconConfig> = {
  // Chương trình Phổ thông (K-12)
  "Toán học": { icon: Calculator, colorClass: "bg-blue-100 text-blue-600" },
  "Ngữ văn": { icon: BookMarked, colorClass: "bg-pink-100 text-pink-600" },
  "Vật lý": { icon: Atom, colorClass: "bg-violet-100 text-violet-600" },
  "Hóa học": { icon: FlaskConical, colorClass: "bg-amber-100 text-amber-600" },
  "Sinh học": { icon: Microscope, colorClass: "bg-lime-100 text-lime-600" },
  "Lịch sử": { icon: Scroll, colorClass: "bg-orange-100 text-orange-600" },
  "Địa lý": { icon: Earth, colorClass: "bg-teal-100 text-teal-600" },

  // Ngoại ngữ
  "Tiếng Anh": {
    icon: Languages,
    colorClass: "bg-emerald-100 text-emerald-600",
  },
  "Tiếng Nhật": { icon: Languages, colorClass: "bg-rose-100 text-rose-600" },
  "Tiếng Trung": { icon: Languages, colorClass: "bg-red-100 text-red-600" },

  // Năng khiếu & Kỹ năng
  "Lập trình (Python/JS)": {
    icon: Code2,
    colorClass: "bg-cyan-100 text-cyan-600",
  },
  "Đàn Piano": { icon: Piano, colorClass: "bg-purple-100 text-purple-600" },
  "Luyện thanh": { icon: Mic2, colorClass: "bg-fuchsia-100 text-fuchsia-600" },
}

// ─── Keyword fallback (for future subjects not yet in the list) ─────────────

const KEYWORD_FALLBACKS: Array<{
  keywords: string[]
  config: SubjectIconConfig
}> = [
  {
    keywords: [
      "tiếng",
      "ngoại ngữ",
      "ielts",
      "toeic",
      "english",
      "japanese",
      "chinese",
      "korean",
      "french",
    ],
    config: { icon: Languages, colorClass: "bg-emerald-100 text-emerald-600" },
  },
  {
    keywords: ["toán", "math", "đại số", "giải tích"],
    config: { icon: Calculator, colorClass: "bg-blue-100 text-blue-600" },
  },
  {
    keywords: ["vật lý", "physics"],
    config: { icon: Atom, colorClass: "bg-violet-100 text-violet-600" },
  },
  {
    keywords: ["hóa", "chemistry"],
    config: { icon: FlaskConical, colorClass: "bg-amber-100 text-amber-600" },
  },
  {
    keywords: ["sinh", "biology"],
    config: { icon: Microscope, colorClass: "bg-lime-100 text-lime-600" },
  },
  {
    keywords: ["lập trình", "python", "javascript", "coding", "tin học"],
    config: { icon: Code2, colorClass: "bg-cyan-100 text-cyan-600" },
  },
  {
    keywords: ["lịch sử", "history"],
    config: { icon: Scroll, colorClass: "bg-orange-100 text-orange-600" },
  },
  {
    keywords: ["địa lý", "geography"],
    config: { icon: Earth, colorClass: "bg-teal-100 text-teal-600" },
  },
  {
    keywords: ["văn", "literature"],
    config: { icon: BookMarked, colorClass: "bg-pink-100 text-pink-600" },
  },
  {
    keywords: ["nhạc", "piano", "guitar", "violin", "đàn"],
    config: { icon: Music, colorClass: "bg-purple-100 text-purple-600" },
  },
  {
    keywords: ["thanh", "vocal", "hát", "luyện"],
    config: { icon: Mic2, colorClass: "bg-fuchsia-100 text-fuchsia-600" },
  },
  {
    keywords: ["mỹ thuật", "vẽ", "art", "design"],
    config: { icon: Palette, colorClass: "bg-rose-100 text-rose-600" },
  },
]

const FALLBACK_CONFIG: SubjectIconConfig = {
  icon: BookOpen,
  colorClass: "bg-gray-100 text-gray-500",
}

// ─── Public helper ──────────────────────────────────────────────────────────

/**
 * Returns the icon + colorClass for a given subject name.
 * 1. Tries exact match (case-insensitive) against SUBJECT_ICON_BY_NAME.
 * 2. Falls back to keyword scan.
 * 3. Returns BookOpen / gray if nothing matches.
 */
export function getSubjectIcon(subjectName: string): SubjectIconConfig {
  if (!subjectName) return FALLBACK_CONFIG

  // 1. Exact match (trim + case-insensitive)
  const trimmed = subjectName.trim()
  const exactKey = Object.keys(SUBJECT_ICON_BY_NAME).find(
    (k) => k.toLowerCase() === trimmed.toLowerCase()
  )
  if (exactKey) return SUBJECT_ICON_BY_NAME[exactKey]

  // 2. Keyword fallback
  const lower = trimmed.toLowerCase()
  const matched = KEYWORD_FALLBACKS.find((entry) =>
    entry.keywords.some((kw) => lower.includes(kw))
  )
  if (matched) return matched.config

  return FALLBACK_CONFIG
}

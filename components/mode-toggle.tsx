"use client"

import { Moon, Sun } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AnimationVariant = "circle" | "circle-blur" | "gif" | "polygon"
type StartPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export interface ModeToggleProps {
  showLabel?: boolean
  variant?: AnimationVariant
  start?: StartPosition
  url?: string
  className?: string
}

export const ModeToggle = ({
  showLabel = false,
  variant = "circle",
  url,
  className,
}: ModeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const xPercent = (x / window.innerWidth) * 100
      const yPercent = (y / window.innerHeight) * 100

      const styleId = `theme-transition-${Date.now()}`
      const style = document.createElement("style")
      style.id = styleId

      let css = ""

      if (variant === "circle") {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { animation: none; }
          ::view-transition-new(root) { animation: circle-expand 0.4s ease-out; }
          @keyframes circle-expand {
            from { clip-path: circle(0% at ${xPercent}% ${yPercent}%); }
            to { clip-path: circle(150% at ${xPercent}% ${yPercent}%); }
          }
        }`
      } else if (variant === "circle-blur") {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { animation: none; }
          ::view-transition-new(root) { animation: circle-blur-expand 0.5s ease-out; filter: blur(0); }
          @keyframes circle-blur-expand {
            from { clip-path: circle(0% at ${xPercent}% ${yPercent}%); filter: blur(4px); }
            to { clip-path: circle(150% at ${xPercent}% ${yPercent}%); filter: blur(0); }
          }
        }`
      } else if (variant === "gif" && url) {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { animation: fade-out 0.5s ease-out; }
          ::view-transition-new(root) { animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1); mask-image: url('${url}'); mask-size: 0%; mask-repeat: no-repeat; mask-position: ${xPercent}% ${yPercent}%; }
          @keyframes fade-out { to { opacity: 0; } }
          @keyframes gif-reveal { 0% { mask-size: 0%; } 20% { mask-size: 35%; } 60% { mask-size: 35%; } 100% { mask-size: 300%; } }
        }`
      } else if (variant === "polygon") {
        css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { animation: none; }
          ::view-transition-new(root) { animation: ${resolvedTheme === "light" ? "wipe-in-dark" : "wipe-in-light"} 0.4s ease-out; }
          @keyframes wipe-in-dark { from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }
          @keyframes wipe-in-light { from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }
        }`
      }

      if (css) {
        style.textContent = css
        document.head.appendChild(style)
        setTimeout(() => {
          document.getElementById(styleId)?.remove()
        }, 3000)
      }

      const newTheme = resolvedTheme === "light" ? "dark" : "light" // ← đổi theme → resolvedTheme

      if ("startViewTransition" in document) {
        ;(document as Document).startViewTransition(() => setTheme(newTheme))
      } else {
        setTheme(newTheme)
      }
    },
    [resolvedTheme, setTheme, variant, url] // ← đổi theme → resolvedTheme
  )

  // ← thêm mounted check
  if (!mounted) return <Button variant="outline" size="icon" disabled />

  return (
    <Button
      variant="outline"
      size={showLabel ? "default" : "icon"}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden transition-all",
        showLabel && "gap-2",
        className
      )}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme`} // ← đổi theme → resolvedTheme
    >
      {resolvedTheme === "light" ? ( // ← đổi theme → resolvedTheme
        <Sun className="w-[1.2rem] h-[1.2rem]" />
      ) : (
        <Moon className="w-[1.2rem] h-[1.2rem]" />
      )}
      {showLabel && (
        <span className="text-sm">
          {resolvedTheme === "light" ? "Light" : "Dark"}
        </span>
      )}
    </Button>
  )
}

export const useThemeTransition = () => {
  const startTransition = useCallback((updateFn: () => void) => {
    if ("startViewTransition" in document) {
      ;(document as Document).startViewTransition(updateFn)
    } else {
      updateFn()
    }
  }, [])

  return { startTransition }
}

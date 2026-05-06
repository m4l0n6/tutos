"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

const latestChange = {
  badge: "UPDATE",
  title: "Smarter shipping quotes",
  description: "Real-time rates at checkout now.", // TIP: Use a single line of text for the description. (max 5 words)
  readMore: { href: "#", label: "Changelog" },
} as const

export function LatestChange() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={cn(
        "group/latest-change justify-center bg-background border cn-rounded min-h-27 size-full",
        "relative flex size-full flex-col gap-1 overflow-hidden px-4 pt-3 pb-1 *:text-nowrap",
        "transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0"
      )}
    >
      <span className="font-mono font-light text-[10px] text-muted-foreground">
        {latestChange.badge}
      </span>
      <p className="font-medium text-xs">{latestChange.title}</p>
      <span className="text-[10px] text-muted-foreground">
        {latestChange.description}
      </span>
      <Button
        asChild
        className="px-0 w-max font-light text-xs"
        size="sm"
        variant="link"
      >
        <a href={latestChange.readMore.href}>{latestChange.readMore.label}</a>
      </Button>
      <Button
        className="top-2 right-2 z-10 absolute opacity-0 group-hover/latest-change:opacity-100 rounded-full size-6 transition-opacity"
        onClick={() => setIsOpen(false)}
        size="icon-sm"
        variant="ghost"
      >
        <XIcon className="size-3.5 text-muted-foreground" />{" "}
      </Button>
    </div>
  )
}

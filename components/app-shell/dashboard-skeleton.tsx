import { cn } from "@/lib/utils"

export function DashboardSkeleton() {
  return (
    <div
      className={cn(
        "gap-px grid grid-cols-2 lg:grid-cols-4 p-px bg-border",
        "*:min-h-48 *:w-full *:bg-background/90"
      )}
    >
      <div />
      <div />
      <div />
      <div />
      <div className="col-span-2 lg:col-span-4 min-h-114!" />
      <div className="col-span-2 lg:col-span-2 min-h-92!" />
      <div className="col-span-2 lg:col-span-2 min-h-92!" />
    </div>
  )
}

import { cn } from "@/lib/utils"

export function DashboardSkeleton() {
  return (
    <div
      className={cn(
        "gap-4 grid grid-cols-2 lg:grid-cols-4",
        "*:min-h-48 *:w-full *:bg-muted *:ring-1 *:ring-border *:dark:bg-muted/50"
      )}
    >
      <div className="rounded-lg" />
      <div className="rounded-lg" />
      <div className="rounded-lg" />
      <div className="rounded-lg" />
      <div className="col-span-2 lg:col-span-2 rounded-lg min-h-92!" />
      <div className="col-span-2 lg:col-span-2 rounded-lg min-h-92!" />
      <div className="col-span-2 lg:col-span-4 rounded-lg min-h-114!" />
    </div>
  )
}

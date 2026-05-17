import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function ClassDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Card 1 skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          <Separator />

          {/* Info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </CardContent>
      </Card>

      {/* Card 2 skeleton — applications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-6 w-44" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-start justify-between gap-4 rounded-md border p-4 sm:flex-row sm:items-center"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
              </div>

              {/* Cover letter + rate */}
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function RequestDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Card 1 skeleton */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-3">
            <Skeleton className="w-2/3 h-7" />
            <Skeleton className="rounded-full w-32 h-6" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="rounded-full w-24 h-6" />
            <Skeleton className="rounded-full w-24 h-6" />
          </div>

          <Separator />

          {/* Info grid */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="mt-0.5 rounded w-4 h-4 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="w-24 h-3.5" />
                  <Skeleton className="w-40 h-4" />
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

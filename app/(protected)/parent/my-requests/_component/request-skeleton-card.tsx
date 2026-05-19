"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function RequestCardSkeleton() {
  return (
    <Card className="bg-white border border-slate-200 rounded-2xl w-full overflow-hidden">
      <CardContent>
        <div className="space-y-4 p-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 space-y-2">
              <Skeleton className="w-3/4 h-5" />
              <div className="flex gap-2">
                <Skeleton className="rounded-full w-24 h-5" />
                <Skeleton className="rounded-full w-20 h-5" />
              </div>
            </div>
            <Skeleton className="rounded-full w-24 h-5 shrink-0" />
          </div>

          {/* Description */}
          <Skeleton className="w-full h-8" />

          <Separator className="bg-slate-100" />

          {/* Schedule + Location */}
          <div className="space-y-2">
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>

          {/* Budget */}
          <Skeleton className="w-2/5 h-4" />

          <Separator className="bg-slate-100" />

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Skeleton className="rounded-md w-28 h-8" />
              <Skeleton className="rounded-md w-28 h-8" />
            </div>
            <Skeleton className="rounded-md w-24 h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

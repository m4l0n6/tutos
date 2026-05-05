"use client"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { HomeIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function Forbidden() {
    const router = useRouter()
  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="flex items-center h-screen">
        <div>
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-mono font-black text-8xl">
                403
              </EmptyTitle>
              <EmptyDescription className="text-nowrap">
                You don&apos;t have permission to access this page.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button onClick={() => router.back()}>
                  <HomeIcon data-icon="inline-start" />
                  Go back
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </div>
  )
}

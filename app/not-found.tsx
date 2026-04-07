import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { HomeIcon, CompassIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="flex items-center h-screen">
        <div>
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-mono font-black text-8xl">
                404
              </EmptyTitle>
              <EmptyDescription className="text-nowrap">
                The page you&apos;re looking for might have been <br />
                moved or doesn&apos;t exist.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Link href="/">
                  <Button>
                    <HomeIcon data-icon="inline-start" />
                    Go Home
                  </Button>
                </Link>
                <Button asChild variant="outline">
                  <a href="#">
                    <CompassIcon data-icon="inline-start" />
                    Explore
                  </a>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </div>
  )
}

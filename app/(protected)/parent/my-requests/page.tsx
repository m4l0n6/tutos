"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateRequestModal } from "./_component/create-request-modal"
import RequestCard from "./_component/request-card"
import { RequestCardSkeleton } from "./_component/request-skeleton-card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useGetMyParentClassesRequest } from "@/hooks/queries/useClassQuery"
import { MClassRequest } from "@/types/classes"

const MyRequestsPage = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const { data: requests, isLoading } = useGetMyParentClassesRequest()

  const handleMessage = (request: MClassRequest) => {
    console.log("Message:", request)
  }

  const handleViewDetails = (request: MClassRequest) => {
    router.push(`/parent/my-requests/${request.id}`)
  }

  const handleEdit = (request: MClassRequest) => {
    console.log("Edit:", request)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CreateRequestModal open={modalOpen} onOpenChange={setModalOpen} />
      <main className="mx-auto w-7xl flex-1 space-y-8 px-8 py-8">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold">My Request</h1>
          </div>
          <div>
            <Button onClick={() => setModalOpen(true)} size="lg">
              <PlusIcon className="h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid gap-4">
          {isLoading ? (
            <>
              <RequestCardSkeleton />
              <RequestCardSkeleton />
              <RequestCardSkeleton />
            </>
          ) : requests && requests.length > 0 ? (
            requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onMessage={handleMessage}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500">No requests found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MyRequestsPage

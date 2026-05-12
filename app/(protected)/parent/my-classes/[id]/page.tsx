"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useGetClassById } from "@/hooks/queries/useClassQuery"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

const ClassDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: classData, isLoading } = useGetClassById(id)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1 space-y-8 mx-auto px-8 py-8 w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/parent/my-classes">My Classes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading ? "Đang tải..." : (classData?.name ?? id)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Content */}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !classData && <div>Không tìm thấy lớp học</div>}
        {classData && <div>Class Details: {classData.name}</div>}
      </main>
    </div>
  )
}

export default ClassDetailsPage

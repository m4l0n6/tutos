"use client"

import TutorClassCard from "./_component/class-card"
import { useGetMyParentClasses } from "@/hooks/queries/useClassQuery"

const ParentMyClassPage = () => {
  const { data: myClasses, isLoading } = useGetMyParentClasses()
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <main className="flex-1 space-y-8 mx-auto px-8 py-8 w-7xl">
        <h1 className="font-bold text-primary text-2xl">My Classes</h1>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {myClasses?.map((classData) => (
            <TutorClassCard key={classData.id} classData={classData} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default ParentMyClassPage

"use client"

import { useGetClass } from "@/hooks/queries/useClassQuery"

export default function ClassesPage() {
  const { data: classes, isLoading, isError } = useGetClass()

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log("Classes data:", classes)
  return (
    <div>Classes Page Content</div>
  )
}
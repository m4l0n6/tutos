"use client"

import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentFailPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-semibold">Thanh toán thất bại</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Giao dịch không thành công hoặc đã bị hủy. Vui lòng thử lại.
        </p>
      </div>
      <Button variant="outline" onClick={() => router.back()}>
        Quay lại và thử lại
      </Button>
    </div>
  )
}

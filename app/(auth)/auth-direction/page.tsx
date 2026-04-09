import { Suspense } from "react"
import AuthDirection from "./AuthDirection"

export default function AuthDirectionPage() {
  return (
    <Suspense fallback={<p>Đang xử lý đăng nhập...</p>}>
      <AuthDirection />
    </Suspense>
  )
}

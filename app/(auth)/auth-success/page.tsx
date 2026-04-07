// app/auth-success/page.tsx
import { Suspense } from "react"
import AuthSuccess from "./_component/AuthSuccess"

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<p>Đang xử lý đăng nhập...</p>}>
      <AuthSuccess />
    </Suspense>
  )
}

import { Suspense } from "react"
import AuthSuccess from "./AuthSuccess"

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<p>Processing login...</p>}>
      <AuthSuccess />
    </Suspense>
  )
}

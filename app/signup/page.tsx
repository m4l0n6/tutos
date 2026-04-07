"use client"

import { SignupForm } from "@/app/signup/_component/signup-form"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="grid lg:grid-cols-2 min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start gap-2">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative bg-muted">
        <img
          src="https://images.unsplash.com/photo-1773332611514-238856b76198?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="absolute inset-0 dark:brightness-[0.2] dark:grayscale w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

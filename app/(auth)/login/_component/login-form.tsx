"use client";

import type React from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FloatingPaths } from "@/app/(auth)/login/_component/floating-paths";
import { ChevronLeftIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useLogin } from "@/hooks/queries/useAuthQuery"
import { useState } from "react";
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { FacebookIcon, GoogleIcon } from "@/components/icons"

export function LoginForm() {
  const router = useRouter()
	const LoginGoogleHandle = () => {
		window.location.href = "https://ketnoigiasu.bvdk333.work/api/auth/google"
	}

	const LoginFacebookHandle = () => {
		window.location.href = "https://ketnoigiasu.bvdk333.work/api/auth/facebook"
	}

  const { mutate: login, isPending } = useLogin()

  const [form, setForm] = useState({
     email: "",
     password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(form, {
      onSuccess: () => {
        toast.success("Login successful!")
        router.push("/dashboard")
      },
      onError: () => toast.error("Email or password is incorrect"),
    })
  }

	return (
    <main className="relative lg:grid lg:grid-cols-2 lg:h-screen lg:overflow-hidden">
      <div className="hidden relative lg:flex lg:flex-col bg-secondary dark:bg-secondary/20 p-10 border-r h-full">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        <Logo />

        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl">
              &ldquo;This Platform has helped me to save time to contact with
              tutors.&rdquo;
            </p>
            <footer className="font-mono font-semibold text-sm">
              ~ Tra My
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>
      <div className="relative flex flex-col justify-center px-4 sm:px-8 py-8 sm:py-12 min-h-screen lg:min-h-screen">
        {/* Top Shades */}
        <div
          aria-hidden
          className="-z-10 isolate absolute inset-0 opacity-60 contain-strict"
        >
          <div className="top-0 right-0 absolute bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] rounded-full w-140 h-320 -translate-y-87.5" />
          <div className="top-0 right-0 absolute bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] rounded-full w-60 h-320 [translate:5%_-50%]" />
          <div className="top-0 right-0 absolute bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] rounded-full w-60 h-320 -translate-y-87.5" />
        </div>
        <Button asChild className="top-4 sm:top-7 left-4 sm:left-5 absolute" variant="ghost" size="sm">
          <Link href="/">
            <ChevronLeftIcon className="size-4" data-icon="inline-start" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </Button>

        <div className="space-y-4 mx-auto w-full sm:w-sm max-w-sm">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="font-bold text-xl sm:text-2xl">Welcome back</h1>
              <p className="text-muted-foreground text-sm sm:text-base text-balance">
                Login to tutor management
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <div className="flex items-center gap-2">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm hover:underline underline-offset-2"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="******"
                  name="password"
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <Spinner /> : "Login"}
                </Button>
              </Field>
            </form>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            <Field className="gap-3 sm:gap-4 grid grid-cols-2">
              <Button
                variant="outline"
                type="button"
                onClick={LoginGoogleHandle}
                size="sm"
              >
                <GoogleIcon  />
                <span className="sr-only">Login with Google</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={LoginFacebookHandle}
                size="sm"
              >
                <FacebookIcon />
                <span className="sr-only">Login with Facebook</span>
              </Button>
            </Field>
            <FieldDescription className="text-sm text-center">
              Don&apos;t have an account? <a href="/signup" className="hover:underline">Sign up</a>
            </FieldDescription>
          </FieldGroup>
        </div>
      </div>
    </main>
  )
}

"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
    <FieldGroup>
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
          <GoogleIcon />
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
        Don&apos;t have an account?{" "}
        <a href="/signup" className="hover:underline">
          Sign up
        </a>
      </FieldDescription>
    </FieldGroup>
  )
}

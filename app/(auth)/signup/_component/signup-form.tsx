"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRegister } from "@/hooks/queries/useAuthQuery"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth"
import { OTPForm } from "./otp-form"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isOTPSent, setIsOTPSent] = useState(false)
  const [email, setEmail] = useState("")

  const { mutate: register, isPending } = useRegister()

  const {
    register: field,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "PARENT" },
  })

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...payload } = data
    void confirmPassword
    register(payload, {
      onSuccess: () => {
        setEmail(data.email)
        setIsOTPSent(true)
      },
      onError: () => toast.error("Registration failed, please try again"),
    })
  }

  if (isOTPSent) return <OTPForm email={email} />

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            className="bg-background"
            {...field("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-background"
            {...field("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="0399676xxx"
            className="bg-background"
            {...field("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </Field>

        <FieldSet>
          <FieldLegend>Role</FieldLegend>
          <Controller
            control={control}
            name="role"
            render={({ field: roleField }) => (
              <RadioGroup
                value={roleField.value}
                onValueChange={roleField.onChange}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <FieldLabel
                  htmlFor="role-parent"
                  className="flex items-center gap-3"
                >
                  <RadioGroupItem value="PARENT" id="role-parent" />
                  <span>Parent</span>
                </FieldLabel>
                <FieldLabel
                  htmlFor="role-tutor"
                  className="flex items-center gap-3"
                >
                  <RadioGroupItem value="TUTOR" id="role-tutor" />
                  <span>Tutor</span>
                </FieldLabel>
              </RadioGroup>
            )}
          />
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            className="bg-background"
            placeholder="e.g: password123"
            {...field("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            className="bg-background"
            placeholder="e.g: password123"
            {...field("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Create Account"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

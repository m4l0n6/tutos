"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { otpSchema, OTPFormValues } from "@/lib/validations/auth"
import { useVerifyOTP } from "@/hooks/queries/useAuthQuery"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

type OTPFormProps = {
  email: string
}

export function OTPForm({ email }: OTPFormProps) {
  const router = useRouter()
  const { mutate: verifyOTP, isPending } = useVerifyOTP()

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  const otpValue = watch("otp")

  const onSubmit = (data: OTPFormValues) => {
    verifyOTP(
      { email, otp: data.otp },
      {
        onSuccess: () => {
          toast.success("Registration successful! You can now log in.")
          router.push("/login")
        },
        onError: () => toast.error("Invalid OTP, please try again"),
      }
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Field>
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <InputOTP
              maxLength={6}
              id="otp-verification"
              value={otpValue}
              onChange={(val) => setValue("otp", val, { shouldValidate: true })}
            >
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {errors.otp && (
              <p className="text-destructive text-sm">{errors.otp.message}</p>
            )}
            <FieldDescription>
              <a href="#">I no longer have access to this email address.</a>
            </FieldDescription>
          </Field>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || otpValue.length !== 6}
          >
            {isPending ? <Spinner /> : "Verify"}
          </Button>
          <div className="text-muted-foreground text-sm">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Contact support
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

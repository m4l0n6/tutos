import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegister, useVerifyOTP } from "@/hooks/queries/useAuthQuery"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
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
import { toast } from "sonner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
   const router = useRouter()
   const { mutate: register, isPending, isError, error } = useRegister()

   const [confirmPassword, setConfirmPassword] = useState("")
   const [isOTPSent, setIsOTPSent] = useState(false)

   const [otpValue, setOtpValue] = useState("")
   const { mutate: verifyOTP, isPending: isVerifying } = useVerifyOTP()

   const [form, setForm] = useState({
      email: "",
      password: "",
      fullName: "",
      phone: "",
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
   }

   const handleVerifyOTP = () => {
     if (otpValue.length !== 6) {
       toast.error("Please enter a valid OTP")
       return
     }
     verifyOTP(
       { email: form.email, otp: otpValue },
       {
         onSuccess: () => {
          router.push("/login")
          toast.success("Registration successful! You can now log in.")
        },
         onError: () => toast.error("Invalid OTP, please try again"),
       }
     )
   }

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault()
     if (form.password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
     }
     register(form, {
       onSuccess: () => {
          setIsOTPSent(true)
      },
       onError: (err) => console.error(err),
     })
   }

   if (isOTPSent) {
     return (
       <Card className="mx-auto max-w-md">
         <CardHeader>
           <CardTitle>Verify your login</CardTitle>
           <CardDescription>
             Enter the verification code we sent to your email address:{" "}
             <span className="font-medium">{form.email}</span>{" "}
             {/* ← hiện email thực */}
           </CardDescription>
         </CardHeader>
         <CardContent>
           <Field>
             <div className="flex justify-between items-center">
               <FieldLabel htmlFor="otp-verification">
                 Verification code
               </FieldLabel>
             </div>
             <InputOTP
               maxLength={6}
               id="otp-verification"
               required
               value={otpValue} // ← thêm
               onChange={setOtpValue} // ← thêm
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
             <FieldDescription>
               <a href="#">I no longer have access to this email address.</a>
             </FieldDescription>
           </Field>
         </CardContent>
         <CardFooter>
           <Field>
             <Button
               type="button"
               className="w-full"
               disabled={isVerifying || otpValue.length !== 6} // ← disable nếu chưa đủ 6 số
               onClick={handleVerifyOTP} // ← thêm
             >
               {isVerifying ? <Spinner /> : "Verify"} {/* ← thêm loading */}
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
           </Field>
         </CardFooter>
       </Card>
     )
   }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-bold text-2xl">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="fullName"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
            onChange={handleChange}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
            onChange={handleChange}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="number">Phone Number</FieldLabel>
          <Input
            id="number"
            name="phone"
            type="tel"
            placeholder="123-456-7890"
            required
            className="bg-background"
            onChange={handleChange}
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-background"
            onChange={handleChange}
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            className="bg-background"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Create Account"}
          </Button>
        </Field>
        {isError && <p>Lỗi: {error?.message}</p>}
        {/* <FieldSeparator>Or continue with</FieldSeparator> */}
        <Field>
          {/* <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button> */}
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}



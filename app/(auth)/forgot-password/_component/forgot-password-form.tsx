import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Input } from "@/components/ui/input"

const ForgotPasswordForm = () => {
    return (
      <form className="gap-6 grid w-full">
        <div className="gap-2 grid">
          <label
            htmlFor="email"
            className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <div className="text-muted-foreground text-sm text-center">
            Remember your password?{" "}
            <Link href="/login" className="hover:underline">
                Log in
            </Link>
        </div>
      </form>
    )
}

export default ForgotPasswordForm;
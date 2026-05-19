import { Button } from "@/components/ui/button"
import Link from "next/link";

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
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="flex bg-transparent file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm disabled:cursor-not-allowed"
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
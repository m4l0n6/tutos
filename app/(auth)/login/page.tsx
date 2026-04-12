import { Logo } from "@/components/logo";
import { FloatingPaths } from "@/app/(auth)/login/_component/floating-paths";
import { ChevronLeftIcon } from "lucide-react";
import { LoginForm } from "@/app/(auth)/login/_component/login-form"

import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
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
        <Button
          asChild
          className="top-4 sm:top-7 left-4 sm:left-5 absolute"
          variant="ghost"
          size="sm"
        >
          <Link href="/">
            <ChevronLeftIcon className="size-4" data-icon="inline-start" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </Button>
        <div className="space-y-4 mx-auto w-full sm:w-sm max-w-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="font-bold text-xl sm:text-2xl">Welcome back</h1>
            <p className="text-muted-foreground text-sm sm:text-base text-balance">
              Login to tutor management
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

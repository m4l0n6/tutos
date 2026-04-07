import { cn } from "@/lib/utils"; 
import { Button } from "../ui/button";
import { ArrowRightIcon, PhoneCallIcon, Sparkle, Eye } from "lucide-react";

export function HeroSection() {
  return (
    <section className="flex flex-col justify-center items-center mt-12 min-h-[60vh] leading-6">
      <div
        aria-hidden="true"
        className="hidden lg:block isolate absolute inset-0 overflow-hidden contain-strict"
      >
        {/* main content */}
        <div className="relative flex flex-col justify-center items-center gap-5 pt-32 pb-30">

          <a
            className={cn(
              "group flex items-center gap-3 bg-card shadow mx-auto px-3 py-1 border rounded-full w-fit",
              "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
            )}
            href="#link"
          >
            <Sparkle className="size-3 text-muted-foreground" />
            <span className="text-xs">New features!</span>
            <span className="block border-l h-5" />

            <ArrowRightIcon className="size-3 group-hover:translate-x-1 duration-150 ease-out" />
          </a>

          <h1
            className={cn(
              "slide-in-from-bottom-10 fill-mode-backwards text-4xl md:text-5xl lg:text-6xl text-center text-balance tracking-tight animate-in duration-500 ease-out delay-100 fade-in",
              "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]",
            )}
          >
            Make your <span className="font-mono text-primary">code</span> <br /> better with AI-powered
          </h1>

          <p className="slide-in-from-bottom-10 fill-mode-backwards mx-auto max-w-md text-foreground/80 text-base sm:text-lg md:text-xl text-center tracking-wider animate-in duration-500 ease-out delay-200 fade-in">
            An AI-powered code review tool that helps you write better code, faster.
          </p>

          <div className="slide-in-from-bottom-10 flex flex-row flex-wrap justify-center items-center gap-3 fill-mode-backwards pt-2 animate-in duration-500 ease-out delay-300 fade-in">
            <Button className="rounded-full" size="lg" variant="secondary">
              <Eye className="size-4" data-icon="inline-start" /> View
            </Button>
            <Button className="rounded-full" size="lg">
              Get started <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

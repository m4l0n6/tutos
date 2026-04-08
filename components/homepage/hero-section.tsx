import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PhoneCallIcon, GraduationCap, Users, TrendingUp, LucideIcon } from "lucide-react"
import Link from "next/link"

type Statistic = {
  icon: LucideIcon
  value: string
  label: string
}

const statistics: Statistic[] = [
  {
    icon: GraduationCap,
    value: "500+",
    label: "Active Tutors",
  },
  {
    icon: Users,
    value: "1200+",
    label: "Parents Trust Us",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
  },
]

export function HeroSection() {
  return (
    <section className="mx-auto pt-8 w-full max-w-5xl overflow-hidden">
      {/* Shades */}
      <div
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-hidden"
      >
        <div
          className={cn(
            "-z-10 isolate absolute inset-0",
            "bg-[radial-gradient(20%_80%_at_20%_0%,--theme(--color-foreground/.1),transparent)]"
          )}
        />
      </div>
      <div className="z-10 relative flex flex-col gap-5 px-4 max-w-2xl">
        <a
          className={cn(
            "group flex items-center gap-3 bg-card shadow-xs p-1 border rounded-sm w-fit",
            "animate-in transition-all delay-500 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in"
          )}
          href="#link"
        >
          <div className="bg-card shadow-sm px-1.5 py-0.5 border rounded-xs">
            <p className="font-mono text-xs">NEW</p>
          </div>

          <span className="text-xs">500+ verified tutors available</span>
          <span className="block border-l h-5" />

          <div className="pr-1">
            <ArrowRightIcon className="size-3 -translate-x-0.5 group-hover:translate-x-0.5 duration-150 ease-out" />
          </div>
        </a>

        <h1
          className={cn(
            "font-bold text-foreground text-4xl md:text-5xl text-balance leading-tight",
            "animate-in delay-100 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in"
          )}
        >
          Find Your Perfect Tutor, Achieve Your Goals
        </h1>

        <p
          className={cn(
            "text-muted-foreground text-sm sm:text-lg md:text-xl tracking-wider",
            "animate-in delay-200 duration-500 ease-out fill-mode-backwards slide-in-from-bottom-10 fade-in"
          )}
        >
          Connect with qualified tutors and manage your learning journey
        </p>

        <div className="slide-in-from-bottom-10 flex justify-center items-center gap-3 fill-mode-backwards pt-2 w-fit animate-in duration-500 ease-out delay-300 fade-in">
          <Link href="/signup">
            <Button variant="outline">
              <PhoneCallIcon data-icon="inline-start" /> Find a Tutor
            </Button>
          </Link>
          <Link href="/signup">
            <Button>
              Became tutor <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="slide-in-from-bottom-5 flex md:flex-row flex-col justify-between gap-4 fill-mode-backwards px-4 pt-8 w-full animate-in duration-500 ease-out delay-400 fade-in">
        {statistics.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex flex-1 items-center gap-4 bg-white dark:bg-card shadow-md px-6 py-8 rounded-xl">
              <div className="flex justify-center items-center bg-muted rounded-lg w-12 h-12">
                <Icon className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground text-2xl">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-x-20 inset-y-0 rounded-full scale-120 -translate-y-1/3",
            "bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.1),transparent,transparent)]",
            "blur-[50px]"
          )}
        />
        <div
          className={cn(
            "relative mask-b-from-60% mt-8 sm:mt-12 md:mt-20 -mr-56 sm:mr-0 px-2 overflow-hidden",
            "animate-in delay-100 duration-1000 ease-out fill-mode-backwards slide-in-from-bottom-5 fade-in"
          )}
        ></div>
      </div>
    </section>
  )
}

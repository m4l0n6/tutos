import PageWrapper from "@/components/wrapper/page-wrapper"
import { HeroSection } from "@/components/homepage/hero-section"

export default function Page() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full overflow-x-hidden">
        <HeroSection />
      </div>
    </PageWrapper>
  )
}

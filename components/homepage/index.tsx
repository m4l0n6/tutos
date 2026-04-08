import { HeroSection } from "./hero-section"
import { FeatureSection } from "./feature-section"
import { CallToAction } from "./cta"
import {TestimonialsSection} from "./testimonials-section"
import { FamousUsersSection } from "./famous-users-section"
import { NewClassesSection } from "./new-classes-section"

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-16 w-full overflow-x-hidden">
        <HeroSection />
        <FeatureSection />
        <NewClassesSection />
        <FamousUsersSection />
        <TestimonialsSection />
        <CallToAction />
    </div>
  )
}

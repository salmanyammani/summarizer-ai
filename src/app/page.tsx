import CTASection from "@/components/landing/cta-section";
import DemoSection from "@/components/landing/demo-section";
import HeroDemo from "@/components/landing/hero/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-900">
      <div className="mt-24">
        <HeroDemo />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}

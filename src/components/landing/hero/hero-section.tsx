import { Sparkles } from "lucide-react";
import HeroBadge from "./hero-badge";
import { Hero } from "./hero-comp";
import { Icons } from "@/components/ui/icons";

export function HeroDemo() {
  return (
    <Hero
      heading="Transform PDFs into consice summaries."
      subtitle="Turn lengthy PDFs into engaging, reel-like visual summaries with AI-powered clarity. Generate structured key insights, interactive progress tracking, and beautifully formatted summaries in seconds."
      badge={
        <HeroBadge
          text="AI powered insights from your PDFs"
          icon={<Sparkles className="h-4 w-4 text-rose-600" />}
          endIcon={<Icons.chevronRight className="h-4 w-4" />}
        />
      }
      actions={[
        {
          label: "Try Demo",
          href: "#demo",
          variant: "outline",
        },
        {
          label: "Start For Free",
          href: "/signup",
          variant: "default",
        },
      ]}
      subtitleClassName="text-lg md:text-xl max-w-[600px] md:max-w-full"
      actionsClassName="mt-8"
    />
  );
}

// Add default export
export default HeroDemo;

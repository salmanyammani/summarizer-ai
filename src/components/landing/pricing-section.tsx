"use client";

import type * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ArrowRightIcon } from "lucide-react";

export interface PricingFeature {
  name: string;
  highlight?: boolean;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  interval?: string;
  description: string;
  features: PricingFeature[];
  highlight?: boolean;
  cta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export interface PricingCardsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tiers?: PricingTier[];
  containerClassName?: string;
  cardClassName?: string;
  sectionClassName?: string;
}

// Default tiers data
const defaultTiers = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    features: [
      { name: "5 PDF summaries per month", included: true },
      { name: "Standard processing speed", included: true },
      { name: "Email support", included: true },
      { name: "Markdown export", included: false },
    ],
    cta: {
      text: "Buy Now",
      href: "/signup",
    },
  },
  {
    name: "Pro",
    price: 19,
    interval: "monthly",
    description: "For professionals and teams",
    highlight: true,
    features: [
      { name: "Unlimited PDF summaries", included: true },
      { name: "Priority processing", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Markdown export", included: true },
    ],
    cta: {
      text: "Buy Now",
      onClick: () => console.log("Contact sales clicked"),
    },
  },
];

export function PricingSection({
  tiers = defaultTiers,
  className,
  containerClassName,
  cardClassName,
  sectionClassName,
  ...props
}: PricingCardsProps) {
  return (
    <section id="pricing"
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-28 px-4",
        "fade-bottom overflow-hidden pb-0",
        sectionClassName
      )}
    >
      <div
        className={cn("w-full max-w-5xl mx-auto px-4", containerClassName)}
        {...props}
      >
        <h3 className="text-base text-center uppercase font-bold tracking-tight sm:text-xl mb-16 text-rose-500">
          pricing
        </h3>
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative group",
                "rounded-2xl transition-all duration-500 w-full max-w-lg",
                tier.highlight
                  ? "bg-white dark:bg-neutral-900 p-[1px] overflow-hidden"
                  : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
                "hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300",
                cardClassName
              )}
            >
              {tier.highlight && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600" />
              )}
              <div
                className={cn(
                  "px-7 py-6 flex flex-col h-full rounded-2xl relative",
                  tier.highlight ? "bg-white dark:bg-neutral-900" : ""
                )}
              >
                <div className="space-y-3">
                  <h3
                    className={cn(
                      "text-lg lg:text-xl tracking-wider font-bold",
                      "text-neutral-900 dark:text-white"
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "text-base-content/80",
                      tier.highlight
                        ? "text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800"
                        : "text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800"
                    )}
                  >
                    {tier.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <h1
                      className={cn(
                        "text-5xl font-bold tracking-tight",
                        "text-neutral-900 dark:text-white"
                      )}
                    >
                      ${tier.price}
                    </h1>
                    <div className="flex flex-col justify-end mb-1">
                      <p className="text-xs font-semibold">USD</p>
                      <p className="text-xs">/month</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4 flex-grow">
                  {tier.features.map((feature) => (
                    <div key={feature.name} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                          feature.included
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-300 dark:text-neutral-700"
                        )}
                      >
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          "text-neutral-600 dark:text-neutral-300"
                        )}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {tier.cta && (
                  <div className="mt-8">
                    {tier.highlight ? (
                      <Button
                        className={cn(
                          "w-full h-12 group relative",
                          "bg-gradient-to-br from-pink-600 via-rose-500 to-rose-700 hover:from-rose-800 hover:via-rose-600 hover:to-pink-700 text-white",
                          "transition-all duration-300"
                        )}
                        onClick={tier.cta.onClick}
                        asChild={Boolean(tier.cta.href)}
                      >
                        {tier.cta.href ? (
                          <a href={tier.cta.href}>
                            <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                              {tier.cta.text}
                              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </a>
                        ) : (
                          <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                            {tier.cta.text}
                            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className={cn(
                          "w-full h-12 group relative",
                          "bg-neutral-900 text-white border border-neutral-300",
                        )}
                        onClick={tier.cta.onClick}
                        asChild={Boolean(tier.cta.href)}
                      >
                        {tier.cta.href ? (
                          <a href={tier.cta.href}>
                            <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                              {tier.cta.text}
                              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </a>
                        ) : (
                          <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                            {tier.cta.text}
                            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

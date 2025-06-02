"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FancyShiningButton from "@/components/custom/fancy-shining-button";

interface HeroAction {
  label: string;
  href: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  gradient?: boolean;
  blur?: boolean;
  heading: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: HeroAction[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
  badge?: React.ReactNode;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      heading,
      subtitle,
      actions,
      subtitleClassName,
      actionsClassName,
      badge,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background",
          className
        )}
        {...props}
      >
        {gradient && (
          <div className="absolute inset-0 z-0 flex w-full flex-1 items-start justify-center">
            {blur && (
              <div className="absolute inset-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow */}
            <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-pink-500/60 opacity-80 blur-3xl" />

            {/* Lamp effect */}
            <motion.div
              initial={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "16rem" }}
              className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-pink-500/60 blur-2xl"
            />

            {/* Top line */}
            <motion.div
              initial={{ width: "15rem" }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ width: "30rem" }}
              className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-pink-500/60"
            />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-pink-500/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
            >
              <div className="absolute w-[100%] left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-40 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-pink-500/60 [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-40 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ y: 100, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative z-50 w-full flex justify-center flex-1 flex-col px-5 md:px-10 gap-4 -translate-y-4"
        >
          <div className="flex flex-col items-center text-center space-y-4  ">
            {badge && <div className="mb-4">{badge}</div>}
            <h2
              className={`text-4xl tracking-tighter font-geist bg-clip-text text-transparent md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]`}
            >
              Turn Your PDFs into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-pink-800 dark:from-purple-300 dark:to-orange-200">
                <br /> Stunning Visual Summaries
              </span>
            </h2>
            {/* <h1
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
                titleClassName
              )}
            >
              {heading}
            </h1> */}
            {subtitle && (
              <p className="max-w-[610px] mx-auto text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className={cn("flex gap-4", actionsClassName)}>
                {actions.map((action, index) =>
                  action.href === "#demo" ? (
                    <Button
                      key={index}
                      variant={action.variant || "default"}
                      asChild
                    >
                      <Link href={action.href}>{action.label}</Link>
                    </Button>
                  ) : (
                    <FancyShiningButton
                      key={index}
                      action={action}
                      index={index}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    );
  }
);
Hero.displayName = "Hero";

export { Hero };

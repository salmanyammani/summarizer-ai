"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

interface NavItem {
  name: string;
  url: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  scrolled: boolean;
  isActiveRoute?: (url: string) => boolean;
}

export default function NavBar({
  items,
  className,
  scrolled,
  isActiveRoute,
}: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 mb-6 sm:mb-0 sm:pt-0 ",
        isSignedIn ? "right-0 translate-x-10" : "left-1/2",
        className
      )}
    >
      <div
        className={`flex items-center gap-3 ${
          scrolled ? "border border-pink-900 shadow-md" : " bg-white"
        } backdrop-blur-xl py-1 px-1 rounded-full`}
      >
        {items.map((item) => {
          const isActive = isActiveRoute
            ? isActiveRoute(item.url)
            : pathname === item.url;

          // Skip rendering dashboard link if user is not logged in
          if (item.url === "/dashboard" && !isSignedIn) {
            return null;
          }

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm px-5 py-1.5 rounded-full transition-colors",
                isActive
                  ? `${scrolled ? "bg-black/5" : ""} text-gray-900 font-bold`
                  : "text-gray-600 font-normal hover:text-gray-900"
              )}
            >
              <span className="block md:block">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={`absolute inset-0 w-full ${
                    scrolled ? "bg-gray-100 rounded-full" : ""
                  } -z-10`}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-pink-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-pink-400/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-pink-400/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-pink-400/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

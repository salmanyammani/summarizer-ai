"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBar from "./floating-nav";
import Image from "next/image";
import { RainbowButtonDemo } from "./upload/rainbow-btn";
import { InteractiveHoverButton } from "@/components/custom/interactive-hover-button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface NavItem {
  name: string;
  url: string;
}

interface MainNavbarProps {
  navItems: NavItem[];
}

export default function MainNavbar({ navItems }: MainNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const isActiveRoute = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent border-none"
          : "backdrop-blur-xl border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-[70px]"
          }`}
        >
          {/* Logo on the left - hidden when scrolled on desktop */}
          <div
            className={`flex items-center transition-opacity duration-300 ${
              scrolled
                ? "opacity-0 md:opacity-0 invisible md:invisible"
                : "opacity-100 visible"
            }`}
          >
            <Link href="/">
              <Image src="/Logos/Logo.png" alt="logo" width={70} height={70} />
            </Link>
          </div>

          {/* Navigation in the middle - always visible, centered when scrolled */}
          <div className={`hidden md:block relative`}>
            <NavBar
              scrolled={scrolled}
              items={navItems}
              className="static transform-none m-0 p-0"
              isActiveRoute={isActiveRoute}
            />
          </div>

          {/* Sign in button on the right - hidden when scrolled on desktop */}
          <div
            className={`${
              scrolled
                ? "opacity-0 md:opacity-0 invisible md:invisible"
                : "opacity-100 visible"
            }`}
          >
            <SignedIn>
              <div className="flex items-center gap-2">
                <RainbowButtonDemo />
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <InteractiveHoverButton />
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile navigation - shown at the bottom on small screens */}
      {/* <div className="md:hidden">
        <NavBar items={navItems} />
      </div> */}
    </div>
  );
}

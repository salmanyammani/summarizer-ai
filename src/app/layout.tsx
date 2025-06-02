import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Summarizer AI - AI PDF Summarizer",
  description:
    "Save hours of reading with our lengthy pdfs with our AI powered tool starting for free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/#pricing" },
    { name: "Features", url: "/#features" },
    { name: "Summaries", url: "/dashboard" },
  ];
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${fontSans.variable} antialiased`}>
          <MainNavbar navItems={navItems} />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

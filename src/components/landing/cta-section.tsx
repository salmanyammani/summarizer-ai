import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FancyShiningButton from "../custom/fancy-shining-button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[400px] w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Ready to Save Hours of Reading Time?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Transform lengthy documents into clear, actionable insights with our
          AI-powered summarizer.
        </p>
        <Link href="/signup">
          <Button className="w-36 h-12 group relative bg-linear-to-r from-slate-900 via-rose-600 to-rose-500 hover:from-rose-600 hover:via-rose-700 hover:to-slate-950 text-white transition-all duration-300">
            Get Started
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

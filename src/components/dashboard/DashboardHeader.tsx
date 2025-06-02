import React from "react";
import HeroBadge from "../landing/hero/hero-badge";
import { Sparkles } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col items-start justify-start gap-3 text-left">
      <h2 className={`text-4xl font-geist md:text-5xl font-bold mt-32`}>
        Your
        <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-pink-900 to-pink-700 dark:from-purple-300 dark:to-orange-200">
          Summaries
        </span>
      </h2>
      <p className="text-gray-600 max-w-2xl">
        Transform your PDFs into consice, actionable insights ✨
      </p>
    </div>
  );
}

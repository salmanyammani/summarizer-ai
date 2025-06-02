import { Pizza } from "lucide-react";
import React from "react";


export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="absolute -top-14 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
        <div></div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-gray-100/80 p-2 border border-gray-500/20 backdrop-blur-xl mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="mb-16">
            <h3 className="text-3xl font-semibold max-w-2xl mx-auto text-black">
              See Sumr in action as it converts{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800  via-rose-500 to-purple-600 dark:from-purple-300 dark:to-orange-200">
                this Next.js course PDF
              </span>{" "}
              into a concise, reader-friendly digest.
            </h3>
          </div>
          <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6">
            Caroasel here
          </div>
        </div>
      </div>
    </section>
  );
}

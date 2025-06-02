import { formatTimeAgo } from "@/components/custom/time-formatter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: number;
}) {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const humanDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant="secondary"
            className="relative text-rose-500 px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-100 shadow-xs hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-rose-500" />
            AI Summary
          </Badge>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-rose-400" />
            {humanDate}
          </div>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-rose-400" />
            {readingTime} min read
          </div>
        </div>
        <h1 className="text2xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-pink-600 to-rose-700 dark:from-purple-300 dark:to-orange-200">
            {title}
          </span>
        </h1>
      </div>
      <div className="self-start">
        <Link href="/dashboard">
          <Button
            variant="link"
            size="sm"
            className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-sm rounded-full transition-all duration-200 shadow-sm hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:translate-x-0.5" />
            <span className="text-sm font-medium text-rose-900">
              Back to Dashboard
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

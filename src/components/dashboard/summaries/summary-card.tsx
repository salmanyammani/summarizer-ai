import { Card } from "@/components/ui/card";
import React from "react";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { formatTimeAgo } from "@/components/custom/time-formatter";
import {
  formatFileName,
  formatSummaryText,
} from "@/components/custom/title-formatter";

const SummarizeHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">{formatTimeAgo(createdAt)}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};
export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card
        className="relative h-full border border-transparent p-1  shadow-accent  bg-white"
        style={{
          backgroundImage:
            "linear-gradient(white, white), linear-gradient(to right, #374151, #8b5cf6, #ec4899)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link
          href={`/summaries/${summary.id}`}
          className="block p-4 sm:px-6 sm:py-6 sm:pb-7"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummarizeHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {formatSummaryText(summary.summary_text)}
            </p>
            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}

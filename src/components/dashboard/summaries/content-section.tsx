import { parseEmojiPoint, parsePoint } from "@/utils/summary-helpers";
import React from "react";

const EmojiPoint = ({ point }: { point: string }) => {
  const parsedPoint = parseEmojiPoint(point);
  if (!parsedPoint) return null;

  const { emoji, text } = parsedPoint;
  return (
    <div className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-lg text-muted-foreground/90 leading-relaxed">
          {renderFormattedText(text)}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  if (!point) return null;

  // Convert bullet point to • if it starts with -
  const formattedPoint = point.startsWith("-")
    ? `• ${point.slice(1).trim()}`
    : point;

  return (
    <div className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <p className="relative sm:text-lg text-muted-foreground/90 leading-relaxed text-left">
        {renderFormattedText(formattedPoint)}
      </p>
    </div>
  );
};

// Helper function to render text with formatting
const renderFormattedText = (text: string) => {
  if (!text) return null;

  // First remove any leading/trailing whitespace
  text = text.trim();

  // Split by bold markers and map to React elements
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        // If the part is wrapped in **, make it bold
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        // Otherwise return as is
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  if (!points || points.length === 0) return null;

  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        if (!point) return null;
        
        // robustly detect an “emoji bullet”
        const emojiData = parseEmojiPoint(point);
        if (emojiData) {
          return <EmojiPoint key={index} point={point} />;
        }
        // everything else (including **bold** only) is a regular point
        return <RegularPoint key={index} point={point} />;
        // const hasEmoji = /\p{Emoji}/u.test(point);
        // const isMainPoint = point.includes("**") || point.includes("🔥");

        // if (hasEmoji || isMainPoint) {
        //   return <EmojiPoint key={`point-${index}`} point={point} />;
        // }
        // return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Upload, Crown } from "lucide-react";
import Link from "next/link";

export function RainbowButtonDemo() {
  return (
    <div className="inline-flex items-center gap-3">
      <Link href="/upload" className="inline-flex items-center gap-2 border border-rose-500 rounded-md px-3 py-1.5 bg-white text-rose-500 text-sm font-medium">
        <Upload className="w-4 h-4" />
        Upload a PDF
      </Link>
      <Badge 
        variant="secondary" 
        className="bg-gradient-to-r border-yellow-300 border rounded-full from-yellow-400 to-yellow-500 text-black text-xs py-0.5"
      >
        <Crown className="w-3 h-3 mr- text-yellow-800" />
        PRO
      </Badge>
    </div>
  );
}
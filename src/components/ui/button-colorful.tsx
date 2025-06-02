import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, PlusIcon } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-4 overflow-hidden",
                "bg-zinc-500 dark:bg-zinc-100",
                "transition-all duration-200",
                "group",
                className
            )}
            {...props}
        >
            {/* Gradient background effect */}
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600",
                    "opacity-50 group-hover:opacity-80",
                    "blur transition-opacity duration-500"
                )}
            />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <PlusIcon className="w-3.5 h-3.5 text-white/90 dark:text-zinc-900/90" />
                <span className="text-white dark:text-zinc-900">{label}</span>
            </div>
        </Button>
    );
}

export { ButtonColorful }
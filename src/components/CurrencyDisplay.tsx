"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const USDT_LOGO = "https://assets.coingecko.com/coins/images/53705/standard/usdt0.jpg?1737086183";

interface CurrencyDisplayProps {
    value: string | number;
    className?: string;
    showLogo?: boolean;
    size?: "sm" | "md" | "lg";
}

export function CurrencyDisplay({
    value,
    className,
    showLogo = true,
    size = "md"
}: CurrencyDisplayProps) {
    const iconSize = size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5";
    const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

    return (
        <div className={cn("inline-flex items-center gap-1.5", className)}>
            {showLogo && (
                <div className={cn("relative rounded-full overflow-hidden shrink-0", iconSize)}>
                    <Image
                        src={USDT_LOGO}
                        alt="USDT"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            )}
            <div className={cn("font-semibold flex items-baseline gap-0.5", textSize)}>
                <span>{typeof value === 'number' ? value.toLocaleString() : value}</span>
                <span className="text-[0.75em] font-bold opacity-70">USDT</span>
            </div>
        </div>
    );
}

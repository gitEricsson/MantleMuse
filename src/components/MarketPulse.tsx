"use client";

import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Simple market sentiment based on time/pseudo-randomness for demo
export function MarketPulse() {
    // Generate a pseudo-stable sentiment based on the current hour
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    // Cycle through sentiments throughout the day for variety in demos
    const sentimentIndex = (hour + Math.floor(minute / 20)) % 3;
    const sentiments = ['bullish', 'neutral', 'bearish'] as const;
    const sentiment = sentiments[sentimentIndex];

    // Mock "change" for display
    const changeValues = ['2.4', '0.1', '-1.8'];
    const change = changeValues[sentimentIndex];

    const config = {
        bullish: {
            icon: TrendingUp,
            label: 'Bullish',
            color: 'text-green-400',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
        },
        neutral: {
            icon: Minus,
            label: 'Neutral',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
        },
        bearish: {
            icon: TrendingDown,
            label: 'Bearish',
            color: 'text-red-400',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
        },
    };

    const { icon: Icon, label, color, bgColor, borderColor } = config[sentiment];

    return (
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border ${bgColor} ${borderColor}`}>
            <div className="flex items-center gap-2">
                <Activity className={`w-4 h-4 ${color}`} />
                <span className="text-sm text-muted-foreground">Market Pulse</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className={`text-sm font-medium ${color}`}>{label}</span>
                <span className={`text-xs font-mono ${color}`}>
                    ({parseFloat(change) > 0 ? '+' : ''}{change}%)
                </span>
            </div>
        </div>
    );
}

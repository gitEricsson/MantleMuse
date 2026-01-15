"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Coins, TrendingUp, User } from "lucide-react";
import { CurrencyDisplay } from "./CurrencyDisplay";

interface ActivityItem {
    id: number;
    type: "investment" | "claim" | "sale";
    wallet: string;
    asset: string;
    amount: string;
    timestamp: Date;
}

// Generate mock activity
const generateMockActivity = (): ActivityItem[] => {
    const assets = [
        "Basquiat: Warrior",
        "Warhol: Marilyn",
        "Afrobeats Vol. 1",
        "90s Hip-Hop Vault",
        "Lo-Fi Beats",
    ];
    const types: ("investment" | "claim" | "sale")[] = ["investment", "investment", "claim", "investment", "sale"];
    const amounts = ["500", "1,200", "85", "2,500", "750", "320", "1,800"];
    const wallets = ["0x7a8b...3f2c", "0x4e2d...9a1b", "0x9c5f...2d8e", "0x1a3c...7f4d", "0x6b2e...8c9a"];

    return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        type: types[i % types.length],
        wallet: wallets[i % wallets.length],
        asset: assets[i % assets.length],
        amount: amounts[i % amounts.length],
        timestamp: new Date(Date.now() - i * 60000 * (3 + Math.random() * 10)),
    }));
};

export function ActivityFeed() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        setActivities(generateMockActivity());
    }, []);

    const getIcon = (type: ActivityItem["type"]) => {
        switch (type) {
            case "investment":
                return <ArrowUpRight className="w-4 h-4 text-green-400" />;
            case "claim":
                return <Coins className="w-4 h-4 text-yellow-400" />;
            case "sale":
                return <TrendingUp className="w-4 h-4 text-blue-400" />;
        }
    };

    const getLabel = (type: ActivityItem["type"]) => {
        switch (type) {
            case "investment":
                return "invested in";
            case "claim":
                return "claimed yield from";
            case "sale":
                return "sold shares of";
        }
    };

    const getTimeAgo = (date: Date) => {
        const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
        if (minutes < 1) return "just now";
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <div className="bg-card/50 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-display flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Recent Activity
                </h3>
                <span className="text-xs text-muted-foreground">Live</span>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {activities.slice(0, visibleCount).map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    {getIcon(activity.type)}
                                </div>
                                <div>
                                    <p className="text-sm">
                                        <span className="text-white font-mono">{activity.wallet}</span>
                                        <span className="text-muted-foreground"> {getLabel(activity.type)} </span>
                                        <span className="text-white">{activity.asset}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{getTimeAgo(activity.timestamp)}</p>
                                </div>
                            </div>
                            <CurrencyDisplay value={activity.amount} size="sm" showLogo={false} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {visibleCount < activities.length && (
                <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors"
                >
                    Show more
                </button>
            )}
        </div>
    );
}

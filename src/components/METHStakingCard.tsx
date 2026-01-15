"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Coins, ArrowRight, Info } from "lucide-react";
import Image from "next/image";
import { CurrencyDisplay } from "./CurrencyDisplay";

interface METHStakingCardProps {
    availableBalance?: number;
}

export function METHStakingCard({ availableBalance = 0 }: METHStakingCardProps) {
    const [amount, setAmount] = useState("");
    const [isStaking, setIsStaking] = useState(false);

    const handleStake = () => {
        setIsStaking(true);
        // Simulate staking delay for demo
        setTimeout(() => {
            setIsStaking(false);
            setAmount("");
        }, 2000);
    };

    // For demo, show estimated mETH APY
    const methApy = 4.2;
    const estimatedYield = amount ? (parseFloat(amount) * methApy / 100).toFixed(2) : "0.00";

    return (
        <Card className="bg-card border-white/10 overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Image
                                src="https://avatars.githubusercontent.com/u/108954920?s=200&v=4"
                                alt="mETH"
                                width={24}
                                height={24}
                                className="rounded"
                                unoptimized
                            />
                        </div>
                        <div>
                            <CardTitle className="text-lg">mETH Yield Staking</CardTitle>
                            <CardDescription className="text-xs">Compound your idle USDT</CardDescription>
                        </div>
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {methApy}% APY
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-background/50 border border-white/5 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Available to Stake</span>
                        <CurrencyDisplay value={availableBalance.toFixed(2)} size="sm" showLogo={true} />
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-background/50 border-white/10"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-white/10"
                            onClick={() => setAmount(availableBalance.toString())}
                        >
                            Max
                        </Button>
                    </div>
                    {parseFloat(amount) > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Estimated yearly yield: <span className="text-green-400 font-medium">{estimatedYield} USDT</span>
                        </p>
                    )}
                </div>

                <Button
                    className="w-full bg-primary text-primary-foreground"
                    disabled={!amount || parseFloat(amount) <= 0 || isStaking}
                    onClick={handleStake}
                >
                    {isStaking ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Staking...
                        </>
                    ) : (
                        <>
                            <Coins className="w-4 h-4 mr-2" />
                            Stake to mETH
                        </>
                    )}
                </Button>

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                    <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                        mETH is Mantle&apos;s liquid staking token. Your stake earns staking rewards while remaining liquid.
                        <a href="https://meth.mantle.xyz/" target="_blank" className="text-primary ml-1 hover:underline">
                            Learn more
                        </a>
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";

export function FaucetButton() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { address } = useAccount();

    const handleFaucet = async () => {
        if (!address) {
            toast({ title: "Error", description: "Please connect wallet first", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/faucet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to mint");

            toast({
                title: "Success! 🎉",
                description: "Sent 10,000 mUSDT to your wallet (Gasless)",
            });
        } catch (error: any) {
            toast({
                title: "Faucet Failed",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleFaucet}
            disabled={isLoading}
            className="hidden md:flex text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Coins className="mr-2 h-4 w-4" />
            )}
            Get 10k USDT
        </Button>
    );
}

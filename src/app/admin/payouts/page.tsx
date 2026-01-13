"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, DollarSign } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { useAdmin } from "@/hooks/use-admin";
import { INITIAL_ASSETS } from "@/lib/storage";
import { useAccount, useReadContract } from "wagmi";
import { DEPLOYMENTS, MOCK_USDC_ABI } from "@/constants/contracts";
import { toast } from "sonner";
import { parseUnits } from "viem";

export default function PayoutsPage() {
    const [selectedAssetId, setSelectedAssetId] = useState<string>("");
    const [amount, setAmount] = useState("");
    const { address } = useAccount();

    const { depositYield, approveUSDCForVault, isPending, isConfirming, isConfirmed, error, hash } = useAdmin();

    // Check Allowance for Vault
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: DEPLOYMENTS.MockUSDC as `0x${string}`,
        abi: MOCK_USDC_ABI,
        functionName: 'allowance',
        args: [address as `0x${string}`, DEPLOYMENTS.MuseVault as `0x${string}`],
    });

    const selectedAsset = INITIAL_ASSETS.find(a => a.id.toString() === selectedAssetId);
    const costBigInt = parseUnits(amount || "0", 6);
    const currentAllowance = allowance as bigint || 0n;
    const needsApproval = currentAllowance < costBigInt;

    const handleAction = () => {
        if (!selectedAssetId || !amount) return;

        if (needsApproval) {
            approveUSDCForVault(amount);
        } else {
            depositYield(Number(selectedAssetId), amount);
        }
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    if (isConfirmed) {
        refetchAllowance();
        // Simple debounce or check to avoid spamming toasts could be added, similar to AssetDetail
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="flex items-center space-x-4 mb-8">
                    <Link href="/admin">
                        <Button variant="outline" size="sm" className="border-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-display font-bold">Distribute Yield</h1>
                        <p className="text-muted-foreground mt-1">
                            Deposit USDT revenue to asset holders
                        </p>
                    </div>
                </div>

                <Card className="bg-card border-white/10">
                    <CardHeader>
                        <CardTitle>New Payout</CardTitle>
                        <CardDescription>
                            Select an asset and enter the revenue amount to distribute.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Asset</Label>
                            <Select value={selectedAssetId} onValueChange={setSelectedAssetId}>
                                <SelectTrigger className="bg-background/50 border-white/10">
                                    <SelectValue placeholder="Choose an asset..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {INITIAL_ASSETS.map((asset) => (
                                        <SelectItem key={asset.id} value={asset.id.toString()}>
                                            {asset.name} (ID: {asset.id})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">Amount <CurrencyDisplay value="" showLogo size="sm" /></Label>
                            <div className="relative">
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="bg-background/50 border-white/10"
                                    placeholder="0.00"
                                    type="number"
                                />
                            </div>
                        </div>

                        {/* Status Badge */}
                        {needsApproval && amount ? (
                            <div className="bg-yellow-500/10 text-yellow-500 text-xs px-3 py-2 rounded border border-yellow-500/20">
                                Wait! You need to approve USDT usage first.
                            </div>
                        ) : amount ? (
                            <div className="bg-green-500/10 text-green-500 text-xs px-3 py-2 rounded border border-green-500/20">
                                Ready to Deposit.
                            </div>
                        ) : null}

                        {hash && (
                            <div className="text-xs text-muted-foreground break-all">
                                Tx: <a href={`https://explorer.sepolia.mantle.xyz/tx/${hash}`} target="_blank" className="underline hover:text-white">{hash}</a>
                            </div>
                        )}

                        <Button
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            size="lg"
                            onClick={handleAction}
                            disabled={isPending || isConfirming || !selectedAssetId || !amount}
                        >
                            {isPending || isConfirming ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : needsApproval ? (
                                "Approve USDT"
                            ) : (
                                "Deposit Yield"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

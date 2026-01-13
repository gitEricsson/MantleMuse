"use client";

import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useMyInvestments } from "@/hooks/use-my-investments";
import { useClaim } from "@/hooks/use-claim";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, TrendingUp, DollarSign, PieChart, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { INITIAL_ASSETS } from "@/lib/storage";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

export default function PortfolioPage() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const { investments, isLoading, refetch } = useMyInvestments();
  const { claim, isPending: isClaimPending, isConfirming: isClaimConfirming } = useClaim();
  const [claimId, setClaimId] = useState<number | null>(null);

  const handleClaim = (assetId: number) => {
    setClaimId(assetId);
    claim(assetId);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-background">
        <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center border border-white/10">
          <AlertCircle className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold font-display">Wallet Not Connected</h1>
        <p className="text-muted-foreground max-w-md text-center">
          Connect your wallet to view your portfolio holdings, track performance, and manage your assets.
        </p>
        <Button size="lg" onClick={() => open()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Connect Wallet
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-10 pb-20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-48 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-white/10">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculate Portfolio Stats
  let totalInvested = 0;
  let currentValue = 0;
  let totalEarned = 0;

  const portfolioItems = investments.map(inv => {
    const asset = INITIAL_ASSETS.find(a => a.id === inv.assetId);
    if (!asset) return null;

    const shares = BigInt(inv.balance);
    const sharesNum = Number(inv.balance);
    const price = parseFloat(asset.pricePerShare);

    const value = sharesNum * price;
    const earned = parseFloat(inv.pendingYield);

    totalInvested += value;
    currentValue += value;
    totalEarned += earned;

    return {
      ...inv,
      asset,
      currentValue: value,
      sharesOwned: shares.toString()
    };
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8">My Portfolio</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CurrencyDisplay value={currentValue.toLocaleString()} size="lg" className="text-white" />
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{portfolioItems.length} Assets</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unclaimed Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <CurrencyDisplay value={totalEarned.toLocaleString()} size="lg" className="text-secondary" />
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            {portfolioItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You don&apos;t own any assets yet.</p>
                <Link href="/explore" passHref>
                  <Button>Browse Marketplace</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead>Asset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Pending Yield</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioItems.map((item: any) => (
                    <TableRow key={item.assetId} className="border-white/5">
                      <TableCell className="font-medium">
                        <Link href={`/assets/${item.assetId}`} className="flex items-center space-x-3 hover:text-primary transition-colors">
                          <div className="relative w-8 h-8 rounded overflow-hidden bg-muted">
                            <Image
                              src={item.asset.imageUrl}
                              alt={item.asset.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <span>{item.asset.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="capitalize text-muted-foreground">{item.asset.type}</TableCell>
                      <TableCell>{item.sharesOwned}</TableCell>
                      <TableCell><CurrencyDisplay value={item.currentValue.toLocaleString()} showLogo={true} size="sm" /></TableCell>
                      <TableCell className="text-secondary font-medium"><CurrencyDisplay value={`+${item.pendingYield}`} showLogo={true} size="sm" className="text-secondary" /></TableCell>
                      <TableCell className="text-right space-x-2">
                        {parseFloat(item.pendingYield) > 0 && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-green-600/20 text-green-400 hover:bg-green-600/30"
                            disabled={(isClaimPending || isClaimConfirming) && claimId === item.assetId}
                            onClick={() => handleClaim(item.assetId)}
                          >
                            {(isClaimPending || isClaimConfirming) && claimId === item.assetId ? "Claiming..." : "Claim"}
                          </Button>
                        )}
                        <Link href={`/assets/${item.assetId}`}>
                          <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

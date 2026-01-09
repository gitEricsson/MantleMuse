"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAsset } from "@/hooks/use-assets";
import { useWallet } from "@/context/WalletContext";
import { useInvest } from "@/hooks/use-transactions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowLeft, Info, TrendingUp, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AssetDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: asset, isLoading } = useAsset(id);
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const investMutation = useInvest();

  // Investing State
  const [amount, setAmount] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (!asset) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Asset Not Found</h1>
      <Link href="/explore"><Button variant="link">Back to Marketplace</Button></Link>
    </div>
  );

  const pricePerShare = parseFloat(asset.pricePerShare);
  const estimatedShares = amount > 0 ? (amount / pricePerShare).toFixed(2) : "0";
  const isValidAmount = amount >= parseFloat(asset.minInvestment);

  const handleInvest = () => {
    if (!isValidAmount) return;
    setShowConfirm(true);
  };

  const confirmInvestment = async () => {
    if (!walletAddress) return;

    try {
      await investMutation.mutateAsync({
        assetId: id,
        amount: amount,
        walletAddress: walletAddress
      });
      setShowConfirm(false);
      setAmount(0);
    } catch (e) {
      // Error handled by hook toast
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 z-20">
          <Link href="/explore" passHref>
            <Button variant="secondary" size="sm" className="bg-background/50 backdrop-blur-md hover:bg-background/80">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="outline" className="text-primary border-primary bg-primary/10 px-3 py-1">
                  {asset.type === 'art' ? 'Fine Art' : 'Music Royalties'}
                </Badge>
                <Badge variant="secondary">{asset.returnType} Focus</Badge>
                <Badge className={asset.riskLevel === 'low' ? 'bg-green-600' : 'bg-yellow-600'}>
                  {asset.riskLevel} Risk
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{asset.name}</h1>
              <p className="text-xl text-primary font-medium">{asset.targetReturn} Target Annual Return</p>
            </div>

            <Card className="bg-card border-white/5 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Asset Value</p>
                  <p className="text-xl font-mono font-semibold">${parseInt(asset.totalValue).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Share Price</p>
                  <p className="text-xl font-mono font-semibold">${asset.pricePerShare}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available</p>
                  <p className="text-xl font-mono font-semibold">{asset.availableShares.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payouts</p>
                  <p className="text-xl font-mono font-semibold capitalize">{asset.payoutFrequency || 'N/A'}</p>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white/5 w-full justify-start h-12 p-1">
                <TabsTrigger value="overview" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
                <TabsTrigger value="financials" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Financials</TabsTrigger>
                <TabsTrigger value="risks" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Risks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 bg-card border border-white/5 rounded-xl p-8 min-h-[300px]">
                <h3 className="text-xl font-bold mb-4 font-display">About the Asset</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{asset.description}</p>
                {asset.story && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <h4 className="text-lg font-bold mb-2 text-white">The Story</h4>
                    <p className="text-muted-foreground leading-relaxed">{asset.story}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="financials" className="mt-6 bg-card border border-white/5 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 font-display">Financial Performance</h3>
                <p className="mb-4 text-muted-foreground">
                  This asset is structured to generate returns through {asset.type === 'music' ? 'quarterly royalty distributions from streaming and sync licensing.' : 'long-term appreciation and eventual resale of the underlying artwork.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="text-primary w-5 h-5" />
                      <span className="font-semibold">Projected Yield</span>
                    </div>
                    <p className="text-2xl font-bold">{asset.targetReturn}</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on historical performance</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign className="text-secondary w-5 h-5" />
                      <span className="font-semibold">Minimum Investment</span>
                    </div>
                    <p className="text-2xl font-bold">${asset.minInvestment}</p>
                    <p className="text-xs text-muted-foreground mt-1">Accessible entry point</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="risks" className="mt-6 bg-card border border-white/5 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 font-display text-red-400">Risk Factors</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Info className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Market volatility may affect the underlying value of the asset.</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Liquidity is not guaranteed; selling shares depends on market demand.</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Past performance of similar assets does not guarantee future results.</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          {/* Investment Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
                <h3 className="text-xl font-bold font-display mb-6">Invest Now</h3>

                {!isConnected ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-6">Connect your wallet to start investing in this asset.</p>
                    <Button onClick={connectWallet} className="w-full bg-primary hover:bg-primary/90">Connect Wallet</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Investment Amount ($)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          min={parseFloat(asset.minInvestment)}
                          value={amount || ''}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="pl-8 bg-background border-white/10 h-12 text-lg"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 flex justify-between">
                        <span>Min: ${asset.minInvestment}</span>
                        <span>Balance: $5,000.00</span>
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Shares</span>
                        <span className="font-mono">{estimatedShares}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fees (0.5%)</span>
                        <span className="font-mono">${(amount * 0.005).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(amount * 1.005).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={!isValidAmount}
                      onClick={handleInvest}
                    >
                      Review Investment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>Review Investment</DialogTitle>
            <DialogDescription>
              Confirm your purchase of shares in {asset.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-background/50 p-4 rounded-lg space-y-3">
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Asset</span>
                 <span className="font-medium">{asset.name}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Amount</span>
                 <span className="font-medium">${amount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Shares</span>
                 <span className="font-medium">{estimatedShares}</span>
               </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                I understand that alternative assets are risky and past performance does not guarantee future returns.
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button
              onClick={confirmInvestment}
              disabled={!agreed || investMutation.isPending}
              className="bg-primary text-primary-foreground"
            >
              {investMutation.isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                "Confirm Investment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

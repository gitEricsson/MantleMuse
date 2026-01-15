"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useAsset } from "@/hooks/use-assets";
import { useAccount, useBalance } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useInvest } from "@/hooks/use-invest";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowLeft, Info, TrendingUp, DollarSign, Wallet, CheckCircle2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { ProposalCard } from "@/components/ProposalCard";
import { AIFairValueCard } from "@/components/AIFairValueCard";
import { parseUnits, formatUnits } from "viem";
import { toast } from "sonner";
import { DEPLOYMENTS } from "@/constants/contracts";

export default function AssetDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: asset, isLoading } = useAsset(id);

  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const { data: usdcBalance } = useBalance({
    address,
    token: DEPLOYMENTS.MockUSDC as `0x${string}`,
  });

  const {
    invest,
    approveUSDC,
    allowance,
    refetchAllowance,
    isPending,      // Wallet Prompt Open
    isConfirming,   // Transaction Indexing
    isConfirmed,    // Transaction Success
    error,
    hash
  } = useInvest();

  // Investing State
  const [amount, setAmount] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ amount: number; shares: number; hash: string }>({ amount: 0, shares: 0, hash: '' });
  const [agreed, setAgreed] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  // Watch for Success
  useEffect(() => {
    if (isConfirmed && asset) {
      refetchAllowance();

      // Recalculate cost locally to ensure we check against the actual shares cost
      const pps = parseFloat(asset.pricePerShare);
      const ns = Math.floor(amount / pps);
      const ec = ns * pps;
      const cbi = parseUnits(ec.toString() || "0", 6);

      toast.success("Transaction Confirmed!", {
        description: "The blockchain state has been updated.",
        action: {
          label: "View on Explorer",
          onClick: () => window.open(`https://explorer.sepolia.mantle.xyz/tx/${hash}`, '_blank')
        }
      });

      if (showConfirm && allowance >= cbi) {
        setShowConfirm(false);
        setSuccessData({ amount: ec, shares: ns, hash: hash || "" });
        setShowSuccess(true);
        setAmount(0);
      }
    }
    if (error) {
      toast.error("Transaction Failed", { description: error.message });
    }
  }, [isConfirmed, error, showConfirm, allowance, amount, asset, hash]);
  /* eslint-enable react-hooks/exhaustive-deps */

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
  // Snap to nearest integer share (floor)
  const numShares = amount > 0 ? Math.floor(amount / pricePerShare) : 0;
  const estimatedShares = numShares.toString();

  // Calculate exact cost for these shares
  const exactCostStr = (numShares * pricePerShare).toFixed(6); // Ensure string precision matches USDC logic if needed, but simple mult is fine usually
  // Actually, pricePerShare is string in asset "100".
  const exactCost = numShares * pricePerShare;

  const costBigInt = parseUnits(exactCost.toString() || "0", 6);
  const isValidAmount = exactCost >= parseFloat(asset.minInvestment) && (usdcBalance ? costBigInt <= usdcBalance.value : true) && numShares > 0;

  const needsApproval = allowance < costBigInt;

  const handleInvestClick = () => {
    if (!isValidAmount) return;
    setShowConfirm(true);
  };

  const handleAction = () => {
    if (needsApproval) {
      // Approve the projected cost
      approveUSDC(exactCost.toString());
    } else {
      // Invest based on shares
      invest(BigInt(asset.id), numShares.toString());
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <Image
          src={asset.imageUrl}
          alt={asset.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
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
                  <div className="text-xl font-mono font-semibold text-white">
                    <CurrencyDisplay value={parseInt(asset.totalValue).toLocaleString()} size="lg" showLogo={true} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Share Price</p>
                  <div className="text-xl font-mono font-semibold text-white">
                    <CurrencyDisplay value={asset.pricePerShare} size="lg" showLogo={true} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available</p>
                  <p className="text-xl font-mono font-semibold text-white">{asset.availableShares.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payouts</p>
                  <p className="text-xl font-mono font-semibold text-white capitalize">{asset.payoutFrequency || 'N/A'}</p>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white/5 w-full justify-start h-12 p-1">
                <TabsTrigger value="overview" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
                <TabsTrigger value="financials" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Financials</TabsTrigger>
                <TabsTrigger value="risks" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Risks</TabsTrigger>
                <TabsTrigger value="howItWorks" className="h-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">How It Works</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 bg-card border border-white/5 rounded-xl p-8 min-h-[300px]">
                <h3 className="text-xl font-bold mb-4 font-display text-white">About the Asset</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{asset.description}</p>
                {asset.story && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <h4 className="text-lg font-bold mb-2 text-white">The Story</h4>
                    <p className="text-muted-foreground leading-relaxed">{asset.story}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="financials" className="mt-6 bg-card border border-white/5 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 font-display text-white">Financial Performance</h3>
                <p className="mb-4 text-muted-foreground">
                  This asset is structured to generate returns through {asset.type === 'music' ? 'quarterly royalty distributions from streaming and sync licensing.' : 'long-term appreciation and eventual resale of the underlying artwork.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="text-primary w-5 h-5" />
                      <span className="font-semibold text-white">Projected Yield</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{asset.targetReturn}</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on historical performance</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign className="text-secondary w-5 h-5" />
                      <span className="font-semibold text-white">Minimum Investment</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      <CurrencyDisplay value={asset.minInvestment} size="lg" showLogo={true} />
                    </div>
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

              <TabsContent value="howItWorks" className="mt-6 bg-card border border-white/5 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 font-display text-white">How Your Investment Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Custody & Ownership</h4>
                      <p className="text-muted-foreground text-sm">
                        {asset.type === 'art'
                          ? 'This artwork is held in a regulated freeport facility with 24/7 security and comprehensive insurance. Your tokens represent beneficial ownership in the SPV that holds the asset.'
                          : 'Music rights are held in a Delaware SPV with clear royalty distribution agreements. Your tokens entitle you to proportional streaming and sync licensing revenue.'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-secondary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Revenue Distribution</h4>
                      <p className="text-muted-foreground text-sm">
                        {asset.type === 'art'
                          ? 'Returns are realized upon resale. When the asset sells, proceeds (minus fees) are distributed pro-rata to all token holders.'
                          : `Royalties are distributed ${asset.payoutFrequency}. Revenue from streaming platforms and sync deals flows directly to your wallet as USDT.`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Liquidity & Exit</h4>
                      <p className="text-muted-foreground text-sm">
                        You can sell your tokens at any time through our secondary marketplace. The protocol offers buyback at current NAV minus a 5% fee.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <Link href="/legal" className="text-primary text-sm hover:underline flex items-center">
                    View Full Legal Documentation
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Investment Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
                <h3 className="text-xl font-bold font-display mb-6 text-white">Invest Now</h3>

                {!isConnected ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-6">Connect your wallet to start investing in this asset.</p>
                    <Button onClick={() => open()} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">Connect Wallet</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white flex items-center gap-2">
                        Investment Amount <CurrencyDisplay value="" showLogo={true} className="inline-flex" />
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          min={parseFloat(asset.minInvestment)}
                          value={amount || ''}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="bg-background border-white/10 h-12 text-lg text-white"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 flex justify-between">
                        <span>Min: <CurrencyDisplay value={asset.minInvestment} showLogo={true} size="sm" /></span>
                        <span>Balance: <CurrencyDisplay value={usdcBalance ? formatUnits(usdcBalance.value, 6) : "0.00"} showLogo={true} size="sm" /></span>
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Shares</span>
                        <span className="font-mono text-white">{estimatedShares}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Network</span>
                        <span className="font-mono text-white">Mantle Sepolia</span>
                      </div>
                      <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold text-white items-center">
                        <span>Total Cost</span>
                        <CurrencyDisplay value={exactCost.toFixed(2)} size="md" />
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={!isValidAmount}
                      onClick={handleInvestClick}
                    >
                      Invest Now
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Governance Section */}
            <div className="mt-6">
              <ProposalCard assetId={id} assetName={asset.name} />
            </div>

            {/* AI Fair Value */}
            <div className="mt-6">
              <AIFairValueCard
                assetName={asset.name}
                assetType={asset.type}
                currentValuation={asset.totalValue}
                description={asset.description}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md bg-card border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Investment</DialogTitle>
            <DialogDescription>
              {needsApproval ? "Approve USDT to be spent by the Vault." : "Finalize your share purchase."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-background/50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Asset</span>
                <span className="font-medium text-white">{asset.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <CurrencyDisplay value={exactCost.toFixed(2)} size="md" />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shares</span>
                <span className="font-medium text-white">{estimatedShares}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                I understand that I am interacting with a Testnet smart contract and the funds are mock USDT.
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConfirm(false)} className="hover:bg-white/10">Cancel</Button>
            <Button
              onClick={handleAction}
              disabled={!agreed || isPending || isConfirming}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              {isPending || isConfirming ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isConfirming ? "Confirming..." : "Waiting..."}</>
              ) : (
                needsApproval ? "Approve 1/2" : "Confirm Investment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md bg-card border-white/10 text-white">
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold font-display">Investment Successful!</DialogTitle>
            <DialogDescription className="text-center max-w-xs mx-auto">
              You have successfully invested in <strong>{asset.name}</strong>.
            </DialogDescription>

            <div className="w-full bg-white/5 rounded-lg p-4 space-y-3 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Amount Invested</span>
                <CurrencyDisplay value={successData.amount.toFixed(2)} size="sm" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shares Purchased</span>
                <span className="font-mono font-medium">{successData.shares}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Transaction Hash</span>
                <a
                  href={`https://explorer.sepolia.mantle.xyz/tx/${successData.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  {successData.hash.slice(0, 6)}...{successData.hash.slice(-4)}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            <div className="flex flex-col w-full space-y-2 pt-4">
              <Link href="/portfolio" passHref>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
                  View Portfolio
                </Button>
              </Link>
              <Button variant="ghost" className="w-full" onClick={() => setShowSuccess(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

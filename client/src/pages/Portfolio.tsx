import { useWallet } from "@/context/WalletContext";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useSell } from "@/hooks/use-transactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, DollarSign, PieChart, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Portfolio() {
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const { data: portfolio, isLoading } = usePortfolio(walletAddress);
  const sellMutation = useSell();

  // Sell State
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [sellShares, setSellShares] = useState<string>('');

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
        <Button size="lg" onClick={connectWallet} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Connect Wallet
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSellClick = (investment: any) => {
    setSelectedAsset(investment);
    setSellShares('');
  };

  const handleConfirmSell = async () => {
    if (!walletAddress || !selectedAsset) return;
    try {
      await sellMutation.mutateAsync({
        assetId: selectedAsset.assetId,
        shares: Number(sellShares),
        walletAddress
      });
      setSelectedAsset(null);
    } catch (e) {
      // Handled by mutation hook
    }
  };

  const estimatedProceeds = selectedAsset && sellShares 
    ? (Number(sellShares) * parseFloat(selectedAsset.asset.pricePerShare)).toFixed(2) 
    : "0.00";

  return (
    <div className="min-h-screen bg-background pt-10 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8">My Portfolio</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${parseFloat(portfolio?.totalInvested || '0').toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${parseFloat(portfolio?.currentValue || '0').toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">+${parseFloat(portfolio?.totalEarned || '0').toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            {portfolio?.investments.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground mb-4">You don't own any assets yet.</p>
                 <Link href="/explore">
                   <Button>Browse Marketplace</Button>
                 </Link>
               </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead>Asset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Shares Owned</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolio?.investments.map((inv: any) => (
                    <TableRow key={inv.id} className="border-white/5">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <img src={inv.asset.imageUrl} alt="" className="w-8 h-8 rounded object-cover bg-muted" />
                          <span>{inv.asset.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize text-muted-foreground">{inv.asset.type}</TableCell>
                      <TableCell>{inv.sharesOwned}</TableCell>
                      <TableCell>${parseFloat(inv.currentValue).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-white/10 hover:bg-white/5"
                          onClick={() => handleSellClick(inv)}
                        >
                          Sell
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sell Modal */}
      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>Sell Shares</DialogTitle>
            <DialogDescription>
              {selectedAsset?.asset.name} - Available: {selectedAsset?.sharesOwned}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Shares to Sell</label>
              <Input 
                type="number" 
                value={sellShares}
                onChange={(e) => setSellShares(e.target.value)}
                max={selectedAsset?.sharesOwned}
                className="bg-background border-white/10"
              />
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estimated Proceeds</span>
              <span className="text-xl font-bold font-mono">${estimatedProceeds}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setSelectedAsset(null)}>Cancel</Button>
            <Button 
              onClick={handleConfirmSell}
              disabled={sellMutation.isPending || !sellShares || Number(sellShares) <= 0 || Number(sellShares) > selectedAsset?.sharesOwned}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {sellMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Sell"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

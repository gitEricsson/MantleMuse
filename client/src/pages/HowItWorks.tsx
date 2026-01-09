import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Wallet, Search, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-display font-bold mb-6">How MantleMuse Works</h1>
          <p className="text-xl text-muted-foreground">
            We democratize access to high-value cultural assets through fractional ownership on the blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
              <Wallet className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">1. Connect Wallet</h3>
            <p className="text-muted-foreground leading-relaxed">
              Link your digital wallet to create your secure investor profile. No lengthy paperwork required.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/20">
              <Search className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold">2. Select Assets</h3>
            <p className="text-muted-foreground leading-relaxed">
              Browse our curated marketplace of fine art and music royalties. Filter by risk, return type, and category.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
              <TrendingUp className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold">3. Earn & Trade</h3>
            <p className="text-muted-foreground leading-relaxed">
              Receive payouts directly to your wallet or sell your shares on our secondary market for liquidity.
            </p>
          </div>
        </div>

        <div className="bg-card border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          <h2 className="text-3xl font-display font-bold mb-6">Ready to start your collection?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of investors diversifying their portfolios with cultural assets.
          </p>
          <Link href="/explore">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-lg h-12 rounded-full">
              View Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

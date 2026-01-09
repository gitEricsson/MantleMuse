import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAssets } from "@/hooks/use-assets";
import { AssetCard } from "@/components/AssetCard";
import { ArrowRight, ShieldCheck, PieChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Fetch only featured assets or limit to 3
  const { data: assets, isLoading } = useAssets();
  const featuredAssets = assets?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] opacity-30" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wide uppercase mb-6 text-primary">
              Web3 Fractional Ownership
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-balance">
              Invest in Culture. <br />
              <span className="text-gradient-teal">Earn Real Yield.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
              Buy fractional shares of blue-chip art and music royalties. 
              Build a diversified portfolio of alternative assets powered by Mantle Network.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore">
                <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-full w-full sm:w-auto">
                  Explore Assets
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 bg-transparent hover:bg-white/5 rounded-full w-full sm:w-auto">
                  How it Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Curated Assets</h3>
              <p className="text-sm text-muted-foreground">Expertly vetted high-value collectibles</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <PieChart className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Fractional Ownership</h3>
              <p className="text-sm text-muted-foreground">Invest with as little as $50</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Track Performance</h3>
              <p className="text-sm text-muted-foreground">Real-time valuation and yield tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Assets */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Featured Opportunities</h2>
              <p className="text-muted-foreground">High-demand assets available now</p>
            </div>
            <Link href="/explore">
              <a className="hidden md:flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-xl bg-card animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAssets?.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/explore">
              <Button variant="outline" className="w-full">View All Assets</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAssets } from '@/hooks/use-assets';
import { AssetCard } from '@/components/AssetCard';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Music,
  Palette,
  Coins,
  ChevronDown,
  Globe,
  Lock,
  Zap,
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { CurrencyDisplay } from '@/components/CurrencyDisplay';

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-background overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-4000" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide uppercase mb-8 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Powered by Mantle Network
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tight">
            Tokenizing Culture. <br />
            <span className="text-gradient-teal">Unlocking Yield.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            MantleMuse is the RealFi protocol transforming blue-chip art and
            music royalties into liquid, on-chain assets. Own a piece of
            history. Earn real revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore" passHref>
              <Button className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_-10px_var(--primary)] rounded-full w-full sm:w-auto transition-all hover:scale-105">
                Start Collecting
              </Button>
            </Link>
            <Link href="/how-it-works" passHref>
              <Button
                variant="outline"
                className="h-14 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full w-full sm:w-auto"
              >
                How It Works
              </Button>
            </Link>
          </div>

          {/* Mini Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
            {[
              { label: 'Total Value Locked', value: '12.4M+' },
              { label: 'Artworks Tokenized', value: '145' },
              { label: 'Royalties Distributed', value: '2.1M' },
              { label: 'Mantle APY', value: '8-12%' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-white font-display flex items-baseline justify-center gap-1">
                  {stat.label.includes('Artworks') || stat.label.includes('APY') ? (
                    stat.value
                  ) : (
                    <CurrencyDisplay value={stat.value} showLogo={true} size="lg" className="justify-center" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WhyInvestSection = () => {
  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Why Alternative Assets?
          </h2>
          <p className="text-muted-foreground text-lg">
            Traditional portfolios are outdated. Data shows that cultural assets
            like Art and Music offer uncorrelated returns and hedge against
            inflation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Card 1: Art Performance */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-card to-background border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={120} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Palette className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-2">
                  Art Outperforms S&P 500
                </h3>
                <p className="text-muted-foreground mb-4">
                  Contemporary art prices have appreciated by an annual average
                  of 14.1% over the last 26 years (1995–2021), compared to 9.9%
                  for the S&P 500.
                </p>
                <div className="text-xs text-muted-foreground/50 uppercase tracking-widest">
                  Source: Citi Global Art Market Report
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Music Royalties */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 bg-gradient-to-br from-card to-background border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -bottom-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Music size={120} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Music className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  Streaming Boom
                </h3>
                <p className="text-muted-foreground text-sm">
                  Goldman Sachs predicts global music revenue to double to
                  roughly 131B USDT by 2030. Earn passive yield from every
                  stream.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Mantle Powered */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 bg-gradient-to-br from-card to-background border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  Powered by Mantle
                </h3>
                <p className="text-muted-foreground text-sm">
                  Hyper-scale performance with Ethereum security. Low gas fees
                  mean more of your investment goes into the asset, not the
                  network.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Compliance */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-card to-background border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
            <div className="relative z-10 h-full flex flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-purple-400" size={24} />
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">
                  Real World Compliant
                </h3>
                <p className="text-muted-foreground">
                  We bridge the gap between DeFi and the real world. All assets
                  are held in SPV structures with full legal compliance,
                  offering you actual ownership rights wrapped in liquid tokens.
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center w-1/3">
                <Lock size={80} className="text-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: 'How does fractional ownership work?',
      answer:
        "We purchase high-value assets (like a Picasso painting or a hit song's royalty rights) and tokenize them on the Mantle network. You buy tokens representing a share of that asset. If the asset generates income or is sold, you receive your pro-rata share.",
    },
    {
      question: 'What is the Mantle Network?',
      answer:
        'Mantle is a high-performance Ethereum Layer 2 network. It allows MantleMuse to offer extremely low transaction fees and high speed while maintaining the security of Ethereum, making micro-investing feasible.',
    },
    {
      question: 'Can I sell my tokens?',
      answer:
        'Yes! Unlike traditional art investing where money is locked for years, MantleMuse provides a secondary market (AMMs) where you can trade your asset tokens for USDT or MNT at any time.',
    },
    {
      question: 'Is this safe?',
      answer:
        'Security is our priority. Smart contracts are audited by top-tier firms. Real-world assets are insured and stored in bonded freeports (for art) or managed by legal entities (for IP).',
    },
  ];

  return (
    <section className="py-24 bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-white/10"
            >
              <AccordionTrigger className="text-lg hover:text-primary transition-colors text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default function Home() {
  const { data: assets, isLoading } = useAssets();
  const featuredAssets = assets?.slice(0, 3);
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30"
    >
      <HeroSection />

      {/* Featured Assets Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Live Opportunities
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Curated blue-chip assets available for fractional investment
                right now on MantleMuse.
              </p>
            </div>
            <Link
              href="/explore"
              className="group flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              <span className="mr-2">View Marketplace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col space-y-4">
                  <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                  <div className="space-y-2 px-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex justify-between items-center px-1 pt-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAssets?.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AssetCard asset={asset} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyInvestSection />

      <FAQSection />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
            Start Building Your <br />
            <span className="text-white">Cultural Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of investors using MantleMuse to access the 1.7T USDT
            alternative asset market.
          </p>
          <div className="flex justify-center">
            <Link href="/explore">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-white text-black hover:bg-gray-200 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200"
              >
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

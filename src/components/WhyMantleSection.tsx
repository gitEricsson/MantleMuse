"use client";

import { Zap, Shield, Coins, TrendingUp, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const benefits = [
    {
        icon: Zap,
        title: "Ultra-Low Gas Fees",
        description: "Invest from just 10 USDT without gas eating into your returns. More money into the asset, not the network.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
    },
    {
        icon: Shield,
        title: "Ethereum Security",
        description: "Backed by Ethereum's proven security model as a Layer 2. Your assets are as secure as ETH itself.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Coins,
        title: "Native USDT Liquidity",
        description: "Deep USDT liquidity means seamless fiat on/off-ramps. Invest in USD-denominated assets effortlessly.",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
    },
    {
        icon: TrendingUp,
        title: "mETH Yield Staking",
        description: "Compound your returns by staking idle USDT into mETH. Earn Mantle's liquid staking rewards on top of asset yield.",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
    },
];

export function WhyMantleSection() {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left: Mantle Branding */}
                    <motion.div
                        className="lg:w-1/3 text-center lg:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/108954920?s=200&v=4"
                                    alt="Mantle Logo"
                                    width={32}
                                    height={32}
                                    className="rounded"
                                    unoptimized
                                />
                            </div>
                            <span className="text-2xl font-display font-bold">Powered by Mantle</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            The RWA-Native <br />Layer 2
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Mantle is the ideal home for Real World Assets — combining Ethereum&apos;s security
                            with the speed and cost-efficiency needed for mainstream adoption.
                        </p>
                        <Link href="https://www.mantle.xyz/" target="_blank">
                            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                                Learn About Mantle
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Right: Benefits Grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-card/50 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-4`}>
                                    <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

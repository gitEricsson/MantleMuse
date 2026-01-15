"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Sparkles,
    Loader2,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    ArrowLeft,
    Brain,
    BarChart3,
    Zap,
    Info
} from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { motion } from "framer-motion";

// Enhanced mock AI analysis
const analyzeAsset = (type: string, name: string, description: string) => {
    const descLower = description.toLowerCase();
    const nameLower = name.toLowerCase();

    let baseValuation = 500000;
    let risk = "medium";
    let confidence = 85;
    let reasoning = "";
    let marketComps: string[] = [];
    let priceHistory: { period: string; value: number }[] = [];

    // Art logic
    if (type === "art") {
        if (nameLower.includes("picasso") || nameLower.includes("warhol") || nameLower.includes("basquiat")) {
            baseValuation = 2500000;
            risk = "low";
            confidence = 92;
            reasoning = "Blue-chip artist with established auction history. Strong demand from institutional collectors.";
            marketComps = ["Christie's 2023: $3.2M", "Sotheby's 2022: $2.8M", "Phillips 2024: $2.4M"];
        } else if (nameLower.includes("banksy")) {
            baseValuation = 1800000;
            risk = "medium";
            confidence = 78;
            reasoning = "High volatility contemporary artist. Authentication is critical.";
            marketComps = ["Street Art Auction 2023: $2.1M", "Private Sale 2024: $1.5M"];
        } else if (nameLower.includes("kusama") || nameLower.includes("yayoi")) {
            baseValuation = 1500000;
            risk = "low";
            confidence = 88;
            reasoning = "Strong global market. Asian collector demand remains high.";
            marketComps = ["Tokyo Auction 2024: $1.8M", "NY Sale 2023: $1.4M"];
        } else {
            baseValuation = 350000 + Math.random() * 500000;
            risk = descLower.includes("emerging") ? "high" : "medium";
            confidence = 72;
            reasoning = "Limited market data. Recommend independent appraisal before investment.";
            marketComps = ["Similar works: $200K-$500K range"];
        }
    }

    // Music logic
    if (type === "music") {
        if (descLower.includes("grammy") || descLower.includes("billboard") || descLower.includes("chart")) {
            baseValuation = 1500000;
            risk = "low";
            confidence = 90;
            reasoning = "Award-winning catalog with proven streaming performance.";
            marketComps = ["Royalty Exchange: $1.8M", "Similar catalog 2023: $1.3M"];
        } else if (descLower.includes("afrobeats") || descLower.includes("latin")) {
            baseValuation = 900000;
            risk = "low";
            confidence = 87;
            reasoning = "High-growth genre with 40% YoY streaming increases.";
            marketComps = ["Genre average: $800K-$1.2M"];
        } else if (descLower.includes("hip-hop") || descLower.includes("90s")) {
            baseValuation = 750000;
            risk = "medium";
            confidence = 82;
            reasoning = "Strong sync licensing potential. Nostalgia-driven demand.";
            marketComps = ["Sync deals: $50K-$200K per placement"];
        } else {
            baseValuation = 400000 + Math.random() * 300000;
            risk = "medium";
            confidence = 75;
            reasoning = "Standard royalty profile. Steady but moderate returns expected.";
            marketComps = ["Industry average: $350K-$600K"];
        }
    }

    const variance = (Math.random() - 0.5) * 0.15;
    const finalValuation = Math.round(baseValuation * (1 + variance));

    // Mock price history
    priceHistory = [
        { period: "6M Ago", value: finalValuation * 0.92 },
        { period: "3M Ago", value: finalValuation * 0.96 },
        { period: "1M Ago", value: finalValuation * 0.99 },
        { period: "Today", value: finalValuation },
        { period: "6M Forecast", value: finalValuation * (1 + (risk === "low" ? 0.08 : risk === "medium" ? 0.05 : 0.02)) },
    ];

    return {
        valuation: finalValuation,
        risk,
        confidence,
        reasoning,
        marketComps,
        priceHistory,
        yieldEstimate: type === "music" ? (8 + Math.random() * 4).toFixed(1) : null,
    };
};

export default function AIToolsPage() {
    const [assetType, setAssetType] = useState("art");
    const [assetName, setAssetName] = useState("");
    const [description, setDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!assetName || !description) return;
        setIsAnalyzing(true);
        await new Promise((r) => setTimeout(r, 2500));
        const analysis = analyzeAsset(assetType, assetName, description);
        setResult(analysis);
        setIsAnalyzing(false);
    };

    const canAnalyze = assetName.length > 3 && description.length > 20;

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/">
                        <Button variant="outline" size="sm" className="mb-6 border-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
                        <Brain className="w-3 h-3 mr-1" />
                        AI-Powered Tools
                    </Badge>
                    <h1 className="text-4xl font-display font-bold mb-4">
                        Asset Valuation AI
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Get instant AI-powered valuations for art and music assets using market comparables and trend analysis.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <Card className="bg-card border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                Describe Your Asset
                            </CardTitle>
                            <CardDescription>
                                Enter details about the asset you want to value
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Asset Type</Label>
                                <Select value={assetType} onValueChange={setAssetType}>
                                    <SelectTrigger className="bg-background/50 border-white/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="art">Fine Art</SelectItem>
                                        <SelectItem value="music">Music Royalties</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Asset Name / Artist</Label>
                                <Input
                                    placeholder={assetType === "art" ? "e.g., Basquiat: Untitled Skull" : "e.g., Afrobeats Global Hits"}
                                    value={assetName}
                                    onChange={(e) => setAssetName(e.target.value)}
                                    className="bg-background/50 border-white/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description / Details</Label>
                                <Textarea
                                    placeholder={assetType === "art"
                                        ? "Include artist, period, medium, provenance, exhibition history..."
                                        : "Include streaming numbers, genres, notable tracks, awards, sync history..."
                                    }
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="bg-background/50 border-white/10"
                                />
                            </div>

                            <Button
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12"
                                onClick={handleAnalyze}
                                disabled={!canAnalyze || isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Analyzing Market Data...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5 mr-2" />
                                        Get AI Valuation
                                    </>
                                )}
                            </Button>

                            {!canAnalyze && (
                                <p className="text-xs text-muted-foreground text-center">
                                    Enter asset name (4+ chars) and description (20+ chars) to enable
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <div className="space-y-6">
                        {!result ? (
                            <Card className="bg-card/50 border-white/5 h-full flex items-center justify-center">
                                <CardContent className="text-center py-16">
                                    <BarChart3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        Enter asset details and click &quot;Get AI Valuation&quot; to see results
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {/* Main Valuation */}
                                <Card className="bg-card border-white/10">
                                    <CardContent className="pt-6">
                                        <div className="text-center mb-6">
                                            <p className="text-sm text-muted-foreground mb-2">AI Estimated Value</p>
                                            <div className="text-4xl font-bold text-white">
                                                <CurrencyDisplay value={result.valuation.toLocaleString()} showLogo={true} size="lg" className="justify-center" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="p-3 bg-background/50 rounded-lg">
                                                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                                                <Badge className={
                                                    result.risk === "low"
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                        : result.risk === "high"
                                                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                }>
                                                    {result.risk.charAt(0).toUpperCase() + result.risk.slice(1)}
                                                </Badge>
                                            </div>
                                            <div className="p-3 bg-background/50 rounded-lg">
                                                <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                                                <p className="font-bold text-white">{result.confidence}%</p>
                                            </div>
                                            {result.yieldEstimate && (
                                                <div className="p-3 bg-background/50 rounded-lg">
                                                    <p className="text-xs text-muted-foreground mb-1">Est. Yield</p>
                                                    <p className="font-bold text-green-400">{result.yieldEstimate}%</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Reasoning */}
                                <Card className="bg-purple-500/5 border-purple-500/20">
                                    <CardContent className="pt-4">
                                        <div className="flex items-start gap-3">
                                            <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-purple-400 text-sm mb-1">AI Reasoning</p>
                                                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Market Comparables */}
                                <Card className="bg-card border-white/10">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Market Comparables</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {result.marketComps.map((comp: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                    {comp}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Button
                                    variant="outline"
                                    className="w-full border-white/10"
                                    onClick={() => setResult(null)}
                                >
                                    Analyze Another Asset
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-12 text-center text-xs text-muted-foreground">
                    <p>
                        AI valuations are estimates based on market data and should not be considered financial advice.
                        Always conduct independent due diligence before investing.
                    </p>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, TrendingUp, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { CurrencyDisplay } from "./CurrencyDisplay";

interface AIFairValueProps {
    assetName: string;
    assetType: string;
    currentValuation: string;
    description: string;
}

// Mock AI analysis
const analyzeAsset = (name: string, type: string, currentVal: number, description: string) => {
    const descLower = description.toLowerCase();
    const nameLower = name.toLowerCase();

    let fairValue = currentVal;
    let verdict = "fair";
    let confidence = 85;
    let reasoning = "";

    // Art logic
    if (type === "art") {
        if (nameLower.includes("picasso") || nameLower.includes("warhol")) {
            fairValue = currentVal * 1.12;
            verdict = "undervalued";
            confidence = 92;
            reasoning = "Blue-chip artist with strong auction history. Current price is 12% below comparable recent sales.";
        } else if (nameLower.includes("basquiat")) {
            fairValue = currentVal * 1.08;
            verdict = "undervalued";
            confidence = 88;
            reasoning = "High demand in contemporary art market. Neo-expressionist works trending upward.";
        } else if (nameLower.includes("banksy")) {
            fairValue = currentVal * 0.95;
            verdict = "fair";
            confidence = 78;
            reasoning = "Volatile market segment. Current price reflects recent auction volatility.";
        } else {
            fairValue = currentVal * (0.95 + Math.random() * 0.15);
            verdict = fairValue > currentVal ? "undervalued" : "fair";
            confidence = 75;
            reasoning = "Limited market data available. Recommend monitoring comparable sales.";
        }
    }

    // Music logic
    if (type === "music") {
        if (descLower.includes("grammy") || descLower.includes("billboard")) {
            fairValue = currentVal * 1.15;
            verdict = "undervalued";
            confidence = 90;
            reasoning = "Award-winning catalog with proven streaming performance. Strong sync licensing potential.";
        } else if (descLower.includes("afrobeats") || descLower.includes("streaming")) {
            fairValue = currentVal * 1.1;
            verdict = "undervalued";
            confidence = 87;
            reasoning = "High-growth genre with exponential streaming increases. YoY growth outpacing market.";
        } else {
            fairValue = currentVal * (0.98 + Math.random() * 0.1);
            verdict = fairValue > currentVal * 1.05 ? "undervalued" : "fair";
            confidence = 80;
            reasoning = "Steady royalty income. Price reflects current yield expectations.";
        }
    }

    return {
        fairValue: Math.round(fairValue),
        verdict,
        confidence,
        reasoning,
        percentDiff: ((fairValue - currentVal) / currentVal * 100).toFixed(1),
    };
};

export function AIFairValueCard({ assetName, assetType, currentValuation, description }: AIFairValueProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<{
        fairValue: number;
        verdict: string;
        confidence: number;
        reasoning: string;
        percentDiff: string;
    } | null>(null);

    const currentVal = parseFloat(currentValuation.replace(/,/g, ""));

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        await new Promise((r) => setTimeout(r, 2000));
        const analysis = analyzeAsset(assetName, assetType, currentVal, description);
        setResult(analysis);
        setIsAnalyzing(false);
    };

    return (
        <div className="bg-card border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white text-sm">AI Fair Value</h4>
                        <p className="text-xs text-muted-foreground">Powered by market analysis</p>
                    </div>
                </div>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                    AI Beta
                </Badge>
            </div>

            {!result ? (
                <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing Market Data...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Get AI Value Estimate
                        </>
                    )}
                </Button>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">AI Fair Value</span>
                        <CurrencyDisplay value={result.fairValue.toLocaleString()} showLogo={true} size="md" />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Verdict</span>
                        <Badge className={
                            result.verdict === "undervalued"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : result.verdict === "overvalued"
                                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        }>
                            {result.verdict === "undervalued" ? (
                                <TrendingUp className="w-3 h-3 mr-1" />
                            ) : result.verdict === "overvalued" ? (
                                <AlertTriangle className="w-3 h-3 mr-1" />
                            ) : (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                            )}
                            {result.verdict.charAt(0).toUpperCase() + result.verdict.slice(1)}
                            <span className="ml-1 font-mono">
                                ({parseFloat(result.percentDiff) > 0 ? "+" : ""}{result.percentDiff}%)
                            </span>
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confidence</span>
                        <span className="text-sm font-medium text-white">{result.confidence}%</span>
                    </div>

                    <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3 mt-2">
                        <p className="text-xs text-muted-foreground">
                            <Info className="w-3 h-3 inline mr-1 text-purple-400" />
                            {result.reasoning}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/10 text-xs"
                        onClick={() => setResult(null)}
                    >
                        Refresh Analysis
                    </Button>
                </div>
            )}
        </div>
    );
}

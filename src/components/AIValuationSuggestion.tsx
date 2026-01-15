"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AIValuationProps {
    assetType: string;
    assetName: string;
    description: string;
    onSuggestion?: (valuation: number, risk: string, reasoning: string) => void;
}

// Mock AI responses based on asset type and description
const generateAIValuation = (type: string, name: string, description: string) => {
    // Simulate AI analysis based on keywords
    const descLower = description.toLowerCase();
    const nameLower = name.toLowerCase();

    let baseValuation = 500000;
    let risk = "medium";
    let reasoning = "";

    // Art valuation logic
    if (type === "art") {
        if (nameLower.includes("picasso") || nameLower.includes("warhol") || nameLower.includes("basquiat")) {
            baseValuation = 2500000;
            risk = "low";
            reasoning = "Blue-chip artist with established auction history. Strong provenance indicators in description.";
        } else if (nameLower.includes("banksy")) {
            baseValuation = 1800000;
            risk = "medium";
            reasoning = "High volatility contemporary artist. Strong market demand but authentication risks.";
        } else if (descLower.includes("emerging") || descLower.includes("young")) {
            baseValuation = 350000;
            risk = "high";
            reasoning = "Emerging artist with growth potential but limited secondary market data.";
        } else {
            baseValuation = 800000;
            risk = "medium";
            reasoning = "Contemporary work with moderate market comparables. Recommend independent appraisal.";
        }
    }

    // Music valuation logic
    if (type === "music") {
        if (descLower.includes("grammy") || descLower.includes("billboard")) {
            baseValuation = 1500000;
            risk = "low";
            reasoning = "Catalog contains award-winning or charting tracks. Consistent royalty income expected.";
        } else if (descLower.includes("streaming") || descLower.includes("spotify")) {
            baseValuation = 800000;
            risk = "low";
            reasoning = "Active streaming catalog with measurable income. Low volatility, steady yield profile.";
        } else if (descLower.includes("sync") || descLower.includes("licensing")) {
            baseValuation = 650000;
            risk = "medium";
            reasoning = "Sync licensing dependent. Higher upside but income variability from deal timing.";
        } else {
            baseValuation = 400000;
            risk = "medium";
            reasoning = "Standard music catalog. Recommend streaming analytics review before final valuation.";
        }
    }

    // Add some variance
    const variance = (Math.random() - 0.5) * 0.2;
    const finalValuation = Math.round(baseValuation * (1 + variance));

    return { valuation: finalValuation, risk, reasoning };
};

export function AIValuationSuggestion({ assetType, assetName, description, onSuggestion }: AIValuationProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<{ valuation: number; risk: string; reasoning: string } | null>(null);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setResult(null);

        // Simulate AI delay
        await new Promise((resolve) => setTimeout(resolve, 2500));

        const suggestion = generateAIValuation(assetType, assetName, description);
        setResult(suggestion);
        setIsAnalyzing(false);

        if (onSuggestion) {
            onSuggestion(suggestion.valuation, suggestion.risk, suggestion.reasoning);
        }
    };

    const canAnalyze = assetName.length > 3 && description.length > 20;

    return (
        <Card className="bg-card border-white/10 border-purple-500/20">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <CardTitle className="text-base">AI Valuation</CardTitle>
                            <CardDescription className="text-xs">Powered by asset analysis</CardDescription>
                        </div>
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        Beta
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {!result ? (
                    <>
                        <p className="text-sm text-muted-foreground">
                            Get an AI-powered valuation suggestion based on asset type, artist/genre, and market comparables.
                        </p>
                        <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            disabled={!canAnalyze || isAnalyzing}
                            onClick={handleAnalyze}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Analyzing Market Data...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Suggest Valuation
                                </>
                            )}
                        </Button>
                        {!canAnalyze && (
                            <p className="text-xs text-muted-foreground text-center">
                                Enter asset name and description to enable AI analysis
                            </p>
                        )}
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-background/50 border border-white/5 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Suggested Valuation</span>
                                <span className="text-xl font-bold text-white">
                                    ${result.valuation.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Risk Level</span>
                                <Badge
                                    className={
                                        result.risk === "low"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : result.risk === "high"
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                    }
                                >
                                    {result.risk === "low" ? (
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                    ) : result.risk === "high" ? (
                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                    ) : (
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                    )}
                                    {result.risk.charAt(0).toUpperCase() + result.risk.slice(1)} Risk
                                </Badge>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground bg-purple-500/5 border border-purple-500/10 rounded-lg p-3">
                            <strong className="text-purple-400">AI Reasoning:</strong> {result.reasoning}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-white/10"
                            onClick={() => setResult(null)}
                        >
                            Analyze Again
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

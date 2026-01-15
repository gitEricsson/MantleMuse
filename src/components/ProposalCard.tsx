"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Users, ThumbsUp, ThumbsDown } from "lucide-react";

interface Proposal {
    id: number;
    title: string;
    description: string;
    status: "active" | "passed" | "rejected";
    endDate: Date;
    yesVotes: number;
    noVotes: number;
}

interface ProposalCardProps {
    assetId: number;
    assetName: string;
}

// Mock proposals based on asset
const getProposals = (assetId: number): Proposal[] => [
    {
        id: 1,
        title: "Exit Strategy Vote",
        description: `Should we accept the current offer to sell the asset at the current valuation (+${8 + assetId}% above purchase)?`,
        status: "active",
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        yesVotes: 1234 + assetId * 100,
        noVotes: 567 + assetId * 50,
    },
];

export function ProposalCard({ assetId, assetName }: ProposalCardProps) {
    const [proposals] = useState<Proposal[]>(getProposals(assetId));
    const [userVote, setUserVote] = useState<"yes" | "no" | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    // Check if user already voted (localStorage)
    useEffect(() => {
        const voted = localStorage.getItem(`vote_${assetId}_1`);
        if (voted) {
            setUserVote(voted as "yes" | "no");
            setHasVoted(true);
        }
    }, [assetId]);

    const handleVote = (vote: "yes" | "no") => {
        setUserVote(vote);
        setHasVoted(true);
        localStorage.setItem(`vote_${assetId}_1`, vote);
    };

    const activeProposal = proposals.find((p) => p.status === "active");

    if (!activeProposal) {
        return null;
    }

    const totalVotes = activeProposal.yesVotes + activeProposal.noVotes + (hasVoted ? 1 : 0);
    const yesPercent = Math.round(
        ((activeProposal.yesVotes + (userVote === "yes" ? 1 : 0)) / totalVotes) * 100
    );
    const noPercent = 100 - yesPercent;

    const daysLeft = Math.ceil(
        (activeProposal.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Card className="bg-card border-white/10">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Governance</CardTitle>
                            <CardDescription className="text-xs">Shareholder Vote</CardDescription>
                        </div>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        <Clock className="w-3 h-3 mr-1" />
                        {daysLeft} days left
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold text-white mb-1">{activeProposal.title}</h4>
                    <p className="text-sm text-muted-foreground">{activeProposal.description}</p>
                </div>

                {/* Voting Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-green-400 flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> Yes ({yesPercent}%)
                        </span>
                        <span className="text-red-400 flex items-center gap-1">
                            No ({noPercent}%) <ThumbsDown className="w-3 h-3" />
                        </span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${yesPercent}%` }}
                        />
                        <div
                            className="h-full bg-red-500 transition-all duration-500"
                            style={{ width: `${noPercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        {totalVotes.toLocaleString()} votes cast
                    </p>
                </div>

                {/* Voting Buttons */}
                {!hasVoted ? (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                            onClick={() => handleVote("yes")}
                        >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Vote Yes
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleVote("no")}
                        >
                            <ThumbsDown className="w-4 h-4 mr-2" />
                            Vote No
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 py-2 bg-white/5 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-muted-foreground">
                            You voted <span className={userVote === "yes" ? "text-green-400" : "text-red-400"}>{userVote?.toUpperCase()}</span>
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

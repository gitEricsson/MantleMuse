"use client";

import { useAccount } from "wagmi";
import { Shield, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function KYCBadge() {
    const { address, isConnected } = useAccount();

    if (!isConnected || !address) return null;

    const isVerified = typeof window !== "undefined"
        ? localStorage.getItem(`kyc_verified_${address}`) === "true"
        : false;

    if (isVerified) {
        return (
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified
            </Badge>
        );
    }

    return (
        <Link href="/kyc">
            <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 gap-1 cursor-pointer hover:bg-yellow-500/20 transition-colors">
                <Shield className="w-3 h-3" />
                Verify KYC
            </Badge>
        </Link>
    );
}

export function useKYCStatus() {
    const { address } = useAccount();

    const isVerified = typeof window !== "undefined" && address
        ? localStorage.getItem(`kyc_verified_${address}`) === "true"
        : false;

    const verifiedName = typeof window !== "undefined" && address
        ? localStorage.getItem(`kyc_name_${address}`) || ""
        : "";

    return { isVerified, verifiedName };
}

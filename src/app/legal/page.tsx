"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Building2, Lock, Scale, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LegalPage() {
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
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                        <Scale className="w-3 h-3 mr-1" />
                        Legal & Compliance
                    </Badge>
                    <h1 className="text-4xl font-display font-bold mb-4">
                        Legal Information
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Understanding how MantleMuse protects your investments through regulatory compliance and secure custody.
                    </p>
                </div>

                {/* Custody Model */}
                <Card className="bg-card border-white/10 mb-8">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle>Custody Model</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            All physical assets held by MantleMuse are stored in regulated, bonded freeport facilities
                            with 24/7 security, climate control, and comprehensive insurance coverage through Lloyd&apos;s of London.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                                <h4 className="font-semibold text-white mb-2">Art Assets</h4>
                                <p className="text-sm">Stored at Le Freeport Luxembourg and Geneva Freeport.
                                    Full provenance documentation and authentication certificates held on-chain.</p>
                            </div>
                            <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                                <h4 className="font-semibold text-white mb-2">Music Rights</h4>
                                <p className="text-sm">Rights held in SPV (Special Purpose Vehicle) structures
                                    registered in Delaware, USA with clear royalty distribution agreements.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* SPV Structure */}
                <Card className="bg-card border-white/10 mb-8">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-secondary" />
                            </div>
                            <CardTitle>SPV Structure</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            Each asset on MantleMuse is held in a dedicated Special Purpose Vehicle (SPV).
                            When you purchase tokens, you acquire beneficial ownership rights in the SPV that holds the asset.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Legal title is held by the SPV for asset protection</li>
                            <li>Token holders have proportional economic rights</li>
                            <li>Dividends and sale proceeds distributed pro-rata</li>
                            <li>Clear exit mechanisms and buyback provisions</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Compliance */}
                <Card className="bg-card border-white/10 mb-8">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-green-500" />
                            </div>
                            <CardTitle>Regulatory Compliance</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            MantleMuse operates with full regulatory compliance to ensure investor protection.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 border border-white/10 rounded-lg">
                                <p className="text-2xl font-bold text-white mb-1">KYC/AML</p>
                                <p className="text-xs">Identity verification for all investors</p>
                            </div>
                            <div className="text-center p-4 border border-white/10 rounded-lg">
                                <p className="text-2xl font-bold text-white mb-1">Reg D</p>
                                <p className="text-xs">SEC-compliant offering structure</p>
                            </div>
                            <div className="text-center p-4 border border-white/10 rounded-lg">
                                <p className="text-2xl font-bold text-white mb-1">Audited</p>
                                <p className="text-xs">Annual third-party audits</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Risk Disclosure */}
                <Card className="bg-card border-white/10 mb-8">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-yellow-500" />
                            </div>
                            <CardTitle>Risk Disclosure</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            Investing in alternative assets involves risk. Please review the following disclosures carefully:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                            <li>Past performance does not guarantee future results</li>
                            <li>Alternative assets are illiquid; secondary market liquidity is not guaranteed</li>
                            <li>Valuations are based on third-party appraisals and may fluctuate</li>
                            <li>Token values may not reflect underlying asset values in real-time</li>
                            <li>Regulatory changes may impact the platform or specific assets</li>
                            <li>Smart contract risks exist; code audits mitigate but do not eliminate risk</li>
                        </ul>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                            <p className="text-yellow-400 text-sm">
                                <strong>Important:</strong> Only invest what you can afford to lose.
                                MantleMuse is not a registered broker-dealer or investment advisor.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Terms Footer */}
                <div className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t border-white/10">
                    <p className="mb-4">
                        By using MantleMuse, you agree to our{" "}
                        <Link href="/legal" className="text-primary hover:underline">Terms of Service</Link>{" "}
                        and{" "}
                        <Link href="/legal" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                    <p>© 2025 MantleMuse. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

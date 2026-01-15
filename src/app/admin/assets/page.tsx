"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, Loader2 } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { Asset } from "@/lib/storage";

export default function AdminAssetsPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await fetch("/api/admin/assets");
            if (response.ok) {
                const data = await response.json();
                setAssets(data);
            }
        } catch (error) {
            console.error("Failed to fetch assets", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin">
                            <Button variant="outline" size="sm" className="border-white/10">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-display font-bold">Manage Assets</h1>
                            <p className="text-muted-foreground mt-1">
                                View and manage all listed assets
                            </p>
                        </div>
                    </div>
                    <Link href="/admin/assets/new">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add New Asset
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : assets.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No assets found. Create your first one!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {assets.map((asset) => (
                            <AssetCard key={asset.id} asset={asset} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// src/app/explore/page.tsx
'use client';

import { useState, useDeferredValue } from 'react';
import { useAssets } from '@/hooks/use-assets';
import { AssetCard } from '@/components/AssetCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    type?: 'art' | 'music';
    returnType?: 'growth' | 'income';
    riskLevel?: 'low' | 'medium' | 'high';
  }>({});

  const debouncedSearchTerm = useDeferredValue(searchTerm);

  const { data: assets = [], isLoading } = useAssets({
    ...filters,
    search: debouncedSearchTerm || undefined,
  });

  const filteredAssets = assets.filter(
    (asset) =>
      !debouncedSearchTerm ||
      asset.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      asset.description
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
  );

  const showNoResults = !isLoading && filteredAssets.length === 0;

  return (
    <div className="min-h-screen pt-12 pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover curated investment opportunities in art and music.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-card/50 border border-white/10 rounded-2xl p-4 mb-12 backdrop-blur-sm sticky top-20 z-40">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto md:flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                className="pl-9 bg-background/50 border-white/10 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Select
                value={filters.type || 'all'}
                onValueChange={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: val === 'all' ? undefined : (val as 'art' | 'music'),
                  }))
                }
              >
                <SelectTrigger className="w-[140px] bg-background/50 border-white/10">
                  <SelectValue placeholder="Asset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="art">Fine Art</SelectItem>
                  <SelectItem value="music">Music Royalties</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.riskLevel || 'all'}
                onValueChange={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    riskLevel:
                      val === 'all'
                        ? undefined
                        : (val as 'low' | 'medium' | 'high'),
                  }))
                }
              >
                <SelectTrigger className="w-[140px] bg-background/50 border-white/10">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="border-white/10 bg-background/50"
                onClick={() => {
                  setFilters({});
                  setSearchTerm('');
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : showNoResults ? (
          <div className="text-center py-24 bg-card/30 rounded-2xl border border-white/5 border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No assets found</h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search term.`
                : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type Asset } from '@/types/api';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Music, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CurrencyDisplay } from './CurrencyDisplay';

interface AssetCardProps {
  asset: Asset;
}

import { useMuseAsset } from '@/hooks/use-muse-asset';
import { formatUnits } from 'viem';



export function AssetCard({ asset }: AssetCardProps) {
  const { getAssetDetails, getTotalSupply } = useMuseAsset();
  const { data: onChainAsset, isLoading } = getAssetDetails(BigInt(asset.id));
  const { data: totalSupply } = getTotalSupply(BigInt(asset.id));

  // Parse On-Chain Data (or fallback to API data)
  const price = onChainAsset?.[3] ? formatUnits(onChainAsset[3], 6) : asset.minInvestment; // initialPrice
  const maxSupply = onChainAsset?.[4] ? Number(onChainAsset[4]) : asset.availableShares;
  const currentSupply = totalSupply ? Number(totalSupply) : 0;
  const available = maxSupply - currentSupply;
  const isActive = onChainAsset?.[5] ?? true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/assets/${asset.id}`} className="block h-full">
        <Card className="h-full bg-card/50 border-white/5 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors group">
          {/* Image Container with Overlay */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
            <Image
              src={asset.imageUrl}
              alt={asset.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute top-3 left-3 z-20">
              <Badge
                variant="secondary"
                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {asset.type === 'art' ? (
                  <Palette className="w-3 h-3 mr-1" />
                ) : (
                  <Music className="w-3 h-3 mr-1" />
                )}
                {asset.type === 'art' ? 'Fine Art' : 'Music Royalties'}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                  {asset.returnType} Return
                </p>
                <h3 className="text-lg font-bold font-display leading-tight">
                  {asset.name}
                </h3>
              </div>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Price / Share
                </p>
                <div className="font-semibold text-primary">
                  {isLoading ? "..." : <CurrencyDisplay value={price} />}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${asset.riskLevel === 'low'
                      ? 'bg-green-500'
                      : asset.riskLevel === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                      }`}
                  />
                  <span className="capitalize text-sm font-medium">
                    {asset.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Available</span>
              <span className="font-mono font-medium text-white">
                {isLoading ? "..." : available.toLocaleString()}
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="w-full py-2 bg-secondary/10 rounded text-center text-secondary text-sm font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center">
              View Details <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

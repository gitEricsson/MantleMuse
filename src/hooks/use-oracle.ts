import { useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

// Pyth Network Price Feed Contract on Mantle Sepolia
// https://docs.pyth.network/price-feeds/contract-addresses/evm
const PYTH_CONTRACT = '0xA2aa501b19aff244D90cc15a4Cf739D2725B5729';

// Price feed IDs from Pyth
const PRICE_FEED_IDS = {
    'ETH/USD': '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    'MNT/USD': '0x4e3037c822d852d79af3ac80e35eb420ee3b870dca49f9344a38ef4773fb0585',
};

const PYTH_ABI = parseAbi([
    'function getPrice(bytes32 id) view returns (int64 price, uint64 conf, int32 expo, uint256 publishTime)',
    'function getPriceUnsafe(bytes32 id) view returns (int64 price, uint64 conf, int32 expo, uint256 publishTime)',
]);

export interface OraclePrice {
    price: number;
    confidence: number;
    publishTime: Date;
    isStale: boolean;
}

export function useOracle(feedId: keyof typeof PRICE_FEED_IDS = 'ETH/USD') {
    const { data, isLoading, error, refetch } = useReadContract({
        address: PYTH_CONTRACT as `0x${string}`,
        abi: PYTH_ABI,
        functionName: 'getPriceUnsafe',
        args: [PRICE_FEED_IDS[feedId] as `0x${string}`],
    });

    let parsedPrice: OraclePrice | null = null;

    if (data) {
        const [price, conf, expo, publishTime] = data as [bigint, bigint, number, bigint];
        const priceNum = Number(price) * Math.pow(10, expo);
        const confNum = Number(conf) * Math.pow(10, expo);
        const pubTime = new Date(Number(publishTime) * 1000);
        const isStale = Date.now() - pubTime.getTime() > 60000; // 1 minute staleness

        parsedPrice = {
            price: priceNum,
            confidence: confNum,
            publishTime: pubTime,
            isStale,
        };
    }

    return {
        data: parsedPrice,
        isLoading,
        error,
        refetch,
    };
}

// Market sentiment based on ETH price movement
export function useMarketSentiment() {
    const { data: ethPrice, isLoading } = useOracle('ETH/USD');

    // For demo, we'll simulate sentiment based on time of day
    // In production, this would compare current price to 24h ago
    const hour = new Date().getHours();
    const sentiment = hour >= 9 && hour <= 17 ? 'bullish' : hour >= 18 && hour <= 21 ? 'neutral' : 'bearish';

    return {
        sentiment,
        ethPrice: ethPrice?.price || 0,
        isLoading,
        color: sentiment === 'bullish' ? 'text-green-400' : sentiment === 'bearish' ? 'text-red-400' : 'text-yellow-400',
        bgColor: sentiment === 'bullish' ? 'bg-green-500/10' : sentiment === 'bearish' ? 'bg-red-500/10' : 'bg-yellow-500/10',
    };
}


import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MUSE_MARKET_ABI, DEPLOYMENTS } from '@/constants/contracts';
import { parseUnits } from 'viem';

export function useMuseMarket() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const buyListing = (listingId: bigint, price: string) => { // price in USDC (6 decimals)
        writeContract({
            address: DEPLOYMENTS.MuseMarket as `0x${string}`,
            abi: MUSE_MARKET_ABI,
            functionName: 'buy',
            args: [listingId],
        });
    };

    return {
        buyListing,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash
    };
}

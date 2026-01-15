import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { MUSE_MARKET_ABI, MUSE_ASSET_ABI, DEPLOYMENTS } from '@/constants/contracts';

export function useSell() {
    const { address } = useAccount();
    const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    // Check if user has approved MuseMarket to transfer their shares
    const { data: isApproved, refetch: refetchApproval } = useReadContract({
        address: DEPLOYMENTS.MuseAsset as `0x${string}`,
        abi: MUSE_ASSET_ABI,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`, DEPLOYMENTS.MuseMarket as `0x${string}`],
        query: {
            enabled: !!address,
        }
    });

    // 1. Approve MuseMarket to transfer shares (one-time)
    const approveMarket = () => {
        writeContract({
            address: DEPLOYMENTS.MuseAsset as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'setApprovalForAll',
            args: [DEPLOYMENTS.MuseMarket as `0x${string}`, true]
        });
    };

    // 2. Sell shares to protocol
    const sellToProtocol = (assetId: number, amount: number) => {
        writeContract({
            address: DEPLOYMENTS.MuseMarket as `0x${string}`,
            abi: MUSE_MARKET_ABI,
            functionName: 'sellToProtocol',
            args: [BigInt(assetId), BigInt(amount)],
        });
    };

    return {
        sellToProtocol,
        approveMarket,
        isApproved: isApproved as boolean || false,
        refetchApproval,
        isPending,
        isConfirming,
        isConfirmed,
        error: writeError,
        hash
    };
}

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MUSE_VAULT_ABI, DEPLOYMENTS } from '@/constants/contracts';
import { ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function useClaim() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    useEffect(() => {
        if (isConfirmed) {
            toast.success("Yield Claimed Successfully!", {
                description: "Your USDC rewards have been sent to your wallet.",
                action: {
                    label: "View on Explorer",
                    onClick: () => window.open(`https://explorer.sepolia.mantle.xyz/tx/${hash}`, '_blank')
                }
            });
        }
        if (error) {
            toast.error("Claim Failed", { description: error.message });
        }
    }, [isConfirmed, error, hash]);

    const claim = (assetId: number) => {
        writeContract({
            address: DEPLOYMENTS.MuseVault as `0x${string}`,
            abi: MUSE_VAULT_ABI,
            functionName: 'claimYield',
            args: [BigInt(assetId)],
        });
    };

    return {
        claim,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash
    };
}

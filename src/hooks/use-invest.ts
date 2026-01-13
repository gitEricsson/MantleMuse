
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { MUSE_VAULT_ABI, MOCK_USDC_ABI, DEPLOYMENTS } from '@/constants/contracts';
import { parseUnits } from 'viem';

export function useInvest() {
    const { address } = useAccount();
    const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    // Read Allowance
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: DEPLOYMENTS.MockUSDC as `0x${string}`,
        abi: MOCK_USDC_ABI,
        functionName: 'allowance',
        args: [address as `0x${string}`, DEPLOYMENTS.MuseVault as `0x${string}`],
        query: {
            enabled: !!address,
        }
    });

    // 1. Approve USDC First
    const approveUSDC = (amount: string) => {
        writeContract({
            address: DEPLOYMENTS.MockUSDC as `0x${string}`,
            abi: MOCK_USDC_ABI,
            functionName: 'approve',
            args: [DEPLOYMENTS.MuseVault as `0x${string}`, parseUnits(amount, 6)]
        });
    }

    // 2. Invest
    const invest = (assetId: bigint, shares: string) => {
        writeContract({
            address: DEPLOYMENTS.MuseVault as `0x${string}`,
            abi: MUSE_VAULT_ABI,
            functionName: 'invest',
            args: [assetId, BigInt(shares)], // Shares are flat integers (ERC1155)
        });
    };

    return {
        invest,
        approveUSDC,
        allowance: allowance as bigint || 0n,
        refetchAllowance,
        isPending,
        isConfirming,
        isConfirmed,
        error: writeError,
        hash
    };
}

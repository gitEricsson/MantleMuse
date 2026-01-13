import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { MUSE_ASSET_ABI, MUSE_VAULT_ABI, MOCK_USDC_ABI, DEPLOYMENTS } from '@/constants/contracts';
import { parseUnits } from 'viem';

export function useAdmin() {
    const { writeContract, data: hash, error, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    // 1. Create Asset (MuseAsset)
    const createAsset = (
        name: string,
        type: number, // 0=Art, 1=Music
        targetReturn: number, // basis points
        initialPrice: number, // USDC
        maxSupply: number
    ) => {
        writeContract({
            address: DEPLOYMENTS.MuseAsset as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'createAsset',
            args: [
                name,
                type,
                BigInt(targetReturn),
                parseUnits(initialPrice.toString(), 6), // USDC decimals
                BigInt(maxSupply)
            ]
        });
    }

    // 2. Deposit Yield (MuseVault)
    const depositYield = (assetId: number, amount: string) => {
        writeContract({
            address: DEPLOYMENTS.MuseVault as `0x${string}`,
            abi: MUSE_VAULT_ABI,
            functionName: 'depositYield',
            args: [BigInt(assetId), parseUnits(amount, 6)]
        });
    }

    // 3. Approve USDC (for Yield Deposit)
    const approveUSDCForVault = (amount: string) => {
        writeContract({
            address: DEPLOYMENTS.MockUSDC as `0x${string}`,
            abi: MOCK_USDC_ABI,
            functionName: 'approve',
            args: [DEPLOYMENTS.MuseVault as `0x${string}`, parseUnits(amount, 6)]
        });
    }

    return {
        createAsset,
        depositYield,
        approveUSDCForVault,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash
    };
}

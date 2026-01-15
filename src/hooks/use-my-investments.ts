import { useAccount, useReadContracts } from "wagmi";
import { MUSE_ASSET_ABI, MUSE_VAULT_ABI, DEPLOYMENTS } from "@/constants/contracts";
import { INITIAL_ASSETS } from "@/lib/storage";
import { formatUnits } from "viem";

export type Investment = {
    assetId: number;
    balance: string; // User's share balance
    pendingYield: string; // Claimable USDC
    symbol: string;
};

export function useMyInvestments() {
    const { address } = useAccount();

    // We know the asset IDs are 1 to 5 from INITIAL_ASSETS
    // In a real app, we might query 'activeAssets' count from contract first.
    const assetIds = INITIAL_ASSETS.map((a) => BigInt(a.id));

    // 1. Prepare calls for balanceOfBatch (MuseAsset)
    // We can use a single call to balanceOfBatch if supported, or multiple balanceOf.
    // MuseAsset is ERC1155, so it supports balanceOfBatch.
    const balanceContract = {
        address: DEPLOYMENTS.MuseAsset,
        abi: MUSE_ASSET_ABI,
    } as const;

    // 2. Prepare calls for getPendingYield (MuseVault)
    const vaultContract = {
        address: DEPLOYMENTS.MuseVault,
        abi: MUSE_VAULT_ABI,
    } as const;

    // We combine all reads into one hook for efficiency
    // First call: balanceOfBatch(account, [1,2,3,4,5])
    // Subsequent calls: getPendingYield(id, account) for each id
    const { data, isPending, refetch } = useReadContracts({
        contracts: [
            {
                ...balanceContract,
                functionName: "balanceOfBatch",
                args: [
                    Array(assetIds.length).fill(address || "0x0000000000000000000000000000000000000000"),
                    assetIds,
                ],
            },
            ...assetIds.map((id) => ({
                ...vaultContract,
                functionName: "getPendingYield",
                args: [id, address || "0x0000000000000000000000000000000000000000"],
            })),
        ],
        query: {
            enabled: !!address,
            refetchInterval: 10000, // Refresh every 10s
        },
    });

    // Parse results
    const balances = data?.[0].result as bigint[] | undefined;

    // Helper to map results back to a clean object
    const investments: Investment[] = [];

    if (balances && address) {
        balances.forEach((bal, index) => {
            if (bal > 0n) {
                // Retrieve the corresponding yield result
                // The `contracts` array had 1 item for batch balance, then N items for yield.
                // So yield result for index i is at data[1 + i]
                const yieldRes = data?.[1 + index];
                const pending = (yieldRes?.result as bigint) || 0n;

                investments.push({
                    assetId: Number(assetIds[index]),
                    balance: bal.toString(),
                    pendingYield: formatUnits(pending, 6), // USDC is 6 decimals
                    symbol: "MUSE", // Generic symbol or could be fetched
                });
            }
        });
    }

    return {
        investments,
        isLoading: isPending,
        refetch,
        hasInvestments: investments.length > 0,
    };
}

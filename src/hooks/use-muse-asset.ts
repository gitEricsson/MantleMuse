
import { useReadContract } from 'wagmi';
import { MUSE_ASSET_ABI, DEPLOYMENTS } from '@/constants/contracts';

export function useMuseAsset() {
    const getUri = (id: bigint) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useReadContract({
            address: DEPLOYMENTS.MuseAsset as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'uri',
            args: [id],
        });
    };

    const getBalance = (account: `0x${string}`, id: bigint) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useReadContract({
            address: DEPLOYMENTS.MuseAsset as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'balanceOf',
            args: [account, id],
        });
    };

    const getAssetDetails = (id: bigint) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useReadContract({
            address: DEPLOYMENTS.MuseAsset as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'assets',
            args: [id],
        });
    };

    const getTotalSupply = (id: bigint) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useReadContract({
            address: DEPLOYMENTS.MuseAsset as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'totalSupply',
            args: [id],
        });
    };

    return { getUri, getBalance, getAssetDetails, getTotalSupply };
}

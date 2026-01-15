
import { cookieStorage, createStorage, http } from 'wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mantleSepoliaTestnet } from 'viem/chains'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b6a6c0f569d68a0'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// 3. Set up the networks
export const networks = [mantleSepoliaTestnet];

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig

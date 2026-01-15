"use client";

import React, { ReactNode } from "react";
// import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "@/context/WalletContext";
import { Toaster } from "@/components/ui/toaster";
import { State, WagmiProvider } from "wagmi";
import { createAppKit } from '@reown/appkit/react'
import { projectId, wagmiAdapter, networks } from "@/config";

// Setup QueryClient
const queryClient = new QueryClient();

// General Metadata
const metadata = {
  name: 'MantleMuse',
  description: 'Invest in fractional ownership of art and music royalties on Mantle Network.',
  url: 'https://mantlemuse.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks as any, // Cast to bypass strict tuple check
  metadata,
  features: {
    analytics: true
  }
})

interface ProvidersProps {
  children: ReactNode;
  initialState?: State;
}

export function Providers({ children, initialState }: ProvidersProps) {
  // SessionProvider removed
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          {children}
          <Toaster />
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

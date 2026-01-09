import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Load from local storage on mount to persist simulated session
  useEffect(() => {
    const saved = localStorage.getItem('mantle_wallet');
    if (saved) {
      setWalletAddress(saved);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = () => {
    // Simulate connection delay
    setTimeout(() => {
      const mockAddress = "0x71C...9A23";
      setWalletAddress(mockAddress);
      setIsConnected(true);
      localStorage.setItem('mantle_wallet', mockAddress);
    }, 800);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    localStorage.removeItem('mantle_wallet');
  };

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Wallet,
  LayoutDashboard,
  Compass,
  Info,
  Shield,
  // LogOut - Removed
} from 'lucide-react';
import clsx from 'clsx';
import { FaucetButton } from './FaucetButton';

export function Navbar() {
  // Auth removed for demo
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();
  const pathname = usePathname();

  const NavLinks = () => (
    <>
      <Link
        href="/explore"
        className={clsx(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/explore' ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Explore
      </Link>
      <Link
        href="/portfolio"
        className={clsx(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/portfolio' ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Portfolio
      </Link>
      <Link
        href="/admin"
        className={clsx(
          'text-sm font-medium transition-colors hover:text-primary flex items-center',
          pathname.startsWith('/admin')
            ? 'text-primary'
            : 'text-muted-foreground'
        )}
      >
        <Shield className="w-4 h-4 mr-1" />
        Admin
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-teal-200 flex items-center justify-center">
            <span className="font-display font-bold text-background text-lg">
              M
            </span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            MantleMuse
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <FaucetButton />

          {isConnected ? (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              onClick={disconnectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletAddress?.slice(0, 6)}...
            </Button>
          ) : (
            <Button
              onClick={connectWallet}
              size="sm"
              variant="outline"
              className="border-white/20"
            >
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-card border-l border-white/10"
          >
            <div className="flex flex-col space-y-6 mt-8">
              <Link
                href="/explore"
                className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary"
              >
                <Compass className="h-5 w-5" /> <span>Explore Assets</span>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary"
              >
                <LayoutDashboard className="h-5 w-5" />{' '}
                <span>My Portfolio</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary"
              >
                <Shield className="h-5 w-5" /> <span>Admin Dashboard</span>
              </Link>
              <Link
                href="/how-it-works"
                className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary"
              >
                <Info className="h-5 w-5" /> <span>How it Works</span>
              </Link>

              <div className="pt-8 border-t border-white/10 space-y-3">
                <div className="border-t border-white/10 pt-3">
                  {isConnected ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      onClick={disconnectWallet}
                    >
                      Disconnect Wallet
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      onClick={connectWallet}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

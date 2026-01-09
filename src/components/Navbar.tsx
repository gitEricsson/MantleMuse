'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Wallet,
  LayoutDashboard,
  Compass,
  Info,
  User,
  LogOut,
  Shield,
} from 'lucide-react';
import clsx from 'clsx';

export function Navbar() {
  const { data: session } = useSession();
  const { isConnected, walletAddress, connectWallet, disconnectWallet } =
    useWallet();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

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
        href="/how-it-works"
        className={clsx(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/how-it-works'
            ? 'text-primary'
            : 'text-muted-foreground'
        )}
      >
        How it Works
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

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent hover:bg-white/5"
                >
                  <User className="mr-2 h-4 w-4" />
                  {session.user.name || 'Account'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-card border-white/10"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {session.user.role === 'admin' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/portfolio" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    My Portfolio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </Link>
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
                href="/how-it-works"
                className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary"
              >
                <Info className="h-5 w-5" /> <span>How it Works</span>
              </Link>

              <div className="pt-8 border-t border-white/10 space-y-3">
                {session ? (
                  <>
                    <div className="px-3 py-2 bg-white/5 rounded-lg">
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                    {session.user.role === 'admin' && (
                      <Link href="/admin">
                        <Button className="w-full" variant="outline">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button className="w-full bg-primary">Sign In</Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="w-full" variant="outline">
                        Create Account
                      </Button>
                    </Link>
                  </>
                )}

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

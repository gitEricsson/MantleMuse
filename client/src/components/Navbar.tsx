import { Link, useLocation } from "wouter";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wallet, LayoutDashboard, Compass, Info } from "lucide-react";
import clsx from "clsx";

export function Navbar() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();
  const [location] = useLocation();

  const NavLinks = () => (
    <>
      <Link href="/explore">
        <a className={clsx("text-sm font-medium transition-colors hover:text-primary", location === "/explore" ? "text-primary" : "text-muted-foreground")}>
          Explore
        </a>
      </Link>
      <Link href="/portfolio">
        <a className={clsx("text-sm font-medium transition-colors hover:text-primary", location === "/portfolio" ? "text-primary" : "text-muted-foreground")}>
          Portfolio
        </a>
      </Link>
      <Link href="/how-it-works">
        <a className={clsx("text-sm font-medium transition-colors hover:text-primary", location === "/how-it-works" ? "text-primary" : "text-muted-foreground")}>
          How it Works
        </a>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-teal-200 flex items-center justify-center">
              <span className="font-display font-bold text-background text-lg">M</span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight">MantleMuse</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        {/* Desktop Wallet Action */}
        <div className="hidden md:flex items-center space-x-4">
          {isConnected ? (
            <Button 
              variant="outline" 
              className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              onClick={disconnectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletAddress}
            </Button>
          ) : (
            <Button onClick={connectWallet} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(45,212,191,0.3)]">
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
          <SheetContent side="right" className="bg-card border-l border-white/10">
            <div className="flex flex-col space-y-6 mt-8">
              <Link href="/explore">
                <a className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary">
                  <Compass className="h-5 w-5" /> <span>Explore Assets</span>
                </a>
              </Link>
              <Link href="/portfolio">
                <a className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary">
                  <LayoutDashboard className="h-5 w-5" /> <span>My Portfolio</span>
                </a>
              </Link>
              <Link href="/how-it-works">
                <a className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary">
                  <Info className="h-5 w-5" /> <span>How it Works</span>
                </a>
              </Link>
              
              <div className="pt-8 border-t border-white/10">
                {isConnected ? (
                  <Button className="w-full" variant="outline" onClick={disconnectWallet}>
                    Disconnect {walletAddress}
                  </Button>
                ) : (
                  <Button className="w-full bg-primary" onClick={connectWallet}>
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

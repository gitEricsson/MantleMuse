import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/context/WalletContext";
import { Navbar } from "@/components/Navbar";

// Pages
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import AssetDetail from "@/pages/AssetDetail";
import Portfolio from "@/pages/Portfolio";
import HowItWorks from "@/pages/HowItWorks";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/assets/:id" component={AssetDetail} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
          <Navbar />
          <main>
            <Router />
          </main>
          <Toaster />
          
          {/* Footer */}
          <footer className="border-t border-white/5 bg-background py-12">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p className="mb-4">© 2024 MantleMuse. All rights reserved.</p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
              </div>
            </div>
          </footer>
        </div>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;

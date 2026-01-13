import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Mantle Muse',
  description:
    'Invest in fractional ownership of art and music royalties on Mantle Network.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            <Navbar />
            <main>{children}</main>
            <Toaster richColors position="top-center" theme="dark" />

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black py-12">
              <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-teal-200 flex items-center justify-center">
                    <span className="font-display font-bold text-background text-lg">
                      M
                    </span>
                  </div>
                  <span className="font-display font-bold text-xl tracking-tight">
                    MantleMuse
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} MantleMuse. All rights reserved.
                </div>
                <div className="flex justify-center space-x-6">
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Support
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

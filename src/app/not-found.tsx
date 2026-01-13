import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center border border-white/10">
          <AlertCircle className="w-10 h-10 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-display font-bold">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Go Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="border-white/20 bg-transparent hover:bg-white/5">
              Browse Assets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

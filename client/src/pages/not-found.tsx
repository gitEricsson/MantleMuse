import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto border border-white/10">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold font-display tracking-tight">404 Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/">
          <Button variant="outline" className="mt-4 border-white/20 hover:bg-white/5">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

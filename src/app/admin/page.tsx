"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  PlusCircle,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalUsers: 0,
    totalInvestments: 0,
    totalVolume: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/");
      return;
    }

    // Fetch admin stats
    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      // For demo, we'll use mock data
      // In production, fetch from API
      setStats({
        totalAssets: 20,
        totalUsers: 150,
        totalInvestments: 450,
        totalVolume: 2500000,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="border-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage assets, users, and platform operations
              </p>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Admin Access
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Assets
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssets}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Listed on platform
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered investors
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Investments
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalInvestments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total positions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Volume
              </CardTitle>
              <DollarSign className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                ${(stats.totalVolume / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All-time investment volume
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="bg-card border border-white/10 p-1">
            <TabsTrigger value="assets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Asset Management
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Operations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/admin/assets/new">
                <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <PlusCircle className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Add New Asset</CardTitle>
                    <CardDescription>
                      List a new art piece or music catalog on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/10">
                      Create Asset
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/assets">
                <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle>Manage Assets</CardTitle>
                    <CardDescription>
                      View, edit, and update existing asset listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/10">
                      View All Assets
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/featured">
                <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <CardTitle>Featured Assets</CardTitle>
                    <CardDescription>
                      Manage homepage featured asset selection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/10">
                      Manage Featured
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/admin/valuations">
                <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <CardTitle>Update Valuations</CardTitle>
                    <CardDescription>
                      Adjust asset valuations and market prices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/10">
                      Update Values
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/payouts">
                <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-yellow-400" />
                    </div>
                    <CardTitle>Distribute Payouts</CardTitle>
                    <CardDescription>
                      Process and distribute investor payouts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/10">
                      Manage Payouts
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/users">
                <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      View and manage platform users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-white/10">
                      View Users
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-blue-500/10 border-white/10">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/admin/assets/new">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Asset
              </Button>
            </Link>
            <Link href="/admin/payouts">
              <Button variant="outline" className="border-white/20">
                <DollarSign className="w-4 h-4 mr-2" />
                Process Payouts
              </Button>
            </Link>
            <Link href="/admin/valuations">
              <Button variant="outline" className="border-white/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Update Valuations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

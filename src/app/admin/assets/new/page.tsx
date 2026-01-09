"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2, Plus, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewAssetPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "art" as "art" | "music",
    imageUrl: "",
    description: "",
    returnType: "growth" as "growth" | "income",
    riskLevel: "medium" as "low" | "medium" | "high",
    minInvestment: "",
    targetReturn: "",
    payoutFrequency: "exit-based",
    totalValue: "",
    pricePerShare: "",
    availableShares: "",
    story: "",
    royaltySource: "",
    isFeatured: false,
  });

  const handleChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create asset");
      }

      const asset = await response.json();

      toast({
        title: "Asset Created",
        description: `${formData.name} has been successfully added to the platform.`,
      });

      router.push("/admin/assets");
    } catch (error) {
      console.error("Error creating asset:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create asset",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="border-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-display font-bold">Add New Asset</h1>
            <p className="text-muted-foreground mt-1">
              Create a new investment opportunity
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-white/10 bg-card">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about the asset
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Asset Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Basquiat: Warrior (1982)"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">Fine Art</SelectItem>
                      <SelectItem value="music">Music Royalties</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returnType">Return Type *</Label>
                  <Select
                    value={formData.returnType}
                    onValueChange={(value) => handleChange("returnType", value)}
                  >
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskLevel">Risk Level *</Label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={(value) => handleChange("riskLevel", value)}
                  >
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={(e) => handleChange("imageUrl", e.target.value)}
                      required
                      className="bg-background/50 border-white/10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="border-white/10"
                      title="Preview image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a direct URL to an image (e.g., from Unsplash, Imgur)
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the asset..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                    rows={3}
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="story">Story / Provenance</Label>
                  <Textarea
                    id="story"
                    placeholder="Background story, provenance, or additional context..."
                    value={formData.story}
                    onChange={(e) => handleChange("story", e.target.value)}
                    rows={3}
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card className="border-white/10 bg-card">
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>
                Investment terms and pricing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalValue">Total Asset Value ($) *</Label>
                  <Input
                    id="totalValue"
                    type="number"
                    placeholder="e.g., 5000000"
                    value={formData.totalValue}
                    onChange={(e) => handleChange("totalValue", e.target.value)}
                    required
                    min="0"
                    step="1000"
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerShare">Price Per Share ($) *</Label>
                  <Input
                    id="pricePerShare"
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.pricePerShare}
                    onChange={(e) =>
                      handleChange("pricePerShare", e.target.value)
                    }
                    required
                    min="0"
                    step="1"
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableShares">Available Shares *</Label>
                  <Input
                    id="availableShares"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.availableShares}
                    onChange={(e) =>
                      handleChange("availableShares", e.target.value)
                    }
                    required
                    min="1"
                    step="1"
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minInvestment">
                    Minimum Investment ($) *
                  </Label>
                  <Input
                    id="minInvestment"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.minInvestment}
                    onChange={(e) =>
                      handleChange("minInvestment", e.target.value)
                    }
                    required
                    min="0"
                    step="50"
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetReturn">Target Return *</Label>
                  <Input
                    id="targetReturn"
                    placeholder="e.g., 10-15%"
                    value={formData.targetReturn}
                    onChange={(e) =>
                      handleChange("targetReturn", e.target.value)
                    }
                    required
                    className="bg-background/50 border-white/10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Expected annual return (e.g., "8-12%")
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                  <Select
                    value={formData.payoutFrequency}
                    onValueChange={(value) =>
                      handleChange("payoutFrequency", value)
                    }
                  >
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="exit-based">Exit-Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          {formData.type === "music" && (
            <Card className="border-white/10 bg-card">
              <CardHeader>
                <CardTitle>Music Royalty Details</CardTitle>
                <CardDescription>
                  Specific information for music assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="royaltySource">Royalty Sources</Label>
                  <Input
                    id="royaltySource"
                    placeholder="e.g., Spotify, Apple Music, BMI"
                    value={formData.royaltySource}
                    onChange={(e) =>
                      handleChange("royaltySource", e.target.value)
                    }
                    className="bg-background/50 border-white/10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of revenue sources
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings */}
          <Card className="border-white/10 bg-card">
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Control how this asset appears on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    handleChange("isFeatured", checked as boolean)
                  }
                />
                <label
                  htmlFor="isFeatured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Feature on homepage
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Featured assets will be displayed prominently on the homepage
              </p>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin">
              <Button
                type="button"
                variant="outline"
                className="border-white/10"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Asset
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

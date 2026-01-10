import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { z } from "zod";

// Force Node.js runtime (required for database connections)
export const runtime = "nodejs";

const createAssetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["art", "music"]),
  imageUrl: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Description is required"),
  returnType: z.enum(["growth", "income"]),
  riskLevel: z.enum(["low", "medium", "high"]),
  minInvestment: z.string(),
  targetReturn: z.string(),
  payoutFrequency: z.string().optional(),
  totalValue: z.string(),
  pricePerShare: z.string(),
  availableShares: z.string().transform((val) => parseInt(val, 10)),
  story: z.string().optional(),
  royaltySource: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validatedData = createAssetSchema.parse(body);

    // Create the asset
    const asset = await storage.createAsset({
      ...validatedData,
      availableShares: validatedData.availableShares,
      isFeatured: validatedData.isFeatured || false,
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 },
      );
    }

    console.error("Error creating asset:", error);
    return NextResponse.json(
      { message: "Failed to create asset" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    // Get all assets for admin view
    const assets = await storage.getAssets();

    return NextResponse.json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { message: "Failed to fetch assets" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Asset ID is required" },
        { status: 400 },
      );
    }

    // Update the asset
    const asset = await storage.updateAsset(id, updates);

    return NextResponse.json(asset);
  } catch (error) {
    console.error("Error updating asset:", error);
    return NextResponse.json(
      { message: "Failed to update asset" },
      { status: 500 },
    );
  }
}

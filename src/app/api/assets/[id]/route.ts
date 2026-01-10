import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

// Force Node.js runtime (required for database connections)
export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid asset ID" },
        { status: 400 },
      );
    }

    const asset = await storage.getAsset(id);

    if (!asset) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error("Error fetching asset:", error);
    return NextResponse.json(
      { message: "Failed to fetch asset" },
      { status: 500 },
    );
  }
}

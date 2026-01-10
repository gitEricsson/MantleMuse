import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { z } from "zod";


const sellSchema = z.object({
  assetId: z.number(),
  shares: z.number().positive().int(),
  walletAddress: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = sellSchema.parse(body);

    // Get user
    const user = await storage.getUserByWallet(input.walletAddress);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get asset
    const asset = await storage.getAsset(input.assetId);
    if (!asset) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    // Get investment
    const investment = await storage.getInvestment(user.id, input.assetId);
    if (!investment || investment.sharesOwned < input.shares) {
      return NextResponse.json(
        { message: "Insufficient shares" },
        { status: 400 },
      );
    }

    // Calculate proceeds
    const proceeds = input.shares * Number(asset.pricePerShare);

    // Create transaction record
    await storage.createTransaction({
      userId: user.id,
      assetId: asset.id,
      type: "sell",
      amount: proceeds.toString(),
      shares: input.shares,
      status: "completed",
    });

    // Update or delete investment
    if (investment.sharesOwned === input.shares) {
      await storage.deleteInvestment(investment.id);
    } else {
      const newShares = investment.sharesOwned - input.shares;
      const costPerShare =
        Number(investment.costBasis) / investment.sharesOwned;
      const newCostBasis = (costPerShare * newShares).toString();
      const newCurrentValue = (
        Number(investment.currentValue) - proceeds
      ).toString();

      await storage.updateInvestment(
        investment.id,
        newShares,
        newCostBasis,
        newCurrentValue,
      );
    }

    return NextResponse.json({
      success: true,
      proceeds: proceeds.toFixed(2),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 },
      );
    }

    console.error("Error processing sale:", error);
    return NextResponse.json(
      { message: "Failed to process sale" },
      { status: 500 },
    );
  }
}

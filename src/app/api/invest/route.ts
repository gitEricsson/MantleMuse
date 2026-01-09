import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { z } from "zod";

const investSchema = z.object({
  assetId: z.number(),
  amount: z.number().positive(),
  walletAddress: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = investSchema.parse(body);

    // Get or create user
    let user = await storage.getUserByWallet(input.walletAddress);
    if (!user) {
      user = await storage.createUser({
        walletAddress: input.walletAddress,
        name: "Anonymous Investor",
      });
    }

    // Get asset
    const asset = await storage.getAsset(input.assetId);
    if (!asset) {
      return NextResponse.json(
        { message: "Asset not found" },
        { status: 404 }
      );
    }

    // Calculate shares to buy
    const sharesToBuy = Math.floor(input.amount / Number(asset.pricePerShare));
    if (sharesToBuy <= 0) {
      return NextResponse.json(
        { message: "Investment amount too low for 1 share" },
        { status: 400 }
      );
    }

    // Create transaction record
    await storage.createTransaction({
      userId: user.id,
      assetId: asset.id,
      type: "buy",
      amount: input.amount.toString(),
      shares: sharesToBuy,
      status: "completed",
    });

    // Update or create investment
    const existingInvestment = await storage.getInvestment(
      user.id,
      asset.id
    );

    let investment;
    if (existingInvestment) {
      const newShares = existingInvestment.sharesOwned + sharesToBuy;
      const newCostBasis = (
        Number(existingInvestment.costBasis) + input.amount
      ).toString();
      const newCurrentValue = (
        Number(existingInvestment.currentValue) + input.amount
      ).toString();

      investment = await storage.updateInvestment(
        existingInvestment.id,
        newShares,
        newCostBasis,
        newCurrentValue
      );
    } else {
      investment = await storage.createInvestment({
        userId: user.id,
        assetId: asset.id,
        sharesOwned: sharesToBuy,
        costBasis: input.amount.toString(),
        currentValue: input.amount.toString(),
        totalEarned: "0",
      });
    }

    return NextResponse.json({
      success: true,
      shares: sharesToBuy,
      investment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error processing investment:", error);
    return NextResponse.json(
      { message: "Failed to process investment" },
      { status: 500 }
    );
  }
}

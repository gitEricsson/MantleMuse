import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { message: "Wallet address is required" },
        { status: 400 },
      );
    }

    // Get or create user
    let user = await storage.getUserByWallet(walletAddress);
    if (!user) {
      user = await storage.createUser({
        walletAddress,
        name: "Anonymous Investor",
      });
    }

    // Get user's investments
    const investments = await storage.getInvestments(user.id);

    // Calculate portfolio totals
    const totalInvested = investments.reduce(
      (sum, inv) => sum + Number(inv.costBasis),
      0,
    );
    const currentValue = investments.reduce(
      (sum, inv) => sum + Number(inv.currentValue),
      0,
    );
    const totalEarned = investments.reduce(
      (sum, inv) => sum + Number(inv.totalEarned),
      0,
    );

    return NextResponse.json({
      totalInvested: totalInvested.toFixed(2),
      currentValue: currentValue.toFixed(2),
      totalEarned: totalEarned.toFixed(2),
      investments,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { message: "Failed to fetch portfolio" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";

export async function POST(request: NextRequest) {
  try {
    // In production, you'd want to add authentication/authorization here
    // to prevent unauthorized database seeding

    await seedDatabase();

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with 20 assets",
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed database",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Use POST method to seed the database",
    endpoint: "/api/seed",
    method: "POST",
  });
}

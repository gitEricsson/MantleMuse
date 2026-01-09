import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || undefined;
    const returnType = searchParams.get('returnType') || undefined;
    const riskLevel = searchParams.get('riskLevel') || undefined;
    const search = searchParams.get('search')?.toLowerCase() || undefined;

    const filters = {
      type: type as 'art' | 'music' | undefined,
      returnType: returnType as 'growth' | 'income' | undefined,
      riskLevel: riskLevel as 'low' | 'medium' | 'high' | undefined,
    };

    let assets = await storage.getAssets(filters);

    // Apply search filter if search term exists
    if (search) {
      assets = assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(search) ||
          asset.description?.toLowerCase().includes(search)
      );
    }

    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { message: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}

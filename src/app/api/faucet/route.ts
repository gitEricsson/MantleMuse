
import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantleSepoliaTestnet } from "viem/chains";
import { DEPLOYMENTS } from "@/constants/contracts";

export async function POST(request: NextRequest) {
    try {
        const { address } = await request.json();

        if (!address) {
            return NextResponse.json({ error: "Address required" }, { status: 400 });
        }

        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) {
            return NextResponse.json({ error: "Server misconfiguration: No Private Key" }, { status: 500 });
        }

        const account = privateKeyToAccount(privateKey as `0x${string}`);

        const client = createWalletClient({
            account,
            chain: mantleSepoliaTestnet,
            transport: http()
        });

        const hash = await client.writeContract({
            address: DEPLOYMENTS.MockUSDC as `0x${string}`,
            abi: parseAbi(["function mint(address to, uint256 amount) external"]),
            functionName: "mint",
            args: [address, 10000n * 1000000n], // 10,000 USDC (6 decimals)
        });

        console.log(`Minted 10k USDC to ${address}. Tx: ${hash}`);

        return NextResponse.json({ success: true, hash });
    } catch (error: any) {
        console.error("Faucet Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to mint" },
            { status: 500 },
        );
    }
}

import { createWalletClient, http, publicActions, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepoliaTestnet } from 'viem/chains';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in .env.local");
}

const CONTRACTS_DIR = path.resolve(__dirname, '../../muse-contract');
const ARTIFACTS_DIR = path.join(CONTRACTS_DIR, 'artifacts/contracts');
const DEPLOYMENTS_FILE = path.join(CONTRACTS_DIR, 'deployments.json');

const getArtifact = (pathName: string) => {
    const p = path.join(ARTIFACTS_DIR, pathName);
    if (!fs.existsSync(p)) {
        throw new Error(`Missing artifact: ${p}`);
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
};

const getDeployments = () => {
    if (!fs.existsSync(DEPLOYMENTS_FILE)) {
        throw new Error("Deployments file not found at " + DEPLOYMENTS_FILE);
    }
    return JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, 'utf8'));
}

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

const client = createWalletClient({
    account,
    chain: mantleSepoliaTestnet,
    transport: http(process.env.MANTLE_SEPOLIA_RPC_URL)
}).extend(publicActions);


// Asset Data
const ASSETS = [
    {
        name: "Basquiat: Warrior (1982)",
        assetType: 0, // Art
        targetReturn: 1500n, // 15%
        initialPrice: parseUnits("100", 6), // $100
        maxSupply: 50000n
    },
    {
        name: "Warhol: Marilyn Monroe (Pink)",
        assetType: 0, // Art
        targetReturn: 1000n, // 10%
        initialPrice: parseUnits("250", 6), // $250
        maxSupply: 10000n
    },
    {
        name: "Picasso: Blue Period Sketch",
        assetType: 0, // Art
        targetReturn: 1250n, // 12.5%
        initialPrice: parseUnits("160", 6), // $160
        maxSupply: 12000n
    },
    {
        name: "Banksy: Love is in the Air",
        assetType: 0, // Art
        targetReturn: 1800n, // 18%
        initialPrice: parseUnits("80", 6), // $80
        maxSupply: 18000n
    },
    {
        name: "Yayoi Kusama: Pumpkin Series",
        assetType: 0, // Art
        targetReturn: 1300n, // 13%
        initialPrice: parseUnits("120", 6), // $120
        maxSupply: 8500n
    }
];

async function main() {
    const deployments = getDeployments();
    const museAssetArtifact = getArtifact('MuseAsset.sol/MuseAsset.json');
    const MUSE_ASSET_ABI = museAssetArtifact.abi;
    const MUSE_ASSET_ADDRESS = deployments.MuseAsset;

    console.log("🌱 Seeding Real Demo Assets to MuseAsset...");
    console.log("Contract:", MUSE_ASSET_ADDRESS);

    for (const [index, asset] of ASSETS.entries()) {
        const id = BigInt(index + 1);

        // Check if exists
        const exists = await client.readContract({
            address: MUSE_ASSET_ADDRESS as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'exists',
            args: [id]
        });

        if (exists) {
            console.log(`Asset ${id} (${asset.name}) already exists.`);
            continue;
        }

        console.log(`Creating Asset ${id}: ${asset.name}...`);

        const hash = await client.writeContract({
            address: MUSE_ASSET_ADDRESS as `0x${string}`,
            abi: MUSE_ASSET_ABI,
            functionName: 'createAsset',
            args: [
                asset.name,
                asset.assetType,
                asset.targetReturn,
                asset.initialPrice,
                asset.maxSupply
            ]
        });

        console.log(`TX Sent: ${hash}`);
        await client.waitForTransactionReceipt({ hash });
        console.log(`✅ Asset ${id} Created!`);
    }

    console.log("🎉 Seeding Complete!");
}

main().catch(console.error);


import { createPublicClient, http, formatUnits } from 'viem';
import { mantleSepoliaTestnet } from 'viem/chains';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTRACTS_DIR = path.resolve(__dirname, '../../muse-contract');
const ARTIFACTS_DIR = path.join(CONTRACTS_DIR, 'artifacts/contracts');
const DEPLOYMENTS_FILE = path.join(CONTRACTS_DIR, 'deployments.json');

const getArtifact = (pathName: string) => {
    return JSON.parse(fs.readFileSync(path.join(ARTIFACTS_DIR, pathName), 'utf8'));
};

const getDeployments = () => {
    return JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, 'utf8'));
}

const client = createPublicClient({
    chain: mantleSepoliaTestnet,
    transport: http("https://mantle-sepolia.drpc.org")
});

async function main() {
    const deployments = getDeployments();
    const museAssetArtifact = getArtifact('MuseAsset.sol/MuseAsset.json');
    const MUSE_ASSET_ABI = museAssetArtifact.abi;
    const MUSE_ASSET_ADDRESS = deployments.MuseAsset;

    console.log("🔍 Verifying Data on Mantle Sepolia Testnet...");
    console.log("Contract:", MUSE_ASSET_ADDRESS);
    console.log("----------------------------------------");

    for (let i = 1; i <= 5; i++) {
        try {
            const data = await client.readContract({
                address: MUSE_ASSET_ADDRESS as `0x${string}`,
                abi: MUSE_ASSET_ABI,
                functionName: 'assets',
                args: [BigInt(i)]
            }) as any;

            // [name, type, return, price, supply, active]
            console.log(`Asset #${i}: ${data[0]}`);
            console.log(`   💰 Price: $${formatUnits(data[3], 6)} USDC`);
            console.log(`   📈 Target Return: ${Number(data[2]) / 100}%`);
            console.log(`   📦 Max Supply: ${data[4]}`);
            console.log(`   ✅ Status: ${data[5] ? 'Active' : 'Inactive'}`);
            console.log("----------------------------------------");
        } catch (e) {
            console.log(`Asset #${i}: Not Found`);
        }
    }
}

main().catch(console.error);

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTRACTS_DIR = path.resolve(__dirname, '../../muse-contract');
const ARTIFACTS_DIR = path.join(CONTRACTS_DIR, 'artifacts/contracts');
const DEPLOYMENTS_FILE = path.join(CONTRACTS_DIR, 'deployments.json');
const TARGET_FILE = path.resolve(__dirname, '../src/constants/contracts.ts');

const getArtifact = (pathName: string) => {
    const p = path.join(ARTIFACTS_DIR, pathName);
    if (!fs.existsSync(p)) {
        console.error(`Missing artifact: ${p}`);
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
};

const main = () => {
    if (!fs.existsSync(DEPLOYMENTS_FILE)) {
        console.error("Deployments file not found at " + DEPLOYMENTS_FILE);
        process.exit(1);
    }

    const deployments = JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, 'utf8'));

    // Read Artifacts
    const museAsset = getArtifact('MuseAsset.sol/MuseAsset.json');
    const museVault = getArtifact('MuseVault.sol/MuseVault.json');
    const museMarket = getArtifact('MuseMarket.sol/MuseMarket.json');
    const mockUSDC = getArtifact('mocks/MockUSDC.sol/MockUSDC.json');

    const content = `
export const DEPLOYMENTS = ${JSON.stringify(deployments, null, 2)} as const;

export const MUSE_ASSET_ABI = ${JSON.stringify(museAsset.abi)} as const;
export const MUSE_VAULT_ABI = ${JSON.stringify(museVault.abi)} as const;
export const MUSE_MARKET_ABI = ${JSON.stringify(museMarket.abi)} as const;
export const MOCK_USDC_ABI = ${JSON.stringify(mockUSDC.abi)} as const;
`;

    fs.writeFileSync(TARGET_FILE, content);
    console.log(`✅ Contracts synced to ${TARGET_FILE}`);
};

main();

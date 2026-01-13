<p align="center">
  <img src="https://raw.githubusercontent.com/mantlenetworkio/brand-kit/main/Mantle%20Logo%20Suite/Mantle%20Logo%20SVG/Mantle_Logo_Primary.svg" alt="MantleMuse Logo" width="180" />
</p>

<h1 align="center">🎨 MantleMuse 🎵</h1>

<p align="center">
  <strong>The RWA Protocol for Cultural Assets on Mantle</strong>
</p>

<p align="center">
  <a href="https://buildathon.mantle.xyz/">
    <img alt="Mantle Global Hackathon 2025" src="https://img.shields.io/badge/Mantle%20Hackathon-2025-00d395?style=for-the-badge&logo=ethereum" />
  </a>
  <img alt="Next.js 14" src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img alt="Mantle Sepolia" src="https://img.shields.io/badge/Network-Mantle%20Sepolia-00d395?style=for-the-badge" />
  <img alt="USDT" src="https://img.shields.io/badge/Token-USDT-26A17B?style=for-the-badge&logo=tether" />
</p>

---

## 🚀 The Problem We're Solving

The $1.7 Trillion alternative asset market—including fine art and music royalties—is one of the most **exclusive and illiquid** asset classes on the planet. Historically, investing in a Basquiat or earning from music streams has been reserved for the ultra-wealthy.

**MantleMuse changes that.**

---

## 💡 Our Solution

MantleMuse is a **Real World Asset (RWA) investment protocol** built on the **Mantle Network**. We fractionalize high-value cultural assets—from blue-chip paintings to top-selling music catalogs—into thousands of liquid, yield-bearing USDT tokens.

> Invest in a masterpiece. Earn from every stream. All powered by Mantle.

---

## 🌟 Why Mantle?

We chose Mantle because it's the **perfect Layer 2 for RWA finance**:

| Feature | Benefit for MantleMuse |
|---------|------------------------|
| **High Performance** | Instant investment confirmations, even at scale. |
| **Low Gas Fees** | Micro-investing is feasible from just 10 USDT. |
| **Ethereum Security** | Every fraction of ownership is secured by ETH. |
| **USDT Liquidity** | Native stablecoin for seamless fiat on/off-ramps. |

---

## ⚡ Key Features

### For Investors
*   **Fractional Ownership**: Own a share of a Picasso or Warhol from just 10 USDT.
*   **Yield Farming for Art**: Stake your fractions and earn rewards.
*   **Real-Time Yield**: See your USDT streaming in as assets generate revenue.
*   **Liquid Exit**: Sell your tokens on-chain anytime via our secondary market (AMM).

### For the Platform (Admin)
*   **On-Chain Asset Creation**: Mint new RWAs via the `MuseAsset` ERC-1155 contract.
*   **Revenue Distribution**: Push USDT to investors instantly via `MuseVault`.
*   **Valuation Updates**: Update asset NAVs in real-time.

---

## 🏛️ Smart Contract Architecture

Our protocol is deployed on **Mantle Sepolia Testnet** and consists of three core contracts:

| Contract | Address | Purpose |
|----------|---------|---------|
| `MuseAsset` | `0x300788c256468ebedd9b60c69e05f9e5bbcc1dd5` | ERC-1155 representing fractional asset ownership. |
| `MuseVault` | `0xc5222a75362a06158e29ad8e39c6722d9a5270ba` | Manages investments and yield distribution. |
| `MuseMarket` | `0x783a47a71d90396e8382534a95a8f88c75577837` | Provides instant buyback (secondary market). |
| `MockUSDT` | `0xa901cab6bd79045caecc0d3f7dcd18934f7c6ef7` | Testnet mock token for demo. |

> [!NOTE]
> All contracts are verified on the [Mantle Sepolia Explorer](https://explorer.sepolia.mantle.xyz/).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| **UI Components** | shadcn/ui, Radix Primitives |
| **Web3** | wagmi, viem, @reown/appkit |
| **Smart Contracts** | Solidity, Hardhat, OpenZeppelin |
| **Data Fetching** | TanStack Query |
| **Styling** | Premium Dark Theme with USDT Branding |

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   pnpm (or npm/yarn)
*   A Mantle Sepolia testnet wallet (MetaMask, WalletConnect)

### Installation

```bash
# Clone the monorepo
git clone https://github.com/your-repo/mantlemuse.git
cd mantlemuse/MantleMuse

# Install dependencies
pnpm install

# Start the dev server
PORT=3008 pnpm dev
```

### Get Testnet USDT
Click the **"Get 10k USDT"** faucet button in the navbar (connects to the demo faucet API).

---

## 🎬 Demo Video

Watch the full product demo here:
[**Watch on YouTube**](#) *(Link to be added after recording)*

---

## 👥 Team

| Name | Role |
|------|------|
| Seun | Full-Stack Developer & Founder |

---

## 🗺️ Roadmap

### Completed for Hackathon ✅
*   [x] Smart contract deployment on Mantle Sepolia
*   [x] On-chain investment & yield claiming
*   [x] Premium UI/UX with USDT branding
*   [x] Admin dashboard for asset management
*   [x] Gasless USDT faucet for demo

### Post-Hackathon 🚀
*   [ ] Deploy to Mantle Mainnet
*   [ ] Integrate real-world asset oracles (Chainlink/Pyth)
*   [ ] Implement KYC/AML compliance layer (via Fractal or Persona)
*   [ ] Launch secondary trading marketplace (AMM)
*   [ ] Partner with galleries and music licensing agencies

---

## 📖 Documentation

*   **[Product Design Doc](docs/product-doc.md)**: Detailed product requirements.
*   **[UI/UX Flow](docs/ui-ux-flow.md)**: User journey and wireframes.
*   **[Demo Video Guide](docs/demo-video-guide.md)**: Script for recording the demo.
*   **[Hackathon Details](docs/mantle-hackathon-detail.md)**: Track-specific submission info.

---

## 📜 License

MIT License © 2025 MantleMuse

---

<p align="center">
  <em>Built with ❤️ for the Mantle Global Hackathon 2025</em>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Mantle-Network-00D1FF?style=for-the-badge&logo=ethereum" alt="Mantle Network" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity" alt="Solidity" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
</p>

<h1 align="center">🎨 MantleMuse</h1>

<p align="center">
  <strong>Fractional Ownership of Art & Music — Powered by Mantle</strong>
</p>

<p align="center">
  Own a piece of a Basquiat. Earn royalties from streaming hits. <br/>
  MantleMuse brings Real World Assets on-chain with institutional-grade compliance.
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-the-problem">The Problem</a> •
  <a href="#-our-solution">Our Solution</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a>
</p>

---

## 🚀 Live Demo

| Resource | Link |
|----------|------|
| 🌐 **Frontend** | [https://mantle-muse-vvq6.vercel.app/](https://mantle-muse-vvq6.vercel.app/) |
| 📜 **MuseVault Contract** | [Mantle Sepolia Explorer](https://explorer.sepolia.mantle.xyz/address/YOUR_CONTRACT) |
| 🎥 **Demo Video** | [Watch on YouTube](#) |

---

## 💡 The Problem

**Alternative assets are the best-performing asset class of the last decade** — yet they remain locked behind six-figure minimums, illiquid holding periods, and exclusive gallery relationships.

| The Reality Today | The Impact |
|-------------------|------------|
| A single Basquiat painting sells for $110M | 99.9% of investors are priced out |
| Music royalty funds require $100K+ minimums | Passive income reserved for the wealthy |
| Art investments lock capital for 7-10 years | No liquidity when you need it |
| Opaque valuations and hidden fees | Investors can't make informed decisions |

The alternative asset market is worth **$1.7 trillion** — and almost none of it is accessible to regular investors.

---

## 🎯 Our Solution

**MantleMuse tokenizes high-value art and music royalties on Mantle Network**, enabling:

✅ **Fractional Ownership** — Buy shares starting from just $10 USDT  
✅ **Real Yield** — Quarterly royalty distributions paid directly to your wallet  
✅ **Instant Liquidity** — Sell your shares anytime through our secondary market  
✅ **AI-Powered Intelligence** — Get instant valuations before you invest  
✅ **True Governance** — Vote on exit strategies as a real stakeholder  

### Why Mantle?

Mantle is the **ideal home for Real World Assets**:

| Mantle Advantage | Why It Matters for RWA |
|------------------|------------------------|
| **Ultra-low gas fees** | Micro-investments become economically viable |
| **Ethereum security** | Institutional-grade asset protection |
| **Native USDT liquidity** | Seamless fiat on/off-ramps for mainstream adoption |
| **mETH integration** | Compound returns with liquid staking yield |
| **High throughput** | Handle thousands of dividend distributions efficiently |

---

## ✨ Features

### For Investors

| Feature | Description |
|---------|-------------|
| 🖼️ **Art Marketplace** | Blue-chip works from Basquiat, Warhol, Kusama, and emerging artists |
| 🎵 **Music Royalties** | Curated catalogs: Afrobeats, Hip-Hop classics, Lo-Fi, Cinematic scores |
| 📊 **Live Valuations** | Dynamic pricing with Pyth Network oracle integration |
| 🤖 **AI Fair Value** | One-click valuation estimates with market comparables |
| 🗳️ **Shareholder Voting** | Participate in governance on exit timing and strategy |
| 💸 **Secondary Market** | Sell shares instantly at current NAV (5% protocol fee) |
| 📱 **KYC Verification** | Institutional-grade compliance for regulatory peace of mind |

### For Platform Operators

| Feature | Description |
|---------|-------------|
| 🎛️ **Admin Dashboard** | Real-time metrics: TVL, investors, trading volume |
| ➕ **Asset Onboarding** | Create and mint new tokenized assets on-chain |
| 💰 **Yield Distribution** | Deposit and distribute royalties to all token holders |
| 🤖 **AI Valuation Assistant** | Get AI-suggested pricing when listing new assets |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  Next.js 15 • TypeScript • Wagmi • Reown AppKit • Framer Motion │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MANTLE NETWORK                              │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        │
│  │   MuseVault   │  │  MuseMarket   │  │   MuseAsset   │        │
│  │   (ERC-1155)  │  │  (Secondary)  │  │   (Registry)  │        │
│  │               │  │               │  │               │        │
│  │ • Mint shares │  │ • Sell shares │  │ • Asset data  │        │
│  │ • Hold assets │  │ • Buyback     │  │ • Ownership   │        │
│  │ • Distribute  │  │ • Pricing     │  │ • Metadata    │        │
│  └───────────────┘  └───────────────┘  └───────────────┘        │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐                           │
│  │   MockUSDT    │  │ Pyth Oracle   │                           │
│  │   (Testnet)   │  │ (Price Feeds) │                           │
│  └───────────────┘  └───────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REAL WORLD ASSETS                             │
│  ┌───────────────────────┐  ┌───────────────────────┐           │
│  │   FINE ART            │  │   MUSIC ROYALTIES     │           │
│  │                       │  │                       │           │
│  │ • Basquiat            │  │ • Afrobeats           │           │
│  │ • Warhol              │  │ • Hip-Hop Classics    │           │
│  │ • Kusama              │  │ • Lo-Fi Beats         │           │
│  │ • Emerging Artists    │  │ • Cinematic Scores    │           │
│  │                       │  │                       │           │
│  │ Custody: Geneva       │  │ Rights: Delaware SPV  │           │
│  │ Freeport              │  │                       │           │
│  └───────────────────────┘  └───────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** — React framework with App Router
- **TypeScript** — Type-safe development
- **Wagmi v2** — React hooks for Ethereum
- **Reown AppKit** — Wallet connection (WalletConnect v2)
- **Framer Motion** — Smooth animations
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Premium UI components

### Smart Contracts
- **Solidity 0.8.20** — Contract development
- **Foundry** — Testing and deployment
- **ERC-1155** — Multi-token standard for asset shares
- **OpenZeppelin** — Battle-tested contract libraries

### Integrations
- **Pyth Network** — Real-time price oracles
- **Mantle Sepolia** — L2 testnet deployment

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/gitEricsson/MantleMuse
cd mantlemuse/MantleMuse
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
PRIVATE_KEY=your_deployer_private_key
```

> Get a free Project ID from [Reown Cloud](https://cloud.reown.com)

### 4. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` 🎉

---

## 📜 Smart Contract Deployment

### Deploy to Mantle Sepolia

```bash
cd ../muse-contract

# Install Foundry dependencies
forge install

# Deploy contracts
forge script script/Deploy.s.sol --rpc-url https://rpc.sepolia.mantle.xyz --broadcast
```

### Contract Addresses (Mantle Sepolia)

| Contract | Address |
|----------|---------|
| MuseVault | [`0xc5222a75362a06158e29ad8e39c6722d9a5270ba`](https://explorer.sepolia.mantle.xyz/address/0xc5222a75362a06158e29ad8e39c6722d9a5270ba) |
| MuseMarket | [`0x783a47a71d90396e8382534a95a8f88c75577837`](https://explorer.sepolia.mantle.xyz/address/0x783a47a71d90396e8382534a95a8f88c75577837) |
| MuseAsset | [`0x300788c256468ebedd9b60c69e05f9e5bbcc1dd5`](https://explorer.sepolia.mantle.xyz/address/0x300788c256468ebedd9b60c69e05f9e5bbcc1dd5) |
| MockUSDT | [`0xa901cab6bd79045caecc0d3f7dcd18934f7c6ef7`](https://explorer.sepolia.mantle.xyz/address/0xa901cab6bd79045caecc0d3f7dcd18934f7c6ef7) |

---

## 🧪 Testing the App

### Get Testnet Tokens

1. Connect your wallet on the app
2. Click **"Get 10k USDT"** button (gasless faucet)
3. USDT will be minted directly to your wallet

### Investment Flow

1. Go to **Explore** → Select an asset
2. Enter investment amount → Click **Invest Now**
3. Approve USDT → Confirm transaction
4. View your holdings in **Portfolio**

### Sell Your Shares

1. Go to **Portfolio**
2. Click **Sell** on any holding
3. Enter shares to sell → See instant payout
4. Confirm transaction

---

## 📁 Project Structure

```
MantleMuse/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── explore/            # Asset marketplace
│   │   ├── assets/[id]/        # Asset detail pages
│   │   ├── portfolio/          # User holdings
│   │   ├── kyc/                # KYC verification
│   │   ├── legal/              # Compliance pages
│   │   ├── tools/              # AI valuation tools
│   │   └── admin/              # Admin dashboard
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── AssetCard.tsx       # Asset display cards
│   │   ├── AIFairValueCard.tsx # AI valuation widget
│   │   ├── ProposalCard.tsx    # Governance voting
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-invest.ts       # Investment logic
│   │   ├── use-sell.ts         # Secondary market
│   │   ├── use-oracle.ts       # Pyth integration
│   │   └── ...
│   ├── constants/              # Contract ABIs & addresses
│   └── lib/                    # Utilities
└── muse-contract/              # Foundry project
    ├── contracts/              # Solidity contracts
    ├── script/                 # Deployment scripts
    └── test/                   # Contract tests
```

---

## 🔒 Security & Compliance

### Asset Custody
- **Fine Art**: Stored in regulated freeport facilities (Geneva, Luxembourg)
- **Music Rights**: Held in Delaware SPV structures
- **Insurance**: Lloyd's of London coverage on all physical assets

### On-Chain Security
- OpenZeppelin contract standards
- Role-based access control for admin functions
- Reentrancy guards on all financial operations

### Regulatory Compliance
- KYC/AML verification for all investors
- SEC Reg D compliant offering structure
- Annual third-party audits planned

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Core marketplace with art & music assets
- [x] Investment and secondary market functionality
- [x] KYC verification flow
- [x] Governance voting for shareholders

### Phase 2: Intelligence ✅
- [x] AI Fair Value estimation
- [x] Pyth oracle integration
- [x] Market pulse indicators
- [x] Dynamic valuation badges

### Phase 3: Mantle Native ✅
- [x] Why Mantle benefits section
- [x] mETH staking integration (UI ready)
- [x] Ultra-low gas optimizations

### Phase 4: Expansion 🔜
- [ ] Mobile-responsive PWA
- [ ] Multi-chain expansion (Base, Arbitrum)
- [ ] Institutional API access
- [ ] Real music catalog partnerships

---

## 👥 Team

Built with ❤️ for the **Mantle Hackathon**

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>MantleMuse</strong> — Democratizing access to the world's most valuable alternative assets.
</p>

<p align="center">
  <a href="#-live-demo">🌐 Try the Demo</a> •
  <a href="https://mantle.xyz">💜 Powered by Mantle</a>
</p>
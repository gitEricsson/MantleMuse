import {
  type Asset,
  type InsertAsset,
  type User,
  type InsertUser,
  type Investment,
  type InsertInvestment,
  type Transaction,
  type InsertTransaction,
} from "@/drizzle/schema";

export type {
  Asset,
  InsertAsset,
  User,
  InsertUser,
  Investment,
  InsertInvestment,
  Transaction,
  InsertTransaction,
};

export interface IStorage {
  // Assets
  getAssets(filters?: {
    type?: string;
    returnType?: string;
    riskLevel?: string;
  }): Promise<Asset[]>;
  getAsset(id: number): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: number, updates: Partial<InsertAsset>): Promise<Asset>;

  // Users
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createUserWithPassword(
    email: string,
    password: string,
    name: string,
    role?: string,
  ): Promise<User>;

  // Portfolio
  getInvestments(userId: number): Promise<(Investment & { asset: Asset })[]>;
  getInvestment(
    userId: number,
    assetId: number,
  ): Promise<Investment | undefined>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(
    id: number,
    shares: number,
    costBasis: string,
    currentValue: string,
    amount: number
  ): Promise<Investment>;
  deleteInvestment(id: number): Promise<void>;

  // Transactions
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
}


export const INITIAL_ASSETS: Asset[] = [
  {
    id: 1,
    name: "Basquiat: Warrior (1982)",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
    description: "A seminal work from Jean-Michel Basquiat's most coveted year. 'Warrior' represents a powerful symbol of overcoming oppression and features his signature neo-expressionist style.",
    returnType: "growth",
    riskLevel: "medium",
    minInvestment: "100", // Matches Contract
    targetReturn: "15%",    // Matches Contract
    payoutFrequency: "exit-based",
    totalValue: "12000000",
    pricePerShare: "100",
    availableShares: 50000,
    story: "Acquired from a private collection in Geneva. Authenticated by the Basquiat estate with full provenance documentation.",
    isFeatured: true,
    createdAt: new Date(),
    royaltySource: null,
    lastPayoutAmount: null,
    valuationChange: "12.5"
  },
  {
    id: 2,
    name: "Warhol: Marilyn Monroe (Pink)",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    description: "Iconic screen print of Marilyn Monroe from Andy Warhol's most celebrated series. One of the most recognizable images in 20th-century art.",
    returnType: "growth",
    riskLevel: "low",
    minInvestment: "250", // Matches Contract
    targetReturn: "10%",  // Matches Contract
    payoutFrequency: "exit-based",
    totalValue: "4500000",
    pricePerShare: "250",
    availableShares: 10000,
    story: "Excellent provenance. Previous ownership includes prominent NY gallery. Recent appraisal increased valuation by 15%.",
    isFeatured: true,
    createdAt: new Date(),
    royaltySource: null,
    lastPayoutAmount: null,
    valuationChange: "8.2"
  },
  {
    id: 3,
    name: "Picasso: Blue Period Sketch",
    type: "art",
    imageUrl: "https://picsum.photos/seed/guitar/800/600",
    description: "Rare sketch from Pablo Picasso's Blue Period (1901-1904). Features characteristic melancholic themes and monochromatic palette.",
    returnType: "growth",
    riskLevel: "low",
    minInvestment: "160", // Matches Contract
    targetReturn: "12.5%", // Matches Contract
    payoutFrequency: "exit-based",
    totalValue: "3200000",
    pricePerShare: "160",
    availableShares: 12000,
    story: "Recently discovered in a private European collection. Authenticated by Picasso estate experts.",
    createdAt: new Date(),
    isFeatured: false,
    royaltySource: null,
    lastPayoutAmount: null,
    valuationChange: "5.0"
  },
  {
    id: 4,
    name: "Banksy: Love is in the Air",
    type: "art",
    imageUrl: "https://picsum.photos/seed/streetart/800/600",
    description: "Banksy's iconic stencil work featuring a masked protestor throwing flowers instead of a molotov cocktail. Powerful commentary on peace and protest.",
    returnType: "growth",
    riskLevel: "medium",
    minInvestment: "80", // Matches Contract
    targetReturn: "18%", // Matches Contract
    payoutFrequency: "exit-based",
    totalValue: "2800000",
    pricePerShare: "80",
    availableShares: 18000,
    story: "Original street installation documented and authenticated. Banksy's work continues to appreciate rapidly.",
    createdAt: new Date(),
    isFeatured: false,
    royaltySource: null,
    lastPayoutAmount: null,
    valuationChange: "22.5"
  },
  {
    id: 5,
    name: "Yayoi Kusama: Pumpkin Series",
    type: "art",
    imageUrl: "https://picsum.photos/seed/pumpkin/800/600",
    description: "Vibrant polka-dotted pumpkin sculpture from Japan's most celebrated contemporary artist. Part of her iconic infinity series.",
    returnType: "growth",
    riskLevel: "medium",
    minInvestment: "120", // Matches Contract
    targetReturn: "13%", // Matches Contract
    payoutFrequency: "exit-based",
    totalValue: "1800000",
    pricePerShare: "120",
    availableShares: 8500,
    story: "Direct from Kusama's Tokyo studio. Exhibited at major museums worldwide. Strong collector demand.",
    createdAt: new Date(),
    isFeatured: false,
    royaltySource: null,
    lastPayoutAmount: null,
    valuationChange: "15.0"
  }
];

export class MemStorage implements IStorage {
  private assets: Asset[] = INITIAL_ASSETS;
  private users: User[] = [
    {
      id: 1,
      email: "admin@mantlemuse.com",
      password: "admin", // Special bypass in auth.ts
      name: "Admin User",
      role: "admin",
      walletAddress: "0x0000000000000000000000000000000000000000",
      createdAt: new Date()
    }
  ];
  private investments: Investment[] = [];
  private transactions: Transaction[] = [];

  async getAssets(filters?: { type?: string; returnType?: string; riskLevel?: string }): Promise<Asset[]> {
    return this.assets.filter(asset => {
      if (filters?.type && asset.type !== filters.type) return false;
      if (filters?.returnType && asset.returnType !== filters.returnType) return false;
      if (filters?.riskLevel && asset.riskLevel !== filters.riskLevel) return false;
      return true;
    });
  }

  async getAsset(id: number): Promise<Asset | undefined> {
    return this.assets.find(a => a.id === id);
  }

  async createAsset(asset: InsertAsset): Promise<Asset> {
    const newAsset = { ...asset, id: this.assets.length + 1, createdAt: new Date() } as Asset;
    this.assets.push(newAsset);
    return newAsset;
  }

  async updateAsset(id: number, updates: Partial<InsertAsset>): Promise<Asset> {
    const index = this.assets.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Asset not found");
    this.assets[index] = { ...this.assets[index], ...updates };
    return this.assets[index];
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    return this.users.find(u => u.walletAddress === walletAddress);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = { ...user, id: this.users.length + 1, createdAt: new Date() } as User;
    this.users.push(newUser);
    return newUser;
  }

  async createUserWithPassword(email: string, password: string, name: string, role?: string): Promise<User> {
    // Mock password hashing or just store it for mvp
    const newUser = {
      id: this.users.length + 1,
      email,
      password,
      name,
      role: role || 'user',
      createdAt: new Date()
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  async getInvestments(userId: number): Promise<(Investment & { asset: Asset })[]> {
    return this.investments
      .filter(i => i.userId === userId)
      .map(i => {
        const asset = this.assets.find(a => a.id === i.assetId);
        if (!asset) throw new Error("Asset missing locally");
        return { ...i, asset };
      });
  }

  async getInvestment(userId: number, assetId: number): Promise<Investment | undefined> {
    return this.investments.find(i => i.userId === userId && i.assetId === assetId);
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const newInv = { ...investment, id: this.investments.length + 1, createdAt: new Date() } as Investment;
    this.investments.push(newInv);
    return newInv;
  }

  async updateInvestment(id: number, shares: number, costBasis: string, currentValue: string, amount: number): Promise<Investment> {
    const index = this.investments.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Investment not found");
    // @ts-ignore
    this.investments[index] = { ...this.investments[index], sharesOwned: shares, costBasis, currentValue, amountInvested: amount.toString() };
    return this.investments[index];
  }

  async deleteInvestment(id: number): Promise<void> {
    this.investments = this.investments.filter(i => i.id !== id);
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const newTx = { ...transaction, id: this.transactions.length + 1, createdAt: new Date() } as Transaction;
    this.transactions.push(newTx);
    return newTx;
  }
}

export const storage = new MemStorage();

import { pgTable, text, serial, integer, boolean, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export * from "./models/auth";

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'art' | 'music'
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  
  // Financial Data
  returnType: text("return_type").notNull(), // 'growth' | 'income'
  riskLevel: text("risk_level").notNull(), // 'low' | 'medium' | 'high'
  minInvestment: numeric("min_investment").notNull(),
  targetReturn: text("target_return").notNull(), // e.g. "8-12%"
  payoutFrequency: text("payout_frequency"), // 'monthly' | 'quarterly' | 'exit-based'
  
  // Valuation & Shares
  totalValue: numeric("total_value").notNull(),
  pricePerShare: numeric("price_per_share").notNull(),
  availableShares: integer("available_shares").notNull(),
  
  // Details
  story: text("story"),
  royaltySource: text("royalty_source"), // For music
  
  // Admin simulation fields
  lastPayoutAmount: numeric("last_payout_amount"),
  valuationChange: numeric("valuation_change"), // percentage
  
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // In a real app, this would reference users.id
  assetId: integer("asset_id").notNull(), // References assets.id
  sharesOwned: integer("shares_owned").notNull(),
  costBasis: numeric("cost_basis").notNull(),
  currentValue: numeric("current_value").notNull(), // Simulated current value
  totalEarned: numeric("total_earned").default('0'),
  lastPayoutDate: timestamp("last_payout_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  assetId: integer("asset_id").notNull(),
  type: text("type").notNull(), // 'buy' | 'sell' | 'payout'
  amount: numeric("amount").notNull(),
  shares: integer("shares"),
  status: text("status").notNull().default('completed'), // 'pending' | 'completed' | 'failed'
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertAssetSchema = createInsertSchema(assets).omit({ id: true, createdAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertInvestmentSchema = createInsertSchema(investments).omit({ id: true, createdAt: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });

// === TYPES ===

export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

// === API TYPES ===

export type AssetResponse = Asset;
export type AssetsListResponse = Asset[];

export type PortfolioResponse = {
  totalInvested: string;
  currentValue: string;
  totalEarned: string;
  investments: (Investment & { asset: Asset })[];
};

export type InvestRequest = {
  assetId: number;
  amount: number;
  walletAddress: string;
};

export type SellRequest = {
  assetId: number;
  shares: number;
  walletAddress: string;
};

export type ConnectWalletRequest = {
  walletAddress: string;
};

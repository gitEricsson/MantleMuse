import { db } from "./db";
import {
  assets, users, investments, transactions,
  type Asset, type InsertAsset,
  type User, type InsertUser,
  type Investment, type InsertInvestment,
  type Transaction, type InsertTransaction
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Assets
  getAssets(filters?: { type?: string, returnType?: string, riskLevel?: string }): Promise<Asset[]>;
  getAsset(id: number): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  
  // Users
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio
  getInvestments(userId: number): Promise<(Investment & { asset: Asset })[]>;
  getInvestment(userId: number, assetId: number): Promise<Investment | undefined>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: number, shares: number, costBasis: string, currentValue: string): Promise<Investment>;
  deleteInvestment(id: number): Promise<void>;
  
  // Transactions
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
}

export class DatabaseStorage implements IStorage {
  async getAssets(filters?: { type?: string, returnType?: string, riskLevel?: string }): Promise<Asset[]> {
    let query = db.select().from(assets);
    
    // Simple in-memory filtering for now as Drizzle query builder with dynamic where clauses is verbose
    // But since we are building MVP, fetching all and filtering is acceptable for small dataset
    const allAssets = await query;
    
    return allAssets.filter(asset => {
      if (filters?.type && asset.type !== filters.type) return false;
      if (filters?.returnType && asset.returnType !== filters.returnType) return false;
      if (filters?.riskLevel && asset.riskLevel !== filters.riskLevel) return false;
      return true;
    });
  }

  async getAsset(id: number): Promise<Asset | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    return asset;
  }

  async createAsset(asset: InsertAsset): Promise<Asset> {
    const [newAsset] = await db.insert(assets).values(asset).returning();
    return newAsset;
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getInvestments(userId: number): Promise<(Investment & { asset: Asset })[]> {
    const results = await db.select()
      .from(investments)
      .innerJoin(assets, eq(investments.assetId, assets.id))
      .where(eq(investments.userId, userId));
      
    return results.map(r => ({ ...r.investments, asset: r.assets }));
  }

  async getInvestment(userId: number, assetId: number): Promise<Investment | undefined> {
    const [investment] = await db.select()
      .from(investments)
      .where(and(
        eq(investments.userId, userId),
        eq(investments.assetId, assetId)
      ));
    return investment;
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db.insert(investments).values(investment).returning();
    return newInvestment;
  }

  async updateInvestment(id: number, shares: number, costBasis: string, currentValue: string): Promise<Investment> {
    const [updated] = await db.update(investments)
      .set({ 
        sharesOwned: shares,
        costBasis,
        currentValue
      })
      .where(eq(investments.id, id))
      .returning();
    return updated;
  }
  
  async deleteInvestment(id: number): Promise<void> {
    await db.delete(investments).where(eq(investments.id, id));
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db.insert(transactions).values(transaction).returning();
    return newTransaction;
  }
}

export const storage = new DatabaseStorage();

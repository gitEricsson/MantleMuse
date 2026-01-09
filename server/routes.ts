import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === Assets ===
  app.get(api.assets.list.path, async (req, res) => {
    const filters = {
      type: req.query.type as string,
      returnType: req.query.returnType as string,
      riskLevel: req.query.riskLevel as string,
    };
    const assets = await storage.getAssets(filters);
    res.json(assets);
  });

  app.get(api.assets.get.path, async (req, res) => {
    const asset = await storage.getAsset(Number(req.params.id));
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.json(asset);
  });

  // === Portfolio ===
  app.get(api.portfolio.get.path, async (req, res) => {
    const walletAddress = req.query.walletAddress as string;
    if (!walletAddress) {
      return res.status(400).json({ message: "Wallet address required" });
    }

    let user = await storage.getUserByWallet(walletAddress);
    if (!user) {
      // Create user on fly if doesn't exist (Simulated wallet connection)
      user = await storage.createUser({ walletAddress, name: 'Anonymous Investor' });
    }

    const investments = await storage.getInvestments(user.id);
    
    // Calculate totals
    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.costBasis), 0);
    const currentValue = investments.reduce((sum, inv) => sum + Number(inv.currentValue), 0);
    const totalEarned = investments.reduce((sum, inv) => sum + Number(inv.totalEarned), 0);

    res.json({
      totalInvested: totalInvested.toFixed(2),
      currentValue: currentValue.toFixed(2),
      totalEarned: totalEarned.toFixed(2),
      investments
    });
  });

  // === Transactions ===
  app.post(api.transactions.invest.path, async (req, res) => {
    try {
      const input = api.transactions.invest.input.parse(req.body);
      
      // Get User
      let user = await storage.getUserByWallet(input.walletAddress);
      if (!user) {
        user = await storage.createUser({ walletAddress: input.walletAddress, name: 'Anonymous Investor' });
      }

      // Get Asset
      const asset = await storage.getAsset(input.assetId);
      if (!asset) return res.status(404).json({ message: "Asset not found" });

      // Calculate Shares
      const sharesToBuy = Math.floor(input.amount / Number(asset.pricePerShare));
      if (sharesToBuy <= 0) return res.status(400).json({ message: "Investment amount too low for 1 share" });

      // Create Transaction
      await storage.createTransaction({
        userId: user.id,
        assetId: asset.id,
        type: 'buy',
        amount: input.amount.toString(),
        shares: sharesToBuy,
        status: 'completed'
      });

      // Update/Create Investment
      const existingInvestment = await storage.getInvestment(user.id, asset.id);
      
      if (existingInvestment) {
        const newShares = existingInvestment.sharesOwned + sharesToBuy;
        const newCostBasis = (Number(existingInvestment.costBasis) + input.amount).toString();
        const newCurrentValue = (Number(existingInvestment.currentValue) + input.amount).toString(); // Simplified
        
        await storage.updateInvestment(existingInvestment.id, newShares, newCostBasis, newCurrentValue);
      } else {
        await storage.createInvestment({
          userId: user.id,
          assetId: asset.id,
          sharesOwned: sharesToBuy,
          costBasis: input.amount.toString(),
          currentValue: input.amount.toString(), // Start at cost
          totalEarned: '0'
        });
      }

      res.json({
        success: true,
        shares: sharesToBuy,
        newBalance: '0' // Mock balance not tracked
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.transactions.sell.path, async (req, res) => {
    try {
      const input = api.transactions.sell.input.parse(req.body);
      
       // Get User
      const user = await storage.getUserByWallet(input.walletAddress);
      if (!user) return res.status(404).json({ message: "User not found" });

      const asset = await storage.getAsset(input.assetId);
      if (!asset) return res.status(404).json({ message: "Asset not found" });

      const investment = await storage.getInvestment(user.id, input.assetId);
      if (!investment || investment.sharesOwned < input.shares) {
        return res.status(400).json({ message: "Insufficient shares" });
      }

      const proceeds = input.shares * Number(asset.pricePerShare);

       // Create Transaction
       await storage.createTransaction({
        userId: user.id,
        assetId: asset.id,
        type: 'sell',
        amount: proceeds.toString(),
        shares: input.shares,
        status: 'completed'
      });

      if (investment.sharesOwned === input.shares) {
        await storage.deleteInvestment(investment.id);
      } else {
        const newShares = investment.sharesOwned - input.shares;
        const costPerShare = Number(investment.costBasis) / investment.sharesOwned;
        const newCostBasis = (costPerShare * newShares).toString();
        const newCurrentValue = (Number(investment.currentValue) - proceeds).toString(); // Simplified

        await storage.updateInvestment(investment.id, newShares, newCostBasis, newCurrentValue);
      }

      res.json({
        success: true,
        proceeds: proceeds.toFixed(2)
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Seed Data
  await seed();

  return httpServer;
}

async function seed() {
  const existingAssets = await storage.getAssets();
  if (existingAssets.length > 0) return;

  console.log("Seeding Assets...");

  await storage.createAsset({
    name: "Basquiat: Warrior (1982)",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000",
    description: "A seminal work from Jean-Michel Basquiat's most coveted year. 'Warrior' represents a powerful symbol of overcoming oppression.",
    returnType: "growth",
    riskLevel: "medium",
    minInvestment: "500",
    targetReturn: "12-18%",
    payoutFrequency: "exit-based",
    totalValue: "12000000",
    pricePerShare: "100",
    availableShares: 50000,
    story: "Acquired from a private collection in Geneva. Authenticated by the Basquiat estate.",
  });

  await storage.createAsset({
    name: "Royalties: 'Summer Haze' Catalog",
    type: "music",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
    description: "A collection of 3 platinum-certified pop hits from 2018-2020. Consistent streaming revenue from global markets.",
    returnType: "income",
    riskLevel: "low",
    minInvestment: "100",
    targetReturn: "7-9%",
    payoutFrequency: "quarterly",
    totalValue: "850000",
    pricePerShare: "50",
    availableShares: 8500,
    royaltySource: "Spotify, Apple Music, BMI",
    story: "Rights holder is liquidating portion of catalog for capital injection into new studio.",
  });

  await storage.createAsset({
    name: "Warhol: Marilyn (Pink)",
    type: "art",
    imageUrl: "https://images.unsplash.com/photo-1578321272128-181b5d1e263a?auto=format&fit=crop&q=80&w=1000",
    description: "Iconic screen print of Marilyn Monroe. One of the most recognizable images in 20th-century art.",
    returnType: "growth",
    riskLevel: "low",
    minInvestment: "1000",
    targetReturn: "8-12%",
    payoutFrequency: "exit-based",
    totalValue: "4500000",
    pricePerShare: "250",
    availableShares: 10000,
    story: "Excellent provenance. Previous ownership includes prominent NY gallery.",
  });
  
  await storage.createAsset({
    name: "Future Bass Anthology",
    type: "music",
    imageUrl: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=1000",
    description: "High-energy electronic catalog with strong sync licensing history in sports and gaming.",
    returnType: "income",
    riskLevel: "medium",
    minInvestment: "250",
    targetReturn: "9-14%",
    payoutFrequency: "monthly",
    totalValue: "320000",
    pricePerShare: "25",
    availableShares: 6400,
    royaltySource: "Sync Licensing (ESPN, EA Sports), Streaming",
    story: "Niche but high-yield catalog with consistent performance in Q4.",
  });
}

import { z } from "zod";
import type {
  Asset,
  User,
  Investment,
  Transaction,
  InvestRequest,
  SellRequest,
  PortfolioResponse,
  InvestResponse,
  SellResponse,
} from "@/drizzle/schema";

// API Response Types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export type AssetsResponse = Asset[];
export type AssetResponse = Asset;

// Re-export schema types for convenience
export type {
  Asset,
  User,
  Investment,
  Transaction,
  InvestRequest,
  SellRequest,
  PortfolioResponse,
  InvestResponse,
  SellResponse,
};

// API Endpoints
export const API_ROUTES = {
  assets: {
    list: "/api/assets",
    get: (id: number) => `/api/assets/${id}`,
  },
  portfolio: "/api/portfolio",
  invest: "/api/invest",
  sell: "/api/sell",
  seed: "/api/seed",
} as const;

// Query Keys for React Query
export const QUERY_KEYS = {
  assets: ["assets"],
  asset: (id: number) => ["asset", id],
  portfolio: (walletAddress: string) => ["portfolio", walletAddress],
} as const;

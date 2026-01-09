import { z } from 'zod';
import { insertAssetSchema, assets, investments, transactions } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  assets: {
    list: {
      method: 'GET' as const,
      path: '/api/assets',
      input: z.object({
        type: z.enum(['art', 'music']).optional(),
        returnType: z.enum(['growth', 'income']).optional(),
        riskLevel: z.enum(['low', 'medium', 'high']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof assets.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/assets/:id',
      responses: {
        200: z.custom<typeof assets.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  portfolio: {
    get: {
      method: 'GET' as const,
      path: '/api/portfolio', // Query param: ?walletAddress=...
      input: z.object({
        walletAddress: z.string(),
      }),
      responses: {
        200: z.object({
          totalInvested: z.string(),
          currentValue: z.string(),
          totalEarned: z.string(),
          investments: z.array(z.custom<typeof investments.$inferSelect & { asset: typeof assets.$inferSelect }>()),
        }),
      },
    },
  },
  transactions: {
    invest: {
      method: 'POST' as const,
      path: '/api/invest',
      input: z.object({
        assetId: z.number(),
        amount: z.number(),
        walletAddress: z.string(),
      }),
      responses: {
        200: z.object({
          success: z.boolean(),
          shares: z.number(),
          newBalance: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
    sell: {
      method: 'POST' as const,
      path: '/api/sell',
      input: z.object({
        assetId: z.number(),
        shares: z.number(),
        walletAddress: z.string(),
      }),
      responses: {
        200: z.object({
          success: z.boolean(),
          proceeds: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

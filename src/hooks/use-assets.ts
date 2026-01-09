import { useQuery } from '@tanstack/react-query';
import { API_ROUTES, QUERY_KEYS, type Asset } from '@/types/api';

export function useAssets(filters?: {
  type?: 'art' | 'music';
  returnType?: 'growth' | 'income';
  riskLevel?: 'low' | 'medium' | 'high';
  search?: string;
}) {
  const url = filters
    ? `${API_ROUTES.assets.list}?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== undefined)
        )
      )}`
    : API_ROUTES.assets.list;
  return useQuery<Asset[]>({
    queryKey: [...QUERY_KEYS.assets, filters],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch assets');
      return res.json();
    },
  });
}

export function useAsset(id: number) {
  return useQuery<Asset | null>({
    queryKey: QUERY_KEYS.asset(id),
    queryFn: async () => {
      const res = await fetch(API_ROUTES.assets.get(id));
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch asset');
      return res.json();
    },
    enabled: !!id,
  });
}

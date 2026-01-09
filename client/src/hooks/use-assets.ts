import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useAssets(filters?: { type?: 'art' | 'music'; returnType?: 'growth' | 'income'; riskLevel?: 'low' | 'medium' | 'high' }) {
  const url = filters 
    ? `${api.assets.list.path}?${new URLSearchParams(filters as any).toString()}`
    : api.assets.list.path;

  return useQuery({
    queryKey: [api.assets.list.path, filters],
    queryFn: async () => {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch assets");
      return api.assets.list.responses[200].parse(await res.json());
    },
  });
}

export function useAsset(id: number) {
  return useQuery({
    queryKey: [api.assets.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.assets.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch asset");
      return api.assets.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

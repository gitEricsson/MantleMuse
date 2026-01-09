import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePortfolio(walletAddress: string | null) {
  return useQuery({
    queryKey: [api.portfolio.get.path, walletAddress],
    queryFn: async () => {
      if (!walletAddress) return null;
      const url = `${api.portfolio.get.path}?walletAddress=${walletAddress}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return api.portfolio.get.responses[200].parse(await res.json());
    },
    enabled: !!walletAddress,
  });
}

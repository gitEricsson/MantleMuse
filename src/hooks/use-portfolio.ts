import { useQuery } from "@tanstack/react-query";
import { API_ROUTES, QUERY_KEYS, type PortfolioResponse } from "@/types/api";

export function usePortfolio(walletAddress: string | null) {
  return useQuery<PortfolioResponse | null>({
    queryKey: QUERY_KEYS.portfolio(walletAddress || ""),
    queryFn: async () => {
      if (!walletAddress) return null;
      const url = `${API_ROUTES.portfolio}?walletAddress=${walletAddress}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch portfolio");
      return res.json();
    },
    enabled: !!walletAddress,
  });
}

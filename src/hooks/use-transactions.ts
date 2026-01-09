import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  API_ROUTES,
  QUERY_KEYS,
  type InvestRequest,
  type SellRequest,
  type InvestResponse,
  type SellResponse,
} from "@/types/api";
import { useToast } from "@/hooks/use-toast";

export function useInvest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<InvestResponse, Error, InvestRequest>({
    mutationFn: async (data: InvestRequest) => {
      const res = await fetch(API_ROUTES.invest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Investment failed");
      }
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.portfolio(variables.walletAddress),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.asset(variables.assetId),
      });
      toast({
        title: "Investment Successful",
        description: `You are now a fractional owner! Purchased ${data.shares} shares.`,
      });
    },
    onError: (err) => {
      toast({
        title: "Investment Failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });
}

export function useSell() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<SellResponse, Error, SellRequest>({
    mutationFn: async (data: SellRequest) => {
      const res = await fetch(API_ROUTES.sell, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Sale failed");
      }
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.portfolio(variables.walletAddress),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.asset(variables.assetId),
      });
      toast({
        title: "Sale Successful",
        description: `Shares sold for $${data.proceeds}. Funds returned to your wallet.`,
      });
    },
    onError: (err) => {
      toast({
        title: "Sale Failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });
}

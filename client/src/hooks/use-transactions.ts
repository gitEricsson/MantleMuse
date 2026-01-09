import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useInvest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { assetId: number; amount: number; walletAddress: string }) => {
      const validated = api.transactions.invest.input.parse(data);
      const res = await fetch(api.transactions.invest.path, {
        method: api.transactions.invest.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Investment failed");
      }
      return api.transactions.invest.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.portfolio.get.path] });
      toast({
        title: "Investment Successful",
        description: "You are now a fractional owner!",
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

  return useMutation({
    mutationFn: async (data: { assetId: number; shares: number; walletAddress: string }) => {
      const validated = api.transactions.sell.input.parse(data);
      const res = await fetch(api.transactions.sell.path, {
        method: api.transactions.sell.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Sale failed");
      }
      return api.transactions.sell.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.portfolio.get.path] });
      toast({
        title: "Sale Successful",
        description: "Funds have been returned to your wallet.",
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

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useWallet = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .maybeSingle();
    setBalance(Number(data?.balance || 0));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const updateBalance = async (amount: number) => {
    if (!user) return false;
    const newBalance = balance + amount;
    if (newBalance < 0) return false;
    const { error } = await supabase
      .from("wallets")
      .update({ balance: newBalance })
      .eq("user_id", user.id);
    if (error) return false;
    setBalance(newBalance);
    return true;
  };

  return { balance, loading, fetchBalance, updateBalance };
};

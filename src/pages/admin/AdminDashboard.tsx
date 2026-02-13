import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wallet, TrendingUp, TrendingDown, DollarSign, Gamepad2, AlertCircle, CheckCircle } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  totalBalance: number;
  activeToday: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
    totalBalance: 0,
    activeToday: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, walletsRes, depositsRes, withdrawalsRes, pendingRes, recentRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("wallets").select("balance"),
        supabase.from("transactions").select("amount").eq("type", "deposit").eq("status", "completed"),
        supabase.from("transactions").select("amount").eq("type", "withdrawal").eq("status", "completed"),
        supabase.from("transactions").select("id", { count: "exact", head: true }).eq("type", "withdrawal").eq("status", "pending"),
        supabase.from("transactions").select("*").order("created_at", { ascending: false }).limit(10),
      ]);

      const totalBalance = walletsRes.data?.reduce((sum, w) => sum + Number(w.balance), 0) || 0;
      const totalDeposits = depositsRes.data?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
      const totalWithdrawals = withdrawalsRes.data?.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0) || 0;

      setStats({
        totalUsers: profilesRes.count || 0,
        totalDeposits,
        totalWithdrawals,
        pendingWithdrawals: pendingRes.count || 0,
        totalBalance,
        activeToday: 0,
      });
      setRecentTransactions(recentRes.data || []);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-neon-green" },
    { label: "Total Deposits", value: `৳${stats.totalDeposits.toLocaleString()}`, icon: TrendingUp, color: "text-neon-green" },
    { label: "Total Withdrawals", value: `৳${stats.totalWithdrawals.toLocaleString()}`, icon: TrendingDown, color: "text-neon-pink" },
    { label: "Pending Withdrawals", value: stats.pendingWithdrawals, icon: AlertCircle, color: "text-accent" },
    { label: "Total Balance (Users)", value: `৳${stats.totalBalance.toLocaleString()}`, icon: Wallet, color: "text-neon-purple" },
    { label: "Revenue", value: `৳${(stats.totalDeposits - stats.totalWithdrawals).toLocaleString()}`, icon: DollarSign, color: "text-neon-gold" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold font-display">{loading ? "..." : stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No transactions yet.</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    {tx.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-neon-green" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-accent" />
                    )}
                    <div>
                      <p className="text-sm font-medium capitalize">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${tx.type === "deposit" || tx.type === "win" ? "text-neon-green" : "text-neon-pink"}`}>
                      {tx.type === "deposit" || tx.type === "win" ? "+" : "-"}৳{Math.abs(Number(tx.amount)).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

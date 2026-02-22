import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, TrendingDown, DollarSign, Wallet, AlertCircle, CheckCircle, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stats {
  totalUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  totalBalance: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
    totalBalance: 0,
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
      });
      setRecentTransactions(recentRes.data || []);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const revenue = stats.totalDeposits - stats.totalWithdrawals;

  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      trend: "+12%",
      trendUp: true,
      gradient: "from-[hsl(185,80%,40%)] to-[hsl(185,60%,55%)]",
      iconBg: "bg-[hsl(185,80%,40%/0.15)]",
      iconColor: "text-[hsl(185,80%,50%)]",
    },
    {
      label: "Total Deposits",
      value: `৳${stats.totalDeposits.toLocaleString()}`,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      gradient: "from-[hsl(160,100%,35%)] to-[hsl(160,80%,50%)]",
      iconBg: "bg-[hsl(160,100%,45%/0.15)]",
      iconColor: "text-[hsl(160,100%,45%)]",
    },
    {
      label: "Total Withdrawals",
      value: `৳${stats.totalWithdrawals.toLocaleString()}`,
      icon: TrendingDown,
      trend: "-3.1%",
      trendUp: false,
      gradient: "from-[hsl(345,85%,45%)] to-[hsl(345,65%,60%)]",
      iconBg: "bg-[hsl(345,85%,50%/0.15)]",
      iconColor: "text-[hsl(345,85%,50%)]",
    },
    {
      label: "Pending",
      value: stats.pendingWithdrawals,
      icon: AlertCircle,
      trend: "",
      trendUp: false,
      gradient: "from-[hsl(40,100%,50%)] to-[hsl(45,100%,60%)]",
      iconBg: "bg-[hsl(40,100%,55%/0.15)]",
      iconColor: "text-[hsl(40,100%,55%)]",
    },
    {
      label: "User Balances",
      value: `৳${stats.totalBalance.toLocaleString()}`,
      icon: Wallet,
      trend: "+5.4%",
      trendUp: true,
      gradient: "from-[hsl(270,80%,50%)] to-[hsl(270,60%,65%)]",
      iconBg: "bg-[hsl(270,80%,55%/0.15)]",
      iconColor: "text-[hsl(270,80%,55%)]",
    },
    {
      label: "Net Revenue",
      value: `৳${revenue.toLocaleString()}`,
      icon: DollarSign,
      trend: revenue >= 0 ? "+revenue" : "loss",
      trendUp: revenue >= 0,
      gradient: "from-[hsl(40,100%,45%)] to-[hsl(50,100%,55%)]",
      iconBg: "bg-[hsl(40,100%,55%/0.15)]",
      iconColor: "text-[hsl(40,100%,55%)]",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed": return { icon: CheckCircle, color: "text-[hsl(160,100%,45%)]", bg: "bg-[hsl(160,100%,45%/0.1)]", label: "Completed" };
      case "pending": return { icon: Clock, color: "text-[hsl(40,100%,55%)]", bg: "bg-[hsl(40,100%,55%/0.1)]", label: "Pending" };
      default: return { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: status };
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group overflow-hidden relative">
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity bg-gradient-to-br", stat.gradient)} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold font-display text-foreground">
                    {loading ? (
                      <span className="inline-block h-7 w-24 bg-muted/50 rounded animate-pulse" />
                    ) : stat.value}
                  </p>
                  {stat.trend && !loading && (
                    <div className={cn(
                      "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
                      stat.trendUp ? "text-[hsl(160,100%,45%)] bg-[hsl(160,100%,45%/0.1)]" : "text-[hsl(345,85%,50%)] bg-[hsl(345,85%,50%/0.1)]"
                    )}>
                      {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.trend}
                    </div>
                  )}
                </div>
                <div className={cn("p-2.5 rounded-xl", stat.iconBg)}>
                  <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base">Recent Transactions</CardTitle>
            <span className="text-xs text-muted-foreground">{recentTransactions.length} latest</span>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {recentTransactions.length === 0 && !loading ? (
            <p className="text-muted-foreground text-sm px-6 py-8 text-center">No transactions yet.</p>
          ) : loading ? (
            <div className="space-y-3 px-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-20 bg-muted/50 rounded animate-pulse" />
                      <div className="h-3 w-28 bg-muted/30 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-muted/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {recentTransactions.map((tx) => {
                const statusCfg = getStatusConfig(tx.status);
                const isPositive = tx.type === "deposit" || tx.type === "win";
                return (
                  <div key={tx.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", statusCfg.bg)}>
                        <statusCfg.icon className={cn("h-4 w-4", statusCfg.color)} />
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize text-foreground">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className={cn(
                        "text-sm font-semibold tabular-nums",
                        isPositive ? "text-[hsl(160,100%,45%)]" : "text-[hsl(345,85%,50%)]"
                      )}>
                        {isPositive ? "+" : "-"}৳{Math.abs(Number(tx.amount)).toLocaleString()}
                      </span>
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full capitalize", statusCfg.bg, statusCfg.color)}>
                        {statusCfg.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

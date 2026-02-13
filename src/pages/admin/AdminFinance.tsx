import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const AdminFinance = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState<any[]>([]);
  const [recentDeposits, setRecentDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [withdrawals, deposits] = await Promise.all([
      supabase
        .from("transactions")
        .select("*")
        .eq("type", "withdrawal")
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
      supabase
        .from("transactions")
        .select("*")
        .eq("type", "deposit")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    setPendingWithdrawals(withdrawals.data || []);
    setRecentDeposits(deposits.data || []);
    setLoading(false);
  };

  const handleWithdrawal = async (id: string, action: "completed" | "cancelled") => {
    const { error } = await supabase
      .from("transactions")
      .update({ status: action })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update withdrawal");
      return;
    }
    toast.success(`Withdrawal ${action}`);
    fetchData();
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-neon-green" />;
      case "pending": return <Clock className="h-4 w-4 text-accent" />;
      case "cancelled": case "failed": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-display text-2xl font-bold">Financial Management</h1>

      <Tabs defaultValue="withdrawals">
        <TabsList className="bg-muted">
          <TabsTrigger value="withdrawals" className="gap-2">
            Pending Withdrawals
            {pendingWithdrawals.length > 0 && (
              <Badge variant="destructive" className="text-[10px] px-1.5">{pendingWithdrawals.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="deposits">Recent Deposits</TabsTrigger>
        </TabsList>

        <TabsContent value="withdrawals">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg">Pending Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground animate-pulse">Loading...</p>
              ) : pendingWithdrawals.length === 0 ? (
                <p className="text-muted-foreground text-sm">No pending withdrawals.</p>
              ) : (
                <div className="space-y-3">
                  {pendingWithdrawals.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">৳{Math.abs(Number(tx.amount)).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.payment_method || "N/A"} • {new Date(tx.created_at).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">User: {tx.user_id.slice(0, 8)}...</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleWithdrawal(tx.id, "completed")}
                          className="bg-neon-green/20 text-neon-green hover:bg-neon-green/30"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleWithdrawal(tx.id, "cancelled")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposits">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg">Recent Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              {recentDeposits.length === 0 ? (
                <p className="text-muted-foreground text-sm">No deposits yet.</p>
              ) : (
                <div className="space-y-2">
                  {recentDeposits.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        {statusIcon(tx.status)}
                        <div>
                          <p className="text-sm font-medium">৳{Number(tx.amount).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{tx.payment_method || "N/A"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="capitalize text-xs">{tx.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFinance;

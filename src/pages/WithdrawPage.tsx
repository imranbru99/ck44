import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowUpCircle, Plus, Trash2, Wallet, Loader2, AlertTriangle } from "lucide-react";

interface PaymentAccount {
  id: string;
  method_name: string;
  account_number: string;
  account_holder: string | null;
  is_default: boolean;
}

const WALLET_METHODS = ["bKash", "Nagad", "Rocket", "USDT (TRC20)", "USDT (BEP20)", "Bank Transfer"];
const WITHDRAW_AMOUNTS = [100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 15000, 20000, 25000];

const WithdrawPage = () => {
  const { language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const bn = language === "bn";

  const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
  const [balance, setBalance] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState<PaymentAccount | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Add wallet form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethod, setNewMethod] = useState("");
  const [newAccount, setNewAccount] = useState("");
  const [newHolder, setNewHolder] = useState("");
  const [addingSaving, setAddingSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [accts, wallet] = await Promise.all([
        supabase.from("user_payment_accounts").select("*").order("created_at", { ascending: true }),
        supabase.from("wallets").select("balance").eq("user_id", user.id).maybeSingle(),
      ]);
      setAccounts((accts.data as PaymentAccount[]) || []);
      setBalance(Number(wallet.data?.balance || 0));
      setLoadingData(false);
    };
    fetchData();
  }, [user]);

  const handleAddAccount = async () => {
    if (!newMethod || !newAccount.trim()) {
      toast.error(bn ? "পদ্ধতি এবং অ্যাকাউন্ট নম্বর দিন" : "Method and account number required");
      return;
    }
    if (!user) return;
    setAddingSaving(true);
    const { error } = await supabase.from("user_payment_accounts").insert({
      user_id: user.id,
      method_name: newMethod,
      account_number: newAccount.trim(),
      account_holder: newHolder.trim() || null,
      is_default: accounts.length === 0,
    });
    setAddingSaving(false);
    if (error) { toast.error("Failed to add"); return; }
    toast.success(bn ? "ওয়ালেট যোগ হয়েছে" : "Wallet added");
    setNewMethod(""); setNewAccount(""); setNewHolder(""); setShowAddForm(false);
    // Refresh
    const { data } = await supabase.from("user_payment_accounts").select("*").order("created_at", { ascending: true });
    setAccounts((data as PaymentAccount[]) || []);
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm(bn ? "এই ওয়ালেট মুছবেন?" : "Delete this wallet?")) return;
    await supabase.from("user_payment_accounts").delete().eq("id", id);
    if (selectedAccount?.id === id) setSelectedAccount(null);
    const { data } = await supabase.from("user_payment_accounts").select("*").order("created_at", { ascending: true });
    setAccounts((data as PaymentAccount[]) || []);
    toast.success(bn ? "মুছে ফেলা হয়েছে" : "Deleted");
  };

  const finalAmount = amount || Number(customAmount);

  const handleSubmit = async () => {
    if (!finalAmount || finalAmount < 100) {
      toast.error(bn ? "সর্বনিম্ন উত্তোলন ৳১০০" : "Minimum withdrawal is ৳100");
      return;
    }
    if (finalAmount > balance) {
      toast.error(bn ? "অপর্যাপ্ত ব্যালেন্স" : "Insufficient balance");
      return;
    }
    if (!selectedAccount || !user) return;

    setSubmitting(true);
    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      type: "withdrawal",
      amount: -finalAmount,
      payment_method: selectedAccount.method_name,
      reference_id: selectedAccount.account_number,
      status: "pending",
      notes: `To: ${selectedAccount.method_name} - ${selectedAccount.account_number}${selectedAccount.account_holder ? ` (${selectedAccount.account_holder})` : ""}`,
    });
    setSubmitting(false);

    if (error) {
      toast.error(bn ? "উত্তোলন ব্যর্থ" : "Withdrawal request failed");
      return;
    }
    toast.success(bn ? "উত্তোলন অনুরোধ পাঠানো হয়েছে!" : "Withdrawal request submitted!");
    setAmount(""); setCustomAmount(""); setSelectedAccount(null);
  };

  if (authLoading) return null;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-black text-secondary neon-text-gold mb-6 flex items-center gap-2">
        <ArrowUpCircle className="h-7 w-7" />
        {bn ? "উত্তোলন" : "Withdraw"}
      </h1>

      {/* Balance */}
      <Card className="mb-4 border-secondary/30 bg-gradient-to-br from-card to-primary/10">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">{bn ? "ব্যালেন্স" : "Balance"}</p>
              <p className="font-display text-2xl font-black text-secondary">৳{balance.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {loadingData ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-secondary" /></div>
      ) : (
        <>
          {/* Saved wallets */}
          <Card className="mb-4 border-border">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm">{bn ? "আপনার ওয়ালেট" : "Your Wallets"}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setShowAddForm(!showAddForm)} className="gap-1">
                <Plus className="h-4 w-4" /> {bn ? "যোগ করুন" : "Add"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {accounts.length === 0 && !showAddForm && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {bn ? "প্রথমে একটি ওয়ালেট যোগ করুন" : "Add a wallet first to withdraw"}
                  </p>
                  <Button size="sm" onClick={() => setShowAddForm(true)} className="gap-1 bg-secondary text-secondary-foreground">
                    <Plus className="h-4 w-4" /> {bn ? "ওয়ালেট যোগ করুন" : "Add Wallet"}
                  </Button>
                </div>
              )}

              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAccount?.id === acc.id ? "border-secondary bg-secondary/10" : "border-border hover:border-secondary/50"
                  }`}
                  onClick={() => setSelectedAccount(acc)}
                >
                  <div>
                    <p className="font-medium text-sm">{acc.method_name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{acc.account_number}</p>
                    {acc.account_holder && <p className="text-xs text-muted-foreground">{acc.account_holder}</p>}
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={(e) => { e.stopPropagation(); handleDeleteAccount(acc.id); }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Add form */}
              {showAddForm && (
                <div className="border border-dashed border-secondary/40 rounded-lg p-3 space-y-3 mt-2">
                  <Select value={newMethod} onValueChange={setNewMethod}>
                    <SelectTrigger><SelectValue placeholder={bn ? "পদ্ধতি নির্বাচন করুন" : "Select method"} /></SelectTrigger>
                    <SelectContent>
                      {WALLET_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder={bn ? "অ্যাকাউন্ট নম্বর" : "Account number"} value={newAccount} onChange={(e) => setNewAccount(e.target.value)} />
                  <Input placeholder={bn ? "অ্যাকাউন্ট হোল্ডার (ঐচ্ছিক)" : "Account holder (optional)"} value={newHolder} onChange={(e) => setNewHolder(e.target.value)} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddAccount} disabled={addingSaving} className="bg-secondary text-secondary-foreground">
                      {addingSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                      {bn ? "সংরক্ষণ" : "Save"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>{bn ? "বাতিল" : "Cancel"}</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Amount + Submit — only if wallet selected */}
          {selectedAccount && (
            <>
              <Card className="mb-4 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{bn ? "উত্তোলনের পরিমাণ:" : "Withdraw Amount:"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {WITHDRAW_AMOUNTS.map((a) => (
                      <Button
                        key={a}
                        variant={amount === a ? "default" : "outline"}
                        size="sm"
                        className={`min-w-[70px] ${amount === a ? "bg-secondary text-secondary-foreground" : ""}`}
                        onClick={() => { setAmount(a); setCustomAmount(""); }}
                      >
                        {a.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder={bn ? "কাস্টম পরিমাণ" : "Custom amount"}
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                    className="bg-card"
                  />
                  <p className="text-xs text-muted-foreground">
                    {bn ? "সর্বনিম্ন উত্তোলন: ৳১০০" : "Minimum withdrawal: ৳100"}
                  </p>
                </CardContent>
              </Card>

              {finalAmount >= 100 && (
                <Card className="border-border">
                  <CardContent className="p-4 space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{bn ? "ওয়ালেট" : "Wallet"}</span>
                        <span className="font-medium">{selectedAccount.method_name} - {selectedAccount.account_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{bn ? "পরিমাণ" : "Amount"}</span>
                        <span className="font-bold text-secondary">৳{Number(finalAmount).toLocaleString()}</span>
                      </div>
                    </div>

                    {finalAmount > balance && (
                      <div className="flex items-center gap-2 text-destructive text-xs">
                        <AlertTriangle className="h-4 w-4" />
                        {bn ? "অপর্যাপ্ত ব্যালেন্স" : "Insufficient balance"}
                      </div>
                    )}

                    <Button
                      className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
                      disabled={submitting || finalAmount > balance || !finalAmount}
                      onClick={handleSubmit}
                    >
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {bn ? "উত্তোলন অনুরোধ করুন" : "Submit Withdrawal Request"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WithdrawPage;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Check, ArrowDownCircle, AlertTriangle, Loader2 } from "lucide-react";

interface DepositMethod {
  id: string;
  name: string;
  account_number: string;
  instructions: string | null;
  icon_label: string | null;
}

const AMOUNTS = [100, 200, 300, 400, 500, 1000, 3000, 5000, 10000, 15000, 20000, 25000];

const DepositPage = () => {
  const { language } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const bn = language === "bn";

  const [methods, setMethods] = useState<DepositMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [trxId, setTrxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"method" | "amount" | "confirm">("method");
  const [loadingMethods, setLoadingMethods] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("deposit_methods")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      setMethods((data as DepositMethod[]) || []);
      setLoadingMethods(false);
      if (data && data.length === 1) {
        setSelectedMethod(data[0] as DepositMethod);
        setStep("amount");
      }
    };
    fetch();
  }, []);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(bn ? "কপি হয়েছে" : "Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTrxId(text);
      toast.success(bn ? "পেস্ট হয়েছে" : "Pasted!");
    } catch {
      toast.error(bn ? "পেস্ট করা যায়নি" : "Could not paste");
    }
  };

  const finalAmount = amount || Number(customAmount);

  const handleSubmit = async () => {
    if (!finalAmount || finalAmount < 100 || finalAmount > 25000) {
      toast.error(bn ? "পরিমাণ ১০০ - ২৫,০০০ এর মধ্যে হতে হবে" : "Amount must be between 100 - 25,000");
      return;
    }
    if (!trxId.trim()) {
      toast.error(bn ? "Trx ID দিন" : "Please enter Trx ID");
      return;
    }
    if (!selectedMethod || !user) return;

    setSubmitting(true);
    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      type: "deposit",
      amount: finalAmount,
      payment_method: selectedMethod.name,
      reference_id: trxId.trim(),
      status: "pending",
      notes: `Method: ${selectedMethod.name} | Account: ${selectedMethod.account_number}`,
    });
    setSubmitting(false);

    if (error) {
      toast.error(bn ? "জমা ব্যর্থ হয়েছে" : "Deposit request failed");
      return;
    }
    toast.success(bn ? "জমা অনুরোধ পাঠানো হয়েছে!" : "Deposit request submitted!");
    setAmount("");
    setCustomAmount("");
    setTrxId("");
    setStep("method");
    setSelectedMethod(null);
  };

  if (authLoading) return null;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-black text-secondary neon-text-gold mb-6 flex items-center gap-2">
        <ArrowDownCircle className="h-7 w-7" />
        {bn ? "জমা করুন" : "Deposit"}
      </h1>

      {/* Step 1: Select Method */}
      {loadingMethods ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-secondary" /></div>
      ) : methods.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-8 text-center text-muted-foreground">
            {bn ? "কোনো জমা পদ্ধতি পাওয়া যায়নি" : "No deposit methods available"}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Method selector */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {methods.map((m) => (
              <Button
                key={m.id}
                variant={selectedMethod?.id === m.id ? "default" : "outline"}
                className={`gap-2 ${selectedMethod?.id === m.id ? "bg-secondary text-secondary-foreground" : ""}`}
                onClick={() => { setSelectedMethod(m); setStep("amount"); }}
              >
                {m.icon_label || m.name}
              </Button>
            ))}
          </div>

          {selectedMethod && step !== "method" && (
            <>
              {/* Account info + warning */}
              <Card className="mb-4 border-secondary/30 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{selectedMethod.name}</p>
                      <p className="font-mono font-bold text-lg">{selectedMethod.account_number}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 border-secondary/50"
                      onClick={() => handleCopy(selectedMethod.account_number)}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "কপি" : "Copy")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-destructive">
                  {bn
                    ? "অনুগ্রহ করে আপনার ডিপোজিট করার পরে অবশ্যই আপনার Trx-ID সাবমিট করবেন। তাহলে খুব দ্রুত আপনার একাউন্টের মধ্যে টাকা যোগ হয়ে যাবে।"
                    : "NOTE: After making your deposit, please submit your Trx-ID. Your balance will be updated quickly."}
                </p>
              </div>

              {selectedMethod.instructions && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-accent">{selectedMethod.instructions}</p>
                </div>
              )}

              {/* Amount selection */}
              <Card className="mb-4 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{bn ? "জমার পরিমাণ:" : "Deposit Amount:"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {AMOUNTS.map((a) => (
                      <Button
                        key={a}
                        variant={amount === a ? "default" : "outline"}
                        size="sm"
                        className={`min-w-[70px] ${amount === a ? "bg-secondary text-secondary-foreground" : ""}`}
                        onClick={() => { setAmount(a); setCustomAmount(""); setStep("confirm"); }}
                      >
                        {a.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder={bn ? "জমার পরিমাণ" : "Custom amount"}
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); if (e.target.value) setStep("confirm"); }}
                    className="bg-card"
                  />
                  <p className="text-xs text-muted-foreground">
                    {bn ? "জমা সীমা: ৳ ১০০ - ৳ ২৫,০০০" : "Deposit limit: ৳100 - ৳25,000"}
                  </p>
                </CardContent>
              </Card>

              {/* TRX ID + Submit */}
              {(amount || customAmount) && (
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{bn ? "Trx ID দিন:" : "Enter Trx ID:"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder={bn ? "আপনার Trx ID পেস্ট করুন" : "Paste your Trx ID"}
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="bg-card flex-1"
                      />
                      <Button variant="outline" size="sm" onClick={handlePaste} className="shrink-0">
                        {bn ? "পেস্ট" : "Paste"}
                      </Button>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{bn ? "পদ্ধতি" : "Method"}</span>
                        <span className="font-medium">{selectedMethod.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{bn ? "পরিমাণ" : "Amount"}</span>
                        <span className="font-bold text-secondary">৳{Number(finalAmount).toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
                      disabled={submitting || !trxId.trim()}
                      onClick={handleSubmit}
                    >
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {bn ? "জমা জন্য আবেদন করুন" : "Submit Deposit Request"}
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

export default DepositPage;

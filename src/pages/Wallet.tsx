import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet as WalletIcon, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Wallet = () => {
  const { language } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-black text-secondary neon-text-gold mb-6">
        {language === "bn" ? "ওয়ালেট" : "Wallet"}
      </h1>

      <Card className="mb-6 border-secondary/30 bg-gradient-to-br from-card to-primary/10">
        <CardContent className="p-6 text-center">
          <WalletIcon className="h-10 w-10 text-secondary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-1">{language === "bn" ? "ব্যালেন্স" : "Balance"}</p>
          <p className="font-display text-3xl font-black text-secondary neon-text-gold">৳ 0.00</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ArrowDownCircle className="h-4 w-4 text-green-500" />
              {language === "bn" ? "জমা" : "Deposit"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder={language === "bn" ? "পরিমাণ" : "Amount"} type="number" className="bg-card" />
            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
              onClick={() => navigate("/deposit")}
            >
              {language === "bn" ? "জমা করুন" : "Deposit"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ArrowUpCircle className="h-4 w-4 text-destructive" />
              {language === "bn" ? "উত্তোলন" : "Withdraw"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder={language === "bn" ? "পরিমাণ" : "Amount"} type="number" className="bg-card" />
            <Button
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive/10 font-bold"
              onClick={() => navigate("/withdraw")}
            >
              {language === "bn" ? "উত্তোলন করুন" : "Withdraw"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm">{language === "bn" ? "লেনদেনের ইতিহাস" : "Transaction History"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            {language === "bn" ? "কোনো লেনদেন পাওয়া যায়নি" : "No transactions yet"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;

import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";

const AccountRecordPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setTransactions(data || []));
  }, [user]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <ClipboardList className="h-5 w-5" />
        {language === "bn" ? "অ্যাকাউন্ট রেকর্ড" : "Account Record"}
      </h1>
      {transactions.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {language === "bn" ? "কোনো লেনদেন পাওয়া যায়নি" : "No transactions found"}
          </p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-muted-foreground">{language === "bn" ? "তারিখ" : "Date"}</th>
                <th className="text-left p-3 text-muted-foreground">{language === "bn" ? "ধরন" : "Type"}</th>
                <th className="text-right p-3 text-muted-foreground">{language === "bn" ? "পরিমাণ" : "Amount"}</th>
                <th className="text-right p-3 text-muted-foreground">{language === "bn" ? "স্থিতি" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-border">
                  <td className="p-3 text-foreground/80">{new Date(tx.created_at).toLocaleDateString()}</td>
                  <td className="p-3 capitalize text-foreground">{tx.type}</td>
                  <td className="p-3 text-right font-mono text-foreground">৳{Math.abs(tx.amount)}</td>
                  <td className="p-3 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      tx.status === "completed" ? "bg-green-500/20 text-green-400" :
                      tx.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountRecordPage;

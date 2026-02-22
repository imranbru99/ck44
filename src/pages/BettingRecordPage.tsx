import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { FileText } from "lucide-react";

const BettingRecordPage = () => {
  const { language } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5" />
        {language === "bn" ? "বেটিং রেকর্ড" : "Betting Record"}
      </h1>
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          {language === "bn" ? "কোনো বেটিং রেকর্ড পাওয়া যায়নি" : "No betting records found"}
        </p>
      </div>
    </div>
  );
};

export default BettingRecordPage;

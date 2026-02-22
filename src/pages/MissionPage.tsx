import { useLanguage } from "@/i18n/LanguageContext";
import { Target } from "lucide-react";

const MissionPage = () => {
  const { language } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <Target className="h-5 w-5" />
        {language === "bn" ? "মিশন" : "Mission"}
      </h1>
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          {language === "bn" ? "কোনো মিশন উপলব্ধ নেই" : "No missions available yet"}
        </p>
      </div>
    </div>
  );
};

export default MissionPage;

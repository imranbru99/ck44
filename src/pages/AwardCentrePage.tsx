import { useLanguage } from "@/i18n/LanguageContext";
import { Award } from "lucide-react";

const AwardCentrePage = () => {
  const { language } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <Award className="h-5 w-5" />
        {language === "bn" ? "পুরস্কার কেন্দ্র" : "Award Centre"}
      </h1>
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          {language === "bn" ? "কোনো পুরস্কার উপলব্ধ নেই" : "No awards available yet"}
        </p>
      </div>
    </div>
  );
};

export default AwardCentrePage;

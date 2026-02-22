import { useLanguage } from "@/i18n/LanguageContext";
import { Mail } from "lucide-react";

const MessagePage = () => {
  const { language } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5" />
        {language === "bn" ? "অভ্যন্তরীণ বার্তা" : "Private Messages"}
      </h1>
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          {language === "bn" ? "কোনো বার্তা নেই" : "No messages yet"}
        </p>
      </div>
    </div>
  );
};

export default MessagePage;

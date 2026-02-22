import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Users, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const InviteFriendPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const referralLink = `${window.location.origin}/register?ref=${user?.id?.slice(0, 8) || ""}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: language === "bn" ? "কপি হয়েছে!" : "Copied!" });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        {language === "bn" ? "বন্ধুদের আমন্ত্রণ করুন" : "Invite Friends"}
      </h1>
      <div className="bg-card rounded-xl border border-border p-6">
        <p className="text-foreground/80 mb-4">
          {language === "bn"
            ? "আপনার রেফারেল লিঙ্ক শেয়ার করুন এবং বোনাস পান!"
            : "Share your referral link and earn bonuses!"}
        </p>
        <div className="flex gap-2 items-center">
          <input
            readOnly
            value={referralLink}
            className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
          />
          <Button onClick={copyLink} size="sm" className="bg-secondary text-secondary-foreground">
            <Copy className="h-4 w-4 mr-1" /> {language === "bn" ? "কপি" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendPage;

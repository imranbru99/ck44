import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Star, Gift, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  { level: 1, name: "Bronze", nameBn: "ব্রোঞ্জ", icon: Star, bonus: "5%", requirement: "৳10,000+" },
  { level: 2, name: "Silver", nameBn: "সিলভার", icon: Star, bonus: "10%", requirement: "৳50,000+" },
  { level: 3, name: "Gold", nameBn: "গোল্ড", icon: Crown, bonus: "15%", requirement: "৳200,000+" },
  { level: 4, name: "Platinum", nameBn: "প্লাটিনাম", icon: Crown, bonus: "20%", requirement: "৳500,000+" },
  { level: 5, name: "Diamond", nameBn: "ডায়মন্ড", icon: Crown, bonus: "30%", requirement: "৳1,000,000+" },
];

const VipPage = () => {
  const { language } = useLanguage();
  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="h-6 w-6 text-secondary" />
        <h1 className="font-display text-2xl font-black text-secondary neon-text-gold">
          {language === "bn" ? "ভিআইপি প্রোগ্রাম" : "VIP Program"}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        {language === "bn"
          ? "আমাদের ভিআইপি প্রোগ্রামে যোগ দিন এবং এক্সক্লুসিভ পুরষ্কার উপভোগ করুন!"
          : "Join our VIP program and enjoy exclusive rewards, higher cashback, and personalized bonuses!"}
      </p>
      <div className="space-y-4">
        {tiers.map((tier, i) => (
          <motion.div key={tier.level} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-secondary/20 hover:border-secondary/50 transition-all bg-gradient-to-r from-card to-primary/5">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                  <tier.icon className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-secondary">
                    {language === "bn" ? tier.nameBn : tier.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {language === "bn" ? "প্রয়োজন: " : "Requirement: "}{tier.requirement}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-lg font-black text-secondary">{tier.bonus}</p>
                  <p className="text-[10px] text-muted-foreground">{language === "bn" ? "ক্যাশব্যাক" : "Cashback"}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VipPage;

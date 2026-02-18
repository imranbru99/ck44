import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Crown, Users, Calendar, Percent } from "lucide-react";
import { motion } from "framer-motion";

const promos = [
  { icon: Crown, title: "Welcome Bonus ৳8,888", titleBn: "স্বাগত বোনাস ৳৮,৮৮৮", desc: "100% bonus on your first deposit up to ৳8,888", descBn: "প্রথম জমায় ১০০% বোনাস ৳৮,৮৮৮ পর্যন্ত" },
  { icon: Calendar, title: "Daily First Deposit ৳1,688", titleBn: "দৈনিক প্রথম জমা ৳১,৬৮৮", desc: "Get bonus on your first deposit every day", descBn: "প্রতিদিন প্রথম জমায় বোনাস পান" },
  { icon: Percent, title: "Daily Cashback 5%", titleBn: "দৈনিক ক্যাশব্যাক ৫%", desc: "Get up to 5% cashback on your daily losses", descBn: "দৈনিক ক্ষতিতে ৫% পর্যন্ত ক্যাশব্যাক পান" },
  { icon: Users, title: "Referral Bonus ৳300", titleBn: "রেফারেল বোনাস ৳৩০০", desc: "Earn ৳300 for every friend you invite", descBn: "প্রতি বন্ধু আমন্ত্রণে ৳৩০০ আয় করুন" },
  { icon: Gift, title: "Friday Super Bonus", titleBn: "শুক্রবার সুপার বোনাস", desc: "Special reload bonus and cashback every Friday", descBn: "প্রতি শুক্রবার বিশেষ রিলোড বোনাস এবং ক্যাশব্যাক" },
  { icon: Crown, title: "VIP Program", titleBn: "ভিআইপি প্রোগ্রাম", desc: "Exclusive rewards for our loyal players", descBn: "আমাদের বিশ্বস্ত খেলোয়াড়দের জন্য বিশেষ পুরস্কার" },
];

const Promotions = () => {
  const { language } = useLanguage();
  return (
    <div className="px-4 py-6">
      <h1 className="font-display text-2xl md:text-3xl font-black text-secondary neon-text-gold mb-8">
        {language === "bn" ? "প্রমোশন" : "Promotions"}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="border-secondary/30 bg-gradient-to-br from-card to-primary/10 hover:border-secondary/60 transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <promo.icon className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-display text-lg font-bold text-secondary mb-2">
                  {language === "bn" ? promo.titleBn : promo.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "bn" ? promo.descBn : promo.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;

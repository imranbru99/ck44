import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Flame, Users, Star, Gift, Gamepad2, Trophy, Zap, TrendingUp,
  Fish, Swords, Ticket, Headphones, Download, Crown, Target,
  Wallet, CircleDot, Dice1, Heart, Medal
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Flame, label: "Hot Games", labelBn: "গরম খেলা", href: "/games/hot", color: "text-red-500" },
  { icon: Users, label: "Refer Friend", labelBn: "বন্ধুদের আমন্ত্রণ", href: "/promotions", color: "text-cyan-400" },
  { icon: Heart, label: "Favorite", labelBn: "প্রিয় আইটেমস", href: "/games/hot", color: "text-orange-400" },
  { icon: Gift, label: "Offer", labelBn: "অফার", href: "/promotions", color: "text-yellow-400" },
  { icon: Gamepad2, label: "Slots", labelBn: "স্লট", href: "/games/slots", color: "text-yellow-500" },
  { icon: Crown, label: "Reward Center", labelBn: "পুরষ্কার কেন্দ্র", href: "/vip", color: "text-amber-400" },
  { icon: CircleDot, label: "Live", labelBn: "লাইভ", href: "/games/live-casino", color: "text-pink-400" },
  { icon: Medal, label: "Manual Rebate", labelBn: "ম্যানুয়াল রিবেট", href: "/wallet", color: "text-orange-500" },
  { icon: Dice1, label: "Poker", labelBn: "পোকার", href: "/games/live-casino", color: "text-gray-300" },
  { icon: Trophy, label: "Jackpot", labelBn: "জ্যাকপট", href: "/games/hot", color: "text-green-400" },
  { icon: Zap, label: "Crash", labelBn: "ক্র্যাশ", href: "/games/crash", color: "text-red-400" },
  { icon: Target, label: "Model", labelBn: "মডেল", href: "/games/mini", color: "text-cyan-300" },
  { icon: TrendingUp, label: "Sports", labelBn: "স্পোর্টস", href: "/games/sports", color: "text-green-500" },
  { icon: Star, label: "Bangla", labelBn: "বাংলা", href: "/games/mini", color: "text-red-500" },
  { icon: Swords, label: "E-Sports", labelBn: "ই-স্পোর্টস", href: "/games/sports", color: "text-purple-400" },
  { icon: Download, label: "App Download", labelBn: "অ্যাপ্লিকেশন ডাউনলোড", href: "/", color: "text-green-400" },
  { icon: Ticket, label: "Lottery", labelBn: "লটারি", href: "/games/mini", color: "text-pink-500" },
  { icon: Headphones, label: "Support", labelBn: "গ্রাহক সেবা", href: "/support", color: "text-green-400" },
];

const PlayerSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();

  return (
    <aside className="hidden lg:block shrink-0 w-[180px] bg-card/80 border-r border-border h-[calc(100vh-56px)] sticky top-14 overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-2 gap-1 p-2">
        {sidebarItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 p-2.5 rounded-lg text-center transition-all hover:bg-muted/60 group",
                active && "bg-muted/80"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center bg-muted/50 group-hover:bg-muted transition-colors",
                active && "bg-secondary/20"
              )}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <span className={cn(
                "text-[10px] font-medium leading-tight line-clamp-2",
                active ? "text-secondary" : "text-foreground/80"
              )}>
                {language === "bn" ? item.labelBn : item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default PlayerSidebar;

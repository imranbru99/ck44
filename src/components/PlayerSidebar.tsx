import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Home, Trophy, Gamepad2, TrendingUp, Zap, Star, Gift, Wallet,
  User, Crown, Download, Headphones, LogOut, ChevronLeft, ChevronRight,
  Flame, Fish, Target, Swords
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainNav = [
  { icon: Home, label: "Home", labelBn: "হোম", href: "/" },
  { icon: Flame, label: "Hot Games", labelBn: "হট গেমস", href: "/games/hot" },
  { icon: Gamepad2, label: "Slots", labelBn: "স্লটস", href: "/games/slots" },
  { icon: Trophy, label: "Live Casino", labelBn: "লাইভ ক্যাসিনো", href: "/games/live-casino" },
  { icon: Zap, label: "Crash", labelBn: "ক্র্যাশ", href: "/games/crash" },
  { icon: TrendingUp, label: "Sports", labelBn: "স্পোর্টস", href: "/games/sports" },
  { icon: Star, label: "Mini Games", labelBn: "মিনি গেমস", href: "/games/mini" },
  { icon: Gift, label: "Promotions", labelBn: "প্রমোশন", href: "/promotions" },
];

const accountNav = [
  { icon: Crown, label: "VIP", labelBn: "ভিআইপি", href: "/vip" },
  { icon: Wallet, label: "Wallet", labelBn: "ওয়ালেট", href: "/wallet" },
  { icon: User, label: "My Account", labelBn: "আমার অ্যাকাউন্ট", href: "/profile" },
  { icon: Headphones, label: "Support", labelBn: "সাপোর্ট", href: "/support" },
];

const PlayerSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const NavItem = ({ item }: { item: typeof mainNav[0] }) => {
    const active = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
          active
            ? "bg-secondary/15 text-secondary border-l-2 border-secondary"
            : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
        )}
      >
        <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", active ? "text-secondary" : "text-muted-foreground group-hover:text-foreground")} />
        {!collapsed && <span className="truncate">{language === "bn" ? item.labelBn : item.label}</span>}
      </Link>
    );
  };

  return (
    <aside className={cn(
      "hidden lg:flex flex-col shrink-0 bg-card border-r border-border h-[calc(100vh-64px)] sticky top-16 transition-all duration-300 overflow-y-auto",
      collapsed ? "w-[60px]" : "w-[200px]"
    )}>
      {/* Collapse toggle */}
      <div className="flex justify-end p-1">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-2 space-y-0.5">
        {!collapsed && <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-2">{language === "bn" ? "গেমস" : "Games"}</p>}
        {mainNav.map((item) => <NavItem key={item.href} item={item} />)}

        <div className="my-3 border-t border-border" />

        {!collapsed && <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-2">{language === "bn" ? "অ্যাকাউন্ট" : "Account"}</p>}
        {accountNav.map((item) => <NavItem key={item.href} item={item} />)}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{language === "bn" ? "লগআউট" : "Logout"}</span>}
        </button>
      </div>
    </aside>
  );
};

export default PlayerSidebar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Wallet, User, LogOut, Home, Trophy, Gamepad2, TrendingUp, Zap, Star, Dice1, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const navCategories = [
  { icon: Home, labelKey: "home" as const, href: "/" },
  { icon: Trophy, labelKey: "liveCasino" as const, href: "/games/live-casino" },
  { icon: Gamepad2, labelKey: "slots" as const, href: "/games/slots" },
  { icon: Dice1, labelKey: "crash" as const, href: "/games/crash" },
  { icon: TrendingUp, labelKey: "sports" as const, href: "/games/sports" },
  { icon: Star, labelKey: "miniGames" as const, href: "/games/mini" },
  { icon: Gift, labelKey: "promotions" as const, href: "/promotions" },
];

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary border-b border-primary/80 shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-2xl font-black text-secondary neon-text-gold tracking-wider">
            BD678
          </span>
        </Link>

        {/* Desktop Category Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navCategories.map((cat) => (
            <Link
              key={cat.href}
              to={cat.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-primary-foreground/80 hover:text-secondary transition-colors rounded-md hover:bg-primary/60 group"
            >
              <cat.icon className="h-5 w-5 group-hover:text-secondary transition-colors" />
              <span className="text-[10px] font-semibold">{t(cat.labelKey)}</span>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "bn" : "en")}
            className="text-primary-foreground/80 hover:text-secondary hover:bg-primary/60"
          >
            <Globe className="h-4 w-4" />
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/wallet")} className="hidden sm:flex gap-1 text-secondary hover:bg-primary/60">
                <Wallet className="h-4 w-4" />
                {t("wallet")}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} className="text-primary-foreground hover:bg-primary/60">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary/60">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                onClick={() => navigate("/register")}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded-full px-5"
              >
                {t("register")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary/60 rounded-full px-5"
              >
                {t("login")}
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:bg-primary/60"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary/95 border-t border-primary-foreground/10 p-3">
          <div className="grid grid-cols-4 gap-2">
            {navCategories.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className="flex flex-col items-center gap-1 p-2 text-primary-foreground/80 hover:text-secondary transition-colors rounded-lg hover:bg-primary/60"
                onClick={() => setMobileOpen(false)}
              >
                <cat.icon className="h-6 w-6" />
                <span className="text-[10px] font-semibold text-center">{t(cat.labelKey)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

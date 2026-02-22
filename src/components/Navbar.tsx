import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Wallet, User, LogOut, Home, Trophy, Gamepad2, TrendingUp, Zap, Star, Dice1, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";

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
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-lg">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          {/* Left: hamburger + Logo */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="font-display text-xl md:text-2xl font-black text-secondary neon-text-gold tracking-wider">
                CK444.COM
              </span>
            </Link>
          </div>

          {/* Desktop Category Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navCategories.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-foreground/80 hover:text-secondary transition-colors rounded-md hover:bg-muted group"
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
              className="text-foreground/80 hover:text-secondary hover:bg-muted"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/wallet")} className="hidden sm:flex gap-1 text-secondary hover:bg-muted">
                  <Wallet className="h-4 w-4" />
                  {t("wallet")}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} className="text-foreground hover:bg-muted">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-foreground/60 hover:text-foreground hover:bg-muted">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openAuth("login")}
                  className="border-secondary text-secondary hover:bg-secondary/10 font-bold rounded px-4 text-xs"
                >
                  {t("login")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => openAuth("register")}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded px-4 text-xs"
                >
                  {t("register")}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border p-3">
            <div className="grid grid-cols-4 gap-2">
              {navCategories.map((cat) => (
                <Link
                  key={cat.href}
                  to={cat.href}
                  className="flex flex-col items-center gap-1 p-2 text-foreground/80 hover:text-secondary transition-colors rounded-lg hover:bg-muted"
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

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultMode={authMode} />
    </>
  );
};

export default Navbar;

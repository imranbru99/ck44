import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";
import UserAccountSheet from "@/components/UserAccountSheet";
import PersonalCentreModal from "@/components/PersonalCentreModal";
import PlayerSidebar from "@/components/PlayerSidebar";

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [accountOpen, setAccountOpen] = useState(false);
  const [centreOpen, setCentreOpen] = useState(false);
  const [centreTab, setCentreTab] = useState<"deposit" | "withdraw">("deposit");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpen(true);
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
                <Button
                  size="sm"
                  onClick={() => { setCentreTab("deposit"); setCentreOpen(true); }}
                  className="bg-green-600 text-white hover:bg-green-700 font-bold rounded px-4 text-xs"
                >
                  {t("deposit") || (language === "bn" ? "জমা" : "Deposit")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setCentreTab("withdraw"); setCentreOpen(true); }}
                  className="border-secondary text-secondary hover:bg-secondary/10 font-bold rounded px-4 text-xs"
                >
                  {language === "bn" ? "উত্তোলন" : "Withdraw"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setAccountOpen(true)} className="text-foreground hover:bg-muted">
                  <User className="h-4 w-4" />
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
      </nav>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute inset-y-0 left-0 w-[200px] bg-card border-r border-border overflow-y-auto animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <PlayerSidebar mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultMode={authMode} />
      <UserAccountSheet open={accountOpen} onOpenChange={setAccountOpen} />
      <PersonalCentreModal open={centreOpen} onOpenChange={setCentreOpen} defaultTab={centreTab} />
    </>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Lock, User, X } from "lucide-react";

const phoneToEmail = (phone: string) => `${phone.replace(/[^0-9]/g, "")}@ck444.app`;

type AuthMode = "login" | "register";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: AuthMode;
}

const AuthModal = ({ open, onOpenChange, defaultMode = "login" }: AuthModalProps) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset when mode changes
  const switchMode = (m: AuthMode) => {
    setMode(m);
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setDisplayName("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = phoneToEmail(phone);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("success"));
      onOpenChange(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const email = phoneToEmail(phone);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, phone },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("success") || "Registration successful!");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border p-0 gap-0">
        <DialogHeader className="p-5 pb-3 text-center">
          <div className="font-display text-2xl font-bold text-secondary neon-text-gold mb-1">CK444</div>
          <DialogTitle className="font-display text-lg">
            {mode === "login" ? t("login") : t("register")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-5">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Phone className="h-3 w-3" /> {t("phone") || "Phone Number"}
                </label>
                <Input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Lock className="h-3 w-3" /> {t("password")}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-muted border-border"
                />
              </div>
              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold" disabled={loading}>
                {loading ? t("loading") : t("login")}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <User className="h-3 w-3" /> Display Name
                </label>
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Phone className="h-3 w-3" /> {t("phone") || "Phone Number"}
                </label>
                <Input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Lock className="h-3 w-3" /> {t("password")}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                  <Lock className="h-3 w-3" /> {t("confirmPassword")}
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-muted border-border"
                />
              </div>
              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold" disabled={loading}>
                {loading ? t("loading") : t("register")}
              </Button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-3">
            {mode === "login" ? (
              <>
                {t("dontHaveAccount")}{" "}
                <button onClick={() => switchMode("register")} className="text-secondary hover:underline font-medium">
                  {t("register")}
                </button>
              </>
            ) : (
              <>
                {t("alreadyHaveAccount")}{" "}
                <button onClick={() => switchMode("login")} className="text-secondary hover:underline font-medium">
                  {t("login")}
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

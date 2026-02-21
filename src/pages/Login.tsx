import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Lock } from "lucide-react";

const phoneToEmail = (phone: string) => `${phone.replace(/[^0-9]/g, "")}@ck444.app`;

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-casino p-4">
      <Card className="w-full max-w-md border-border neon-glow-purple">
        <CardHeader className="text-center">
          <div className="font-display text-2xl font-bold text-primary neon-text-green mb-2">🎰 CK444</div>
          <CardTitle className="font-display text-xl">{t("login")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> {t("phone") || "Phone Number"}
              </label>
              <Input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" /> {t("password")}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full neon-glow-green" disabled={loading}>
              {loading ? t("loading") : t("login")}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t("dontHaveAccount")}{" "}
            <Link to="/register" className="text-primary hover:underline">
              {t("register")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

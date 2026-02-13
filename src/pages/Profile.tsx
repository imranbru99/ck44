import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { language } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="font-display text-2xl font-black text-secondary neon-text-gold mb-6">
          {language === "bn" ? "প্রোফাইল" : "Profile"}
        </h1>

        <Card className="border-secondary/30 bg-gradient-to-br from-card to-primary/10 mb-6">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-secondary" />
            </div>
            <p className="font-semibold text-lg">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === "bn" ? "সদস্য" : "Member"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-sm">{language === "bn" ? "অ্যাকাউন্ট তথ্য" : "Account Info"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "bn" ? "ইমেইল" : "Email"}</p>
                <p className="text-sm font-medium">{user?.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{language === "bn" ? "ফোন" : "Phone"}</p>
                <p className="text-sm font-medium">{user?.phone || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">KYC</p>
                <p className="text-sm font-medium">{language === "bn" ? "অপেক্ষমাণ" : "Pending"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

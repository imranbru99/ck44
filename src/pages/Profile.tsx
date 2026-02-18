import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Shield, Lock, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { language } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setDisplayName(data.display_name || "");
        setPhone(data.phone || "");
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    const trimmedName = displayName.trim();
    const trimmedPhone = phone.trim();
    if (trimmedName.length > 100 || trimmedPhone.length > 20) {
      toast({ title: language === "bn" ? "ত্রুটি" : "Error", description: "Input too long", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: trimmedName || null, phone: trimmedPhone || null })
      .eq("user_id", user.id);
    setSaving(false);
    toast({
      title: error ? (language === "bn" ? "ত্রুটি" : "Error") : (language === "bn" ? "সফল" : "Success"),
      description: error ? error.message : (language === "bn" ? "প্রোফাইল আপডেট হয়েছে" : "Profile updated"),
      variant: error ? "destructive" : "default",
    });
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: language === "bn" ? "ত্রুটি" : "Error", description: language === "bn" ? "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে" : "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: language === "bn" ? "ত্রুটি" : "Error", description: language === "bn" ? "পাসওয়ার্ড মিলছে না" : "Passwords do not match", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (error) {
      toast({ title: language === "bn" ? "ত্রুটি" : "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: language === "bn" ? "সফল" : "Success", description: language === "bn" ? "পাসওয়ার্ড পরিবর্তন হয়েছে" : "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  if (loading) return null;

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-black text-secondary neon-text-gold mb-6">
        {language === "bn" ? "প্রোফাইল" : "Profile"}
      </h1>

      {/* Avatar card */}
      <Card className="border-secondary/30 bg-gradient-to-br from-card to-primary/10 mb-6">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center mb-4">
            <User className="h-10 w-10 text-secondary" />
          </div>
          <p className="font-semibold text-lg">{displayName || user?.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === "bn" ? "সদস্য" : "Member"}
          </p>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="border-border mb-6">
        <CardHeader>
          <CardTitle className="text-sm">{language === "bn" ? "প্রোফাইল সম্পাদনা" : "Edit Profile"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {language === "bn" ? "ইমেইল" : "Email"}</Label>
            <Input value={user?.email || ""} disabled className="bg-muted/50 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {language === "bn" ? "নাম" : "Display Name"}</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={language === "bn" ? "আপনার নাম" : "Your name"}
              maxLength={100}
              disabled={profileLoading}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {language === "bn" ? "ফোন" : "Phone"}</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={language === "bn" ? "ফোন নম্বর" : "Phone number"}
              maxLength={20}
              disabled={profileLoading}
              className="bg-card"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>KYC: {language === "bn" ? "অপেক্ষমাণ" : "Pending"}</span>
          </div>
          <Button onClick={handleSaveProfile} disabled={saving || profileLoading} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {language === "bn" ? "সংরক্ষণ" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2"><Lock className="h-4 w-4" /> {language === "bn" ? "পাসওয়ার্ড পরিবর্তন" : "Change Password"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">{language === "bn" ? "নতুন পাসওয়ার্ড" : "New Password"}</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              maxLength={128}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{language === "bn" ? "পাসওয়ার্ড নিশ্চিত করুন" : "Confirm Password"}</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              maxLength={128}
              className="bg-card"
            />
          </div>
          <Button onClick={handleChangePassword} disabled={changingPassword || !newPassword} variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 font-bold">
            {changingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
            {language === "bn" ? "পাসওয়ার্ড পরিবর্তন করুন" : "Change Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Users, Copy, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ReferredUser {
  display_name: string | null;
  created_at: string;
}

const InviteFriendPage = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState("");
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [loading, setLoading] = useState(true);

  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      // Get own referral code
      const { data: profile } = await supabase
        .from("profiles")
        .select("referral_code")
        .eq("user_id", user.id)
        .single();
      if (profile?.referral_code) setReferralCode(profile.referral_code);

      // Get referred users
      const { data: referred } = await supabase
        .from("profiles")
        .select("display_name, created_at")
        .eq("referred_by", user.id)
        .order("created_at", { ascending: false });
      setReferredUsers(referred || []);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: language === "bn" ? "কপি হয়েছে!" : "Copied!" });
  };

  const bn = language === "bn";

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        {bn ? "বন্ধুদের আমন্ত্রণ করুন" : "Invite Friends"}
      </h1>

      <div className="bg-card rounded-xl border border-border p-6 mb-4">
        <p className="text-foreground/80 mb-4">
          {bn
            ? "আপনার রেফারেল লিঙ্ক শেয়ার করুন এবং বোনাস পান!"
            : "Share your referral link and earn bonuses!"}
        </p>
        <div className="flex gap-2 items-center">
          <input
            readOnly
            value={referralLink}
            className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
          />
          <Button onClick={copyLink} size="sm" className="bg-secondary text-secondary-foreground">
            <Copy className="h-4 w-4 mr-1" /> {bn ? "কপি" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Referred Users List */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-secondary" />
          {bn ? "আমন্ত্রিত বন্ধুরা" : "Invited Friends"} ({referredUsers.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground text-sm">{bn ? "লোড হচ্ছে..." : "Loading..."}</p>
        ) : referredUsers.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            {bn ? "এখনও কেউ যোগদান করেনি।" : "No one has joined yet."}
          </p>
        ) : (
          <div className="space-y-2">
            {referredUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2.5 border border-border">
                <span className="text-sm text-foreground font-medium">
                  {u.display_name || (bn ? "ব্যবহারকারী" : "User")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(u.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteFriendPage;

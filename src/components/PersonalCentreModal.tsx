import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  User, Wallet, ArrowUpFromLine, FileText, ClipboardList,
  Award, Users, Target, Mail, LogOut, X
} from "lucide-react";

// Inline content components
import Profile from "@/pages/Profile";
import DepositPage from "@/pages/DepositPage";
import WithdrawPage from "@/pages/WithdrawPage";
import BettingRecordPage from "@/pages/BettingRecordPage";
import AccountRecordPage from "@/pages/AccountRecordPage";
import AwardCentrePage from "@/pages/AwardCentrePage";
import InviteFriendPage from "@/pages/InviteFriendPage";
import MissionPage from "@/pages/MissionPage";
import MessagePage from "@/pages/MessagePage";

type MenuKey = "profile" | "deposit" | "withdraw" | "betting" | "account" | "award" | "invite" | "mission" | "message";

const menuItems: { key: MenuKey; icon: typeof User; label: string; labelBn: string; color: string }[] = [
  { key: "profile", icon: User, label: "My Account", labelBn: "আমার অ্যাকাউন্ট", color: "text-cyan-400" },
  { key: "deposit", icon: Wallet, label: "Deposit", labelBn: "ডিপোজিট", color: "text-green-400" },
  { key: "withdraw", icon: ArrowUpFromLine, label: "Withdraw", labelBn: "উত্তোলন", color: "text-yellow-400" },
  { key: "betting", icon: FileText, label: "Betting Record", labelBn: "বেটিং রেকর্ড", color: "text-orange-400" },
  { key: "account", icon: ClipboardList, label: "Account Record", labelBn: "অ্যাকাউন্ট রেকর্ড", color: "text-blue-400" },
  { key: "award", icon: Award, label: "Award Centre", labelBn: "পুরস্কার কেন্দ্র", color: "text-purple-400" },
  { key: "invite", icon: Users, label: "Invite Friends", labelBn: "বন্ধুদের আমন্ত্রণ করুন", color: "text-pink-400" },
  { key: "mission", icon: Target, label: "Mission", labelBn: "মিশন", color: "text-red-400" },
  { key: "message", icon: Mail, label: "Private Message", labelBn: "অভ্যন্তরীণ বার্তা", color: "text-teal-400" },
];

const contentMap: Record<MenuKey, React.FC> = {
  profile: Profile,
  deposit: DepositPage,
  withdraw: WithdrawPage,
  betting: BettingRecordPage,
  account: AccountRecordPage,
  award: AwardCentrePage,
  invite: InviteFriendPage,
  mission: MissionPage,
  message: MessagePage,
};

interface PersonalCentreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: MenuKey;
}

const PersonalCentreModal = ({ open, onOpenChange, defaultTab = "deposit" }: PersonalCentreModalProps) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<MenuKey>(defaultTab);
  const bn = language === "bn";

  // Reset tab when modal opens with a new defaultTab
  const handleOpenChange = (val: boolean) => {
    if (val) setActiveTab(defaultTab);
    onOpenChange(val);
  };

  const handleLogout = async () => {
    onOpenChange(false);
    await supabase.auth.signOut();
  };

  const ActiveContent = contentMap[activeTab];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 gap-0 overflow-hidden border-border bg-background [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">{bn ? "ব্যক্তিগত কেন্দ্র" : "Personal Centre"}</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-muted/80 p-1.5 hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-[200px] shrink-0 bg-card border-r border-border flex flex-col overflow-y-auto">
            <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-[hsl(175,50%,20%)] to-[hsl(175,50%,25%)]">
              <h2 className="text-secondary font-display text-sm font-bold">
                {bn ? "ব্যক্তিগত কেন্দ্র" : "Personal Centre"}
              </h2>
            </div>

            <div className="flex flex-col py-1 flex-1">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors text-sm",
                    activeTab === item.key
                      ? "bg-muted/80 text-secondary font-semibold"
                      : "text-foreground/80 hover:bg-muted/40"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0", item.color)} />
                  <span className="truncate text-xs">{bn ? item.labelBn : item.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-border p-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted/40 transition-colors text-left w-full"
              >
                <LogOut className="h-4 w-4 shrink-0 text-red-400" />
                <span className="text-xs font-medium text-red-400">
                  {bn ? "লগআউট" : "Logout"}
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <ActiveContent />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalCentreModal;

import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  User, Wallet, ArrowUpFromLine, FileText, ClipboardList,
  Award, Users, Target, Mail, LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: User, label: "My Account", labelBn: "আমার অ্যাকাউন্ট", href: "/profile", color: "text-cyan-400" },
  { icon: Wallet, label: "Deposit", labelBn: "ডিপোজিট", href: "/deposit", color: "text-green-400" },
  { icon: ArrowUpFromLine, label: "Withdraw", labelBn: "উত্তোলন", href: "/withdraw", color: "text-yellow-400" },
  { icon: FileText, label: "Betting Record", labelBn: "বেটিং রেকর্ড", href: "/betting-record", color: "text-orange-400" },
  { icon: ClipboardList, label: "Account Record", labelBn: "অ্যাকাউন্ট রেকর্ড", href: "/account-record", color: "text-blue-400" },
  { icon: Award, label: "Award Centre", labelBn: "পুরস্কার কেন্দ্র", href: "/award-centre", color: "text-purple-400" },
  { icon: Users, label: "Invite Friends", labelBn: "বন্ধুদের আমন্ত্রণ করুন", href: "/invite", color: "text-pink-400" },
  { icon: Target, label: "Mission", labelBn: "মিশন", href: "/mission", color: "text-red-400" },
  { icon: Mail, label: "Private Message", labelBn: "অভ্যন্তরীণ বার্তা", href: "/messages", color: "text-teal-400" },
];

interface UserAccountSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserAccountSheet = ({ open, onOpenChange }: UserAccountSheetProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  const handleLogout = async () => {
    onOpenChange(false);
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[260px] bg-card border-border p-0">
        <SheetHeader className="px-4 py-3 border-b border-border bg-gradient-to-r from-[hsl(175,50%,20%)] to-[hsl(175,50%,25%)]">
          <SheetTitle className="text-secondary font-display text-base">
            {language === "bn" ? "ব্যক্তিগত কেন্দ্র" : "Personal Centre"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col py-2">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left"
            >
              <item.icon className={cn("h-5 w-5 shrink-0", item.color)} />
              <span className="text-sm font-medium text-foreground">
                {language === "bn" ? item.labelBn : item.label}
              </span>
            </button>
          ))}

          <div className="border-t border-border mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left w-full"
            >
              <LogOut className="h-5 w-5 shrink-0 text-red-400" />
              <span className="text-sm font-medium text-red-400">
                {language === "bn" ? "লগআউট" : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserAccountSheet;

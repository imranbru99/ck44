import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import PlayerSidebar from "@/components/PlayerSidebar";
import PromoPopup from "@/components/PromoPopup";
import { useLanguage } from "@/i18n/LanguageContext";

const marqueeMessages = [
  "🎉কোটিপতি হতে আপনার ব্যক্তিগত লিঙ্কটি শেয়ার করুন!🎉",
  "👑 দৈনিক প্রথম জমার বোনাস ৳১৬৮৮ পর্যন্ত ✨",
  "🎉 প্রতি শুক্রবার সুপার বোনাস দিবস! 🎉",
  "👑প্রথম জমা বোনাস সর্বোচ্চ ৳৮,৮৮৮👑",
];

const PlayerLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <PromoPopup />
      <Navbar />

      {/* Marquee */}
      <div className="bg-card border-b border-border overflow-hidden">
        <div className="py-1.5 flex">
          <div className="marquee-scroll flex gap-12 whitespace-nowrap">
            {[...marqueeMessages, ...marqueeMessages].map((msg, i) => (
              <span key={i} className="text-xs text-secondary font-medium">{msg}</span>
            ))}
          </div>
        </div>
      </div>

      {user ? (
        <div className="flex">
          <PlayerSidebar />
          <main className="flex-1 min-w-0 overflow-hidden">
            <Outlet />
          </main>
        </div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default PlayerLayout;

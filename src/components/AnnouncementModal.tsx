import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

import noticeChampionship from "@/assets/notices/notice-championship.jpg";
import noticeEvent from "@/assets/notices/notice-event.jpg";
import noticeAnnouncement from "@/assets/notices/notice-announcement.jpg";
import noticeVip from "@/assets/notices/notice-vip.jpg";
import noticeWelcome from "@/assets/notices/notice-welcome.jpg";

interface Notice {
  id: number;
  titleBn: string;
  title: string;
  image: string;
  headingBn: string;
  heading: string;
  bodyBn: string;
  body: string;
  ctaBn: string;
  cta: string;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Daily Championship, Prize Pool 1000000...",
    titleBn: "দৈনিক চ্যাম্পিয়নশিপ, প্রাইজ পুল ১০০০০০০...",
    image: noticeChampionship,
    heading: "🏆 Daily Championship, Prize Pool 1000000 Taka 🏆",
    headingBn: "🏆 দৈনিক চ্যাম্পিয়নশিপ, প্রাইজ পুল ১০০০০০০ টাকা 🏆",
    body: "All members can participate and win high bonuses, prizes and more! Daily ranking achievers can participate in daily/monthly/annual competitions.\n\nEvent time: Starts from the second day of membership, continues until one day before the next membership day.",
    bodyBn: "সকল সদস্যরা অংশ নিতে পারেন উচ্চ বোনাস, পুরষ্কার এবং আরো এর সুযোগ রয়েছে!\nদৈনিক র‍্যাংকিং অর্জনকারী ব্যবহারকারীরা সদস্য দৈনিক/মাসিক/বাৎসরিক প্রতিযোগিতায় অংশ নেওয়ার সুযোগ পাবেন।\n\nইভেন্ট সময়: প্রতিটি সদস্যতার দিনের পর দ্বিতীয় দিন থেকে শুরু হয়, পরবর্তী সদস্যতার দিনের এক দিন আগে পর্যন্ত চলবে।",
    cta: "Check Details",
    ctaBn: "বিস্তারিত পরীক্ষা করুন",
  },
  {
    id: 2,
    title: "Event Update: Rain of Food Bonus",
    titleBn: "ইভেন্ট আপডেট: নানা খাবারের বৃষ্টি",
    image: noticeEvent,
    heading: "🎉 Rain of Food Bonus Event! 🎉",
    headingBn: "🎉 নানা খাবারের বৃষ্টি বোনাস ইভেন্ট! 🎉",
    body: "Participate in our special Rain of Food event! Every deposit during the event period earns you bonus food tokens that can be exchanged for real rewards.\n\nThe more you play, the more food tokens you collect. Top collectors win mega prizes!",
    bodyBn: "আমাদের বিশেষ নানা খাবারের বৃষ্টি ইভেন্টে অংশ নিন! ইভেন্ট চলাকালীন প্রতিটি জমায় আপনি বোনাস ফুড টোকেন পাবেন যা আসল পুরষ্কারের জন্য বিনিময় করা যায়।\n\nযত বেশি খেলবেন, তত বেশি ফুড টোকেন সংগ্রহ করবেন। শীর্ষ সংগ্রাহকরা মেগা পুরষ্কার জিতবেন!",
    cta: "Join Event",
    ctaBn: "ইভেন্টে যোগ দিন",
  },
  {
    id: 3,
    title: "Important Announcement – Link Update",
    titleBn: "গুরুত্বপূর্ণ ঘোষণা – লিঙ্ক আপডেট",
    image: noticeAnnouncement,
    heading: "📢 Important Announcement – Link Update",
    headingBn: "📢 গুরুত্বপূর্ণ ঘোষণা – লিঙ্ক আপডেট",
    body: "Dear valued members, please note our website link has been updated for better security and faster access. Save the new link to avoid any disruption.\n\nIf you face any issues accessing your account, please contact our 24/7 customer support team immediately.",
    bodyBn: "প্রিয় সম্মানিত সদস্যগণ, দয়া করে মনে রাখবেন আমাদের ওয়েবসাইট লিঙ্ক আরও ভালো নিরাপত্তা এবং দ্রুত অ্যাক্সেসের জন্য আপডেট করা হয়েছে। নতুন লিঙ্ক সংরক্ষণ করুন।\n\nআপনার অ্যাকাউন্ট অ্যাক্সেস করতে কোনো সমস্যা হলে, অনুগ্রহ করে আমাদের ২৪/৭ কাস্টমার সাপোর্ট টিমের সাথে যোগাযোগ করুন।",
    cta: "Save New Link",
    ctaBn: "নতুন লিঙ্ক সংরক্ষণ করুন",
  },
  {
    id: 4,
    title: "VIP Member Exclusive Bonus",
    titleBn: "ভিআইপি সদস্য একচেটিয়া বোনাস",
    image: noticeVip,
    heading: "👑 VIP Member Exclusive Benefits! 👑",
    headingBn: "👑 ভিআইপি সদস্য একচেটিয়া সুবিধা! 👑",
    body: "Upgrade to VIP membership and unlock exclusive benefits including higher withdrawal limits, personal account manager, special tournament access, and birthday bonuses.\n\nVIP members enjoy up to 15% daily cashback and priority customer support!",
    bodyBn: "ভিআইপি সদস্যতায় আপগ্রেড করুন এবং একচেটিয়া সুবিধা আনলক করুন যেমন উচ্চ উত্তোলন সীমা, ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার, বিশেষ টুর্নামেন্ট অ্যাক্সেস এবং জন্মদিনের বোনাস।\n\nভিআইপি সদস্যরা প্রতিদিন ১৫% পর্যন্ত ক্যাশব্যাক এবং অগ্রাধিকার কাস্টমার সাপোর্ট উপভোগ করেন!",
    cta: "Become VIP",
    ctaBn: "ভিআইপি হোন",
  },
  {
    id: 5,
    title: "Welcome Bonus – First Deposit",
    titleBn: "স্বাগত বোনাস – প্রথম জমা",
    image: noticeWelcome,
    heading: "🎁 Welcome Bonus up to ৳8,888! 🎁",
    headingBn: "🎁 স্বাগত বোনাস ৳৮,৮৮৮ পর্যন্ত! 🎁",
    body: "New members get a massive welcome bonus on their first deposit! Deposit ৳500 or more and receive up to ৳8,888 in bonus credits.\n\nPlus, enjoy 50 free spins on our most popular slot games. This is a limited time offer – don't miss out!",
    bodyBn: "নতুন সদস্যরা তাদের প্রথম জমায় বিশাল স্বাগত বোনাস পাবেন! ৳৫০০ বা তার বেশি জমা দিন এবং ৳৮,৮৮৮ পর্যন্ত বোনাস ক্রেডিট পান।\n\nএছাড়াও, আমাদের সবচেয়ে জনপ্রিয় স্লট গেমগুলিতে ৫০টি ফ্রি স্পিন উপভোগ করুন। এটি একটি সীমিত সময়ের অফার – মিস করবেন না!",
    cta: "Claim Bonus",
    ctaBn: "বোনাস দাবি করুন",
  },
];

const STORAGE_KEY = "ck444_notices_dismissed";

const AnnouncementModal = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeNotice, setActiveNotice] = useState(0);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Small delay so the page loads first
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isOpen) return null;

  const current = notices[activeNotice];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90vw] sm:max-w-[750px] sm:max-h-[85vh] z-[101] flex flex-col rounded-xl overflow-hidden border-2 border-secondary/40 shadow-[0_0_40px_hsl(40_100%_50%/0.2)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[hsl(175,50%,20%)] to-[hsl(175,50%,25%)] px-4 py-3 flex items-center justify-between shrink-0">
              <h2 className="font-display text-lg font-bold text-secondary">
                {language === "bn" ? "📢 ঘোষণা" : "📢 Announcements"}
              </h2>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-foreground/20 hover:bg-foreground/40 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 min-h-0 bg-gradient-to-br from-[hsl(175,50%,18%)] to-[hsl(175,40%,22%)]">
              {/* Left sidebar - notice tabs */}
              <div className="w-[160px] sm:w-[200px] shrink-0 border-r border-white/10 overflow-y-auto py-2 px-2 flex flex-col gap-1.5">
                {notices.map((notice, i) => (
                  <button
                    key={notice.id}
                    onClick={() => setActiveNotice(i)}
                    className={`flex items-start gap-2 px-3 py-2.5 rounded-lg text-left transition-all ${
                      i === activeNotice
                        ? "bg-secondary/20 border border-secondary/40"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Star className={`h-4 w-4 shrink-0 mt-0.5 ${i === activeNotice ? "text-secondary" : "text-secondary/50"}`} />
                    <span className={`text-[11px] leading-tight font-medium line-clamp-2 ${
                      i === activeNotice ? "text-foreground" : "text-foreground/70"
                    }`}>
                      {language === "bn" ? notice.titleBn : notice.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Notice heading */}
                    <h3 className="text-sm sm:text-base font-bold text-secondary mb-3 leading-snug">
                      {language === "bn" ? current.headingBn : current.heading}
                    </h3>

                    {/* Notice image */}
                    <div className="rounded-lg overflow-hidden mb-3 border border-white/10">
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* Notice body */}
                    <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed whitespace-pre-line mb-4">
                      {language === "bn" ? current.bodyBn : current.body}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={handleClose}
                        className="px-6 py-2 rounded-lg border-2 border-secondary text-secondary font-bold text-sm hover:bg-secondary/10 transition-colors"
                      >
                        {language === "bn" ? current.ctaBn : current.cta}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementModal;

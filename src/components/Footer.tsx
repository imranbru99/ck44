import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { MessageCircle, Users, Facebook, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const helpLinks = [
  { label: "Hot Games", labelBn: "গরম খেলা", href: "/games/hot" },
  { label: "Slots", labelBn: "স্লটস", href: "/games/slots" },
  { label: "Live Casino", labelBn: "লাইভ", href: "/games/live-casino" },
  { label: "Crash", labelBn: "ক্র্যাশ", href: "/games/crash" },
  { label: "Sports", labelBn: "স্পোর্টস", href: "/games/sports" },
  { label: "E-Sports", labelBn: "ই-স্পোর্টস", href: "/games/mini" },
  { label: "Fishing", labelBn: "ফিশিং", href: "/games/mini" },
  { label: "Lottery", labelBn: "লটারি", href: "/games/mini" },
];

const gameCenterLinks = [
  { label: "Hot Games", labelBn: "গরম খেলা", href: "/games/hot" },
  { label: "Favorite Items", labelBn: "প্রিয় আইটেমস", href: "/games/hot" },
  { label: "Slots", labelBn: "স্লট", href: "/games/slots" },
  { label: "Live", labelBn: "লাইভ", href: "/games/live-casino" },
  { label: "Poker", labelBn: "পোকার", href: "/games/live-casino" },
  { label: "Fishing", labelBn: "ফিশিং", href: "/games/mini" },
  { label: "Sports", labelBn: "স্পোর্টস", href: "/games/sports" },
  { label: "E-Sports", labelBn: "ই-স্পোর্টস", href: "/games/mini" },
  { label: "Lottery", labelBn: "লটারি", href: "/games/mini" },
];

const providerNames = [
  "JILI", "PG", "SPRIBE", "Pragmatic Play", "Playtech", "BNG", "NAGA",
  "Evolution", "Live22", "JDB", "Micro Play", "FC", "CQ9", "First Person",
  "EAZY", "SA Gaming", "AMEBA", "BK Gaming", "Booming", "NetEnt", "Red Tiger",
  "Balson", "Hacksaw", "Gemini", "MEGA", "FTG",
];

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/90">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top section: Help Center + Game Center + About */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Help Center */}
          <div>
            <h3 className="font-display text-sm font-bold text-secondary mb-4">
              {language === "bn" ? "সাহায্য কেন্দ্র" : "Help Center"}
            </h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-xs text-muted-foreground hover:text-secondary transition-colors">
                    {language === "bn" ? link.labelBn : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Center */}
          <div>
            <h3 className="font-display text-sm font-bold text-secondary mb-4">
              {language === "bn" ? "গেম সেন্টার" : "Game Center"}
            </h3>
            <ul className="space-y-2">
              {gameCenterLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-xs text-muted-foreground hover:text-secondary transition-colors">
                    {language === "bn" ? link.labelBn : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About / Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 w-16 h-16 rounded-lg bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center">
                <span className="font-display text-lg font-black text-secondary">CK444</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {language === "bn"
                  ? "আমাদের ওয়েবসাইট একটি উদ্ভাবনী অনলাইন স্পোর্টসবুক এবং ক্যাসিনো। উচ্চ অডসের সাথে বিভিন্ন ধরনের খেলা এবং বেটিং মার্কেট অফার করে, আমরা আপনাকে সেরা অনলাইন অভিজ্ঞতা দিতে নিশ্চিত করি! হাজার হাজার প্রি-ম্যাচ এবং লাইভ স্পোর্টিং ইভেন্ট উপভোগ করুন!"
                  : "Our Website is an innovative online sportsbook and casino. Offering a wide variety of sports and betting markets with high odds, we make sure to bring you the best online experience ever! Enjoy thousands of pre-match and live sporting events and win big while supporting your favourites!"}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="outline" size="sm" className="border-secondary/40 text-secondary hover:bg-secondary/10 text-xs rounded-full">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                {language === "bn" ? "অংশীদার" : "Partner"}
              </Button>
              <Button variant="outline" size="sm" className="border-neon-green/40 text-neon-green hover:bg-neon-green/10 text-xs rounded-full">
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                {language === "bn" ? "লাইভ চ্যাট" : "Live Chat"}
              </Button>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon: Facebook, color: "bg-blue-600 hover:bg-blue-500" },
                { icon: Send, color: "bg-sky-500 hover:bg-sky-400" },
                { icon: MessageSquare, color: "bg-green-500 hover:bg-green-400" },
              ].map((social, i) => (
                <button key={i} className={`w-8 h-8 rounded-full ${social.color} flex items-center justify-center transition-colors`}>
                  <social.icon className="h-4 w-4 text-white" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Provider logos */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {providerNames.map((name) => (
              <div
                key={name}
                className="px-3 py-1.5 bg-muted/50 border border-border rounded text-[10px] font-bold text-muted-foreground tracking-wide uppercase hover:border-secondary/40 hover:text-secondary/80 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-6 pt-4 text-center">
          <p className="text-[10px] text-muted-foreground">
            © 2026 CK444. All rights reserved. 18+ Gamble responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

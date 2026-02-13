import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, TrendingUp, Zap, Star, Gift, Dice1, Crown, Flame, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

import bannerWelcome from "@/assets/banner-welcome.jpg";
import bannerDaily from "@/assets/banner-daily.jpg";
import bannerReferral from "@/assets/banner-referral.jpg";
import bannerFriday from "@/assets/banner-friday.jpg";

import imgSweetBonanza from "@/assets/games/sweet-bonanza.jpg";
import imgCrazyTime from "@/assets/games/crazy-time.jpg";
import imgAviator from "@/assets/games/aviator.jpg";
import imgGatesOfOlympus from "@/assets/games/gates-of-olympus.jpg";
import imgLightningRoulette from "@/assets/games/lightning-roulette.jpg";
import imgMines from "@/assets/games/mines.jpg";
import imgPlinko from "@/assets/games/plinko.jpg";
import imgDice from "@/assets/games/dice.jpg";
import imgBigBass from "@/assets/games/big-bass.jpg";
import imgStarburst from "@/assets/games/starburst.jpg";
import imgCricket from "@/assets/games/cricket.jpg";
import imgFootball from "@/assets/games/football.jpg";

const bannerSlides = [
  {
    title: "🎉 Monthly Invite Friend Bonus!",
    titleBn: "🎉 মাসিক বন্ধু আমন্ত্রণ বোনাস!",
    subtitle: "Earn up to ৳1,000,000 every month",
    subtitleBn: "প্রতি মাসে ৳১০,০০,০০০ পর্যন্ত আয় করুন",
    image: bannerReferral,
  },
  {
    title: "👑 Daily First Deposit Bonus ৳1688",
    titleBn: "👑 দৈনিক প্রথম জমা বোনাস ৳১৬৮৮",
    subtitle: "Get massive rewards on your first deposit every day!",
    subtitleBn: "প্রতিদিন প্রথম জমায় বিশাল পুরষ্কার পান!",
    image: bannerDaily,
  },
  {
    title: "🎰 Welcome Bonus up to ৳8,888",
    titleBn: "🎰 স্বাগত বোনাস ৳৮,৮৮৮ পর্যন্ত",
    subtitle: "Join now and claim your first deposit bonus",
    subtitleBn: "এখনই যোগ দিন এবং আপনার প্রথম জমা বোনাস দাবি করুন",
    image: bannerWelcome,
  },
  {
    title: "🎉 Every Friday Super Bonus Day!",
    titleBn: "🎉 প্রতি শুক্রবার সুপার বোনাস দিবস!",
    subtitle: "Special cashback and reload bonuses every Friday",
    subtitleBn: "প্রতি শুক্রবার বিশেষ ক্যাশব্যাক এবং রিলোড বোনাস",
    image: bannerFriday,
  },
];

const marqueeMessages = [
  "🎉কোটিপতি হতে আপনার ব্যক্তিগত লিঙ্কটি শেয়ার করুন!🎉",
  "👑 দৈনিক প্রথম জমার বোনাস ৳১৬৮৮ পর্যন্ত ✨",
  "🎉 প্রতি শুক্রবার সুপার বোনাস দিবস! 🎉",
  "👑প্রথম জমা বোনাস সর্বোচ্চ ৳৮,৮৮৮👑",
];

const gameCategories = [
  { icon: Gamepad2, key: "slotsCategory" as const, color: "text-secondary", href: "/games/slots", count: "500+" },
  { icon: Trophy, key: "liveCasinoCategory" as const, color: "text-primary-foreground", href: "/games/live-casino", count: "200+" },
  { icon: TrendingUp, key: "sportsCategory" as const, color: "text-secondary", href: "/games/sports", count: "1000+" },
  { icon: Zap, key: "crashCategory" as const, color: "text-primary-foreground", href: "/games/crash", count: "50+" },
  { icon: Star, key: "miniGames" as const, color: "text-secondary", href: "/games/mini", count: "100+" },
];

const featuredGames = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", category: "Slots", hot: true, image: imgSweetBonanza },
  { name: "Crazy Time", provider: "Evolution", category: "Live Casino", hot: true, image: imgCrazyTime },
  { name: "Aviator", provider: "Spribe", category: "Crash", hot: false, image: imgAviator },
  { name: "Gates of Olympus", provider: "Pragmatic Play", category: "Slots", hot: true, image: imgGatesOfOlympus },
  { name: "Lightning Roulette", provider: "Evolution", category: "Live Casino", hot: false, image: imgLightningRoulette },
  { name: "Mines", provider: "Custom", category: "Mini Games", hot: false, image: imgMines },
  { name: "Plinko", provider: "Custom", category: "Mini Games", hot: true, image: imgPlinko },
  { name: "Dice", provider: "Custom", category: "Mini Games", hot: false, image: imgDice },
];

const popularGames = [
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", hot: true, image: imgBigBass },
  { name: "Starburst", provider: "NetEnt", hot: true, image: imgStarburst },
  { name: "Cricket Betting", provider: "BD678 Sports", hot: true, image: imgCricket },
  { name: "Football", provider: "BD678 Sports", hot: false, image: imgFootball },
  { name: "Sweet Bonanza", provider: "Pragmatic Play", hot: true, image: imgSweetBonanza },
  { name: "Gates of Olympus", provider: "Pragmatic Play", hot: false, image: imgGatesOfOlympus },
];

const Index = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Marquee Ticker */}
      <div className="bg-card border-b border-border overflow-hidden">
        <div className="py-2 flex">
          <div className="marquee-scroll flex gap-12 whitespace-nowrap">
            {[...marqueeMessages, ...marqueeMessages].map((msg, i) => (
              <span key={i} className="text-sm text-secondary font-medium">{msg}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Carousel with Images */}
      <section className="relative overflow-hidden">
        <div className="relative h-[200px] sm:h-[280px] md:h-[380px] lg:h-[420px]">
          {bannerSlides.map((slide, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              style={{ pointerEvents: i === currentSlide ? "auto" : "none" }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-4">
                <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-black mb-1 text-secondary neon-text-gold text-center drop-shadow-lg">
                  {language === "bn" ? slide.titleBn : slide.title}
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/90 mb-4 text-center drop-shadow">
                  {language === "bn" ? slide.subtitleBn : slide.subtitle}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {user ? (
                    <Button
                      size="lg"
                      onClick={() => navigate("/games/slots")}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display text-base rounded-full px-8 neon-glow-gold"
                    >
                      {t("playNow")}
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        onClick={() => navigate("/register")}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display text-base rounded-full px-8 neon-glow-gold"
                      >
                        {t("joinNow")}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="border-primary-foreground/40 text-primary-foreground hover:bg-primary/40 font-display text-base rounded-full px-8"
                      >
                        {t("login")}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? "bg-secondary w-6" : "bg-primary-foreground/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Jackpot Counter */}
      <section className="bg-gradient-to-r from-card via-primary/20 to-card border-y border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4">
          <Crown className="h-8 w-8 text-secondary animate-pulse" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Jackpot</p>
            <p className="font-display text-2xl md:text-3xl font-black text-secondary neon-text-gold">
              ৳ 12,458,392
            </p>
          </div>
          <Crown className="h-8 w-8 text-secondary animate-pulse" />
        </div>
      </section>

      {/* Game Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold">{t("allGames")}</h2>
          <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80">
            {language === "bn" ? "সব দেখুন" : "View All"} <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {gameCategories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className="cursor-pointer border-border hover:border-secondary/60 transition-all group bg-gradient-to-b from-card to-muted"
                onClick={() => navigate(cat.href)}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                    <cat.icon className={`h-6 w-6 ${cat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <span className="font-display text-xs font-semibold text-center">{t(cat.key)}</span>
                  <span className="text-[10px] text-muted-foreground">{cat.count}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hot Games */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-5 w-5 text-destructive" />
          <h2 className="font-display text-xl font-bold">{t("featuredGames")}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {featuredGames.map((game, i) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {game.hot && (
                    <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <Flame className="h-3 w-3" /> HOT
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-card/80 text-[10px] font-semibold px-2 py-0.5 rounded text-muted-foreground">
                    {game.category}
                  </span>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-sm truncate">{game.name}</p>
                  <p className="text-xs text-muted-foreground">{game.provider}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Games */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-5 w-5 text-secondary" />
          <h2 className="font-display text-xl font-bold">
            {language === "bn" ? "জনপ্রিয় গেমস" : "Popular Games"}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {popularGames.map((game, i) => (
            <motion.div
              key={game.name + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card">
                <div className="aspect-square relative overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {game.hot && (
                    <span className="absolute top-1.5 right-1.5 bg-destructive text-destructive-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      🔥
                    </span>
                  )}
                </div>
                <CardContent className="p-2">
                  <p className="font-semibold text-xs truncate">{game.name}</p>
                  <p className="text-[10px] text-muted-foreground">{game.provider}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Gift className="h-5 w-5 text-secondary" />
          <h2 className="font-display text-xl font-bold">{t("promotions")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: language === "bn" ? "স্বাগত বোনাস ৳৮,৮৮৮" : "Welcome Bonus ৳8,888", desc: language === "bn" ? "প্রথম জমায় ১০০% বোনাস" : "100% on first deposit" },
            { title: language === "bn" ? "দৈনিক ক্যাশব্যাক" : "Daily Cashback", desc: language === "bn" ? "প্রতিদিন ৫% পর্যন্ত ক্যাশব্যাক" : "Up to 5% cashback daily" },
            { title: language === "bn" ? "রেফারেল বোনাস ৳৩০০" : "Referral Bonus ৳300", desc: language === "bn" ? "প্রতি বন্ধু আমন্ত্রণে বোনাস" : "Bonus for every friend invited" },
          ].map((promo, i) => (
            <Card key={i} className="border-secondary/30 bg-gradient-to-br from-card to-primary/10 hover:border-secondary/60 transition-all cursor-pointer">
              <CardContent className="p-5">
                <Gift className="h-8 w-8 text-secondary mb-3" />
                <h3 className="font-display text-base font-bold text-secondary mb-1">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/80 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-display text-secondary neon-text-gold text-xl mb-2">BD678</p>
          <p>© 2025 BD678. All rights reserved. 18+ Gamble responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

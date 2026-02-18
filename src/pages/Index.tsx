import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, TrendingUp, Zap, Star, Gift, Crown, Flame, ChevronRight, Fish, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

const hotGames = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", image: imgSweetBonanza },
  { name: "Crazy Time", provider: "Evolution", image: imgCrazyTime },
  { name: "Aviator", provider: "Spribe", image: imgAviator },
  { name: "Gates of Olympus", provider: "Pragmatic Play", image: imgGatesOfOlympus },
  { name: "Lightning Roulette", provider: "Evolution", image: imgLightningRoulette },
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", image: imgBigBass },
  { name: "Starburst", provider: "NetEnt", image: imgStarburst },
  { name: "Plinko", provider: "Custom", image: imgPlinko },
];

const slotGames = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", image: imgSweetBonanza },
  { name: "Gates of Olympus", provider: "Pragmatic Play", image: imgGatesOfOlympus },
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", image: imgBigBass },
  { name: "Starburst", provider: "NetEnt", image: imgStarburst },
  { name: "Plinko", provider: "Custom", image: imgPlinko },
  { name: "Mines", provider: "Custom", image: imgMines },
];

const liveCasinoGames = [
  { name: "Crazy Time", provider: "Evolution", image: imgCrazyTime },
  { name: "Lightning Roulette", provider: "Evolution", image: imgLightningRoulette },
  { name: "Sweet Bonanza", provider: "Pragmatic Play", image: imgSweetBonanza },
  { name: "Gates of Olympus", provider: "Pragmatic Play", image: imgGatesOfOlympus },
];

const crashGames = [
  { name: "Aviator", provider: "Spribe", image: imgAviator },
  { name: "Mines", provider: "Custom", image: imgMines },
  { name: "Dice", provider: "Custom", image: imgDice },
  { name: "Plinko", provider: "Custom", image: imgPlinko },
];

const sportsGames = [
  { name: "Cricket Betting", provider: "CK444 Sports", image: imgCricket },
  { name: "Football", provider: "CK444 Sports", image: imgFootball },
  { name: "Cricket Live", provider: "CK444 Sports", image: imgCricket },
  { name: "Football Live", provider: "CK444 Sports", image: imgFootball },
];

const gameCategories = [
  { icon: Gamepad2, key: "slotsCategory" as const, color: "text-secondary", href: "/games/slots", count: "500+" },
  { icon: Trophy, key: "liveCasinoCategory" as const, color: "text-primary-foreground", href: "/games/live-casino", count: "200+" },
  { icon: TrendingUp, key: "sportsCategory" as const, color: "text-secondary", href: "/games/sports", count: "1000+" },
  { icon: Zap, key: "crashCategory" as const, color: "text-primary-foreground", href: "/games/crash", count: "50+" },
  { icon: Star, key: "miniGames" as const, color: "text-secondary", href: "/games/mini", count: "100+" },
];

// Horizontal scrolling game row
const GameRow = ({ title, titleBn, icon: Icon, games, href, iconColor = "text-secondary" }: {
  title: string;
  titleBn: string;
  icon: any;
  games: { name: string; provider: string; image: string }[];
  href: string;
  iconColor?: string;
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <h2 className="font-display text-base md:text-lg font-bold">{language === "bn" ? titleBn : title}</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80 text-xs" onClick={() => navigate(href)}>
          {language === "bn" ? "সব দেখুন" : "View All"} <ChevronRight className="h-3 w-3 ml-0.5" />
        </Button>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {games.map((game, i) => (
          <div key={game.name + i} className="shrink-0 w-[130px] sm:w-[150px] md:w-[160px] snap-start">
            <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-[10px] font-bold text-secondary bg-background/60 px-2 py-0.5 rounded-full">
                    {language === "bn" ? "খেলুন" : "Play"}
                  </span>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="font-semibold text-xs truncate">{game.name}</p>
                <p className="text-[10px] text-muted-foreground">{game.provider}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

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

  const BannerCarousel = () => (
    <section className="relative px-2 sm:px-3 py-2 md:py-3">
      <div className="relative rounded-xl overflow-hidden border-2 border-secondary/60 shadow-[0_0_20px_hsl(40_100%_50%/0.25)]">
        <div className="absolute top-0 left-0 w-6 h-6 md:w-10 md:h-10 border-t-[3px] border-l-[3px] border-secondary rounded-tl-xl z-10" />
        <div className="absolute top-0 right-0 w-6 h-6 md:w-10 md:h-10 border-t-[3px] border-r-[3px] border-secondary rounded-tr-xl z-10" />
        <div className="absolute bottom-0 left-0 w-6 h-6 md:w-10 md:h-10 border-b-[3px] border-l-[3px] border-secondary rounded-bl-xl z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 md:w-10 md:h-10 border-b-[3px] border-r-[3px] border-secondary rounded-br-xl z-10" />

        <div className={user ? "relative h-[160px] sm:h-[200px] md:h-[300px] lg:h-[340px]" : "relative h-[180px] sm:h-[260px] md:h-[360px] lg:h-[440px]"}>
          {bannerSlides.map((slide, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === currentSlide ? 1 : 0, scale: i === currentSlide ? 1 : 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ pointerEvents: i === currentSlide ? "auto" : "none" }}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-5 md:p-8 lg:p-10">
                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-display text-sm sm:text-xl md:text-3xl lg:text-4xl font-black mb-1 text-secondary neon-text-gold drop-shadow-lg max-w-[85%] md:max-w-[60%] leading-tight"
                >
                  {language === "bn" ? slide.titleBn : slide.title}
                </motion.h1>
                <motion.p
                  key={`sub-${currentSlide}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-[10px] sm:text-xs md:text-sm text-foreground/90 mb-2 md:mb-4 drop-shadow max-w-[80%] md:max-w-[50%]"
                >
                  {language === "bn" ? slide.subtitleBn : slide.subtitle}
                </motion.p>
                {!user && (
                  <motion.div
                    key={`btn-${currentSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <Button
                      size="sm"
                      onClick={() => navigate("/register")}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display text-xs md:text-sm rounded-full px-5 md:px-7 neon-glow-gold"
                    >
                      {t("joinNow")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate("/login")}
                      className="border-foreground/30 text-foreground hover:bg-primary/40 font-display text-xs md:text-sm rounded-full px-5 md:px-7"
                    >
                      {t("login")}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-2 md:bottom-3 right-3 md:right-5 flex gap-1.5 z-20">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-secondary w-5 neon-glow-gold" : "bg-foreground/30 w-1.5 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );

  // LOGGED IN LAYOUT
  if (user) {
    return (
      <>
        <BannerCarousel />

        {/* Quick category pills */}
        <div className="flex gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
          {[
            { icon: Flame, label: language === "bn" ? "হট" : "Hot", color: "bg-destructive/20 text-destructive border-destructive/30" },
            { icon: Gamepad2, label: language === "bn" ? "স্লটস" : "Slots", color: "bg-secondary/15 text-secondary border-secondary/30" },
            { icon: Trophy, label: language === "bn" ? "লাইভ" : "Live", color: "bg-primary/20 text-primary-foreground border-primary/30" },
            { icon: Zap, label: language === "bn" ? "ক্র্যাশ" : "Crash", color: "bg-accent/15 text-accent border-accent/30" },
            { icon: TrendingUp, label: language === "bn" ? "স্পোর্টস" : "Sports", color: "bg-neon-green/15 text-neon-green border-neon-green/30" },
            { icon: Star, label: language === "bn" ? "মিনি" : "Mini", color: "bg-neon-purple/15 text-neon-purple border-neon-purple/30" },
          ].map((cat) => (
            <button key={cat.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shrink-0 transition-all hover:scale-105 ${cat.color}`}>
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Game sections */}
        <div className="px-3">
          <GameRow title="Hot Games" titleBn="হট গেমস" icon={Flame} games={hotGames} href="/games/hot" iconColor="text-destructive" />
          <GameRow title="Slots" titleBn="স্লটস" icon={Gamepad2} games={slotGames} href="/games/slots" />
          <GameRow title="Live Casino" titleBn="লাইভ ক্যাসিনো" icon={Trophy} games={liveCasinoGames} href="/games/live-casino" iconColor="text-neon-gold" />
          <GameRow title="Crash Games" titleBn="ক্র্যাশ গেমস" icon={Zap} games={crashGames} href="/games/crash" iconColor="text-accent" />
          <GameRow title="Sports" titleBn="স্পোর্টস" icon={TrendingUp} games={sportsGames} href="/games/sports" iconColor="text-neon-green" />
        </div>

        {/* Jackpot */}
        <section className="mx-3 my-6 rounded-xl bg-gradient-to-r from-secondary/10 via-secondary/20 to-secondary/10 border border-secondary/30 py-5">
          <div className="flex items-center justify-center gap-4">
            <Crown className="h-8 w-8 text-secondary animate-pulse" />
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Jackpot</p>
              <p className="font-display text-2xl md:text-3xl font-black text-secondary neon-text-gold">
                ৳ 420,704,740.30
              </p>
            </div>
            <Crown className="h-8 w-8 text-secondary animate-pulse" />
          </div>
        </section>

        {/* Promos */}
        <section className="px-3 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="h-5 w-5 text-secondary" />
            <h2 className="font-display text-base md:text-lg font-bold">{t("promotions")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: language === "bn" ? "স্বাগত বোনাস ৳৮,৮৮৮" : "Welcome Bonus ৳8,888", desc: language === "bn" ? "প্রথম জমায় ১০০% বোনাস" : "100% on first deposit" },
              { title: language === "bn" ? "দৈনিক ক্যাশব্যাক" : "Daily Cashback", desc: language === "bn" ? "প্রতিদিন ৫% পর্যন্ত ক্যাশব্যাক" : "Up to 5% cashback daily" },
              { title: language === "bn" ? "রেফারেল বোনাস ৳৩০০" : "Referral Bonus ৳300", desc: language === "bn" ? "প্রতি বন্ধু আমন্ত্রণে বোনাস" : "Bonus for every friend invited" },
            ].map((promo, i) => (
              <Card key={i} className="border-secondary/30 bg-gradient-to-br from-card to-primary/10 hover:border-secondary/60 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <Gift className="h-6 w-6 text-secondary mb-2" />
                  <h3 className="font-display text-sm font-bold text-secondary mb-1">{promo.title}</h3>
                  <p className="text-xs text-muted-foreground">{promo.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/80 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-display text-secondary neon-text-gold text-lg mb-1">CK444</p>
            <p className="text-xs">© 2026 CK444. All rights reserved. 18+ Gamble responsibly.</p>
          </div>
        </footer>
      </>
    );
  }

  // GUEST LAYOUT
  return (
    <>
      <BannerCarousel />

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
          {hotGames.map((game, i) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
          {[
            { name: "Big Bass Bonanza", provider: "Pragmatic Play", image: imgBigBass },
            { name: "Starburst", provider: "NetEnt", image: imgStarburst },
            { name: "Cricket Betting", provider: "CK444 Sports", image: imgCricket },
            { name: "Football", provider: "CK444 Sports", image: imgFootball },
            { name: "Sweet Bonanza", provider: "Pragmatic Play", image: imgSweetBonanza },
            { name: "Gates of Olympus", provider: "Pragmatic Play", image: imgGatesOfOlympus },
          ].map((game, i) => (
            <motion.div
              key={game.name + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card">
                <div className="aspect-square relative overflow-hidden">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

      {/* Promotions */}
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
          <p className="font-display text-secondary neon-text-gold text-xl mb-2">CK444</p>
          <p>© 2026 CK444. All rights reserved. 18+ Gamble responsibly.</p>
        </div>
      </footer>
    </>
  );
};

export default Index;

import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Trophy, TrendingUp, Zap, Star, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";

const gameCategories = [
  { icon: Gamepad2, key: "slotsCategory" as const, color: "text-neon-green", glow: "neon-glow-green", href: "/games/slots", count: "500+" },
  { icon: Trophy, key: "liveCasinoCategory" as const, color: "text-neon-purple", glow: "neon-glow-purple", href: "/games/live-casino", count: "200+" },
  { icon: TrendingUp, key: "sportsCategory" as const, color: "text-neon-gold", glow: "neon-glow-gold", href: "/games/sports", count: "1000+" },
  { icon: Zap, key: "crashCategory" as const, color: "text-neon-cyan", glow: "", href: "/games/crash", count: "50+" },
  { icon: Star, key: "miniGames" as const, color: "text-neon-pink", glow: "", href: "/games/mini", count: "100+" },
];

const featuredGames = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", category: "Slots", hot: true },
  { name: "Crazy Time", provider: "Evolution", category: "Live Casino", hot: true },
  { name: "Aviator", provider: "Spribe", category: "Crash", hot: false },
  { name: "Gates of Olympus", provider: "Pragmatic Play", category: "Slots", hot: true },
  { name: "Lightning Roulette", provider: "Evolution", category: "Live Casino", hot: false },
  { name: "Mines", provider: "Custom", category: "Mini Games", hot: false },
  { name: "Plinko", provider: "Custom", category: "Mini Games", hot: true },
  { name: "Dice", provider: "Custom", category: "Mini Games", hot: false },
];

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-casino">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(270_80%_55%_/_0.15),_transparent_70%)]" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 neon-text-green text-primary">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t("heroSubtitle")}
            </p>
            <div className="flex items-center justify-center gap-4">
              {user ? (
                <Button
                  size="lg"
                  onClick={() => navigate("/games/slots")}
                  className="font-display text-lg neon-glow-green px-8"
                >
                  {t("playNow")}
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate("/register")}
                    className="font-display text-lg neon-glow-green px-8"
                  >
                    {t("joinNow")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="font-display text-lg px-8"
                  >
                    {t("login")}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="bg-gradient-to-r from-secondary/20 via-primary/10 to-accent/20 border-y border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 text-sm">
            <Gift className="h-5 w-5 text-accent animate-pulse-neon" />
            <span className="text-accent font-semibold">🎁 Welcome Bonus: 100% up to ৳10,000 on first deposit!</span>
            <Gift className="h-5 w-5 text-accent animate-pulse-neon" />
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold mb-8 text-center">{t("allGames")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {gameCategories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`cursor-pointer border-border hover:border-primary/50 transition-all ${cat.glow} group`}
                onClick={() => navigate(cat.href)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                  <cat.icon className={`h-10 w-10 ${cat.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-display text-sm font-semibold">{t(cat.key)}</span>
                  <span className="text-xs text-muted-foreground">{cat.count} Games</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Games Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold mb-8">{t("featuredGames")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredGames.map((game, i) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="cursor-pointer border-border hover:border-primary/50 transition-all group overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-card flex items-center justify-center relative">
                  <Gamepad2 className="h-12 w-12 text-muted-foreground/30" />
                  {game.hot && (
                    <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                      🔥 HOT
                    </span>
                  )}
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

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-display text-primary neon-text-green text-lg mb-2">🎰 CASINO</p>
          <p>© 2024 Casino. All rights reserved. 18+ Gamble responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

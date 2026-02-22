import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import CrashGame from "@/components/games/CrashGame";
import CoinFlipGame from "@/components/games/CoinFlipGame";
import MinesGame from "@/components/games/MinesGame";
import DiceGame from "@/components/games/DiceGame";

// Map of playable game slugs to components
const playableGames: Record<string, { component: React.FC; name: string; nameBn: string }> = {
  "aviator": { component: CrashGame, name: "Aviator", nameBn: "অ্যাভিয়েটর" },
  "crash": { component: CrashGame, name: "Crash", nameBn: "ক্র্যাশ" },
  "jetx": { component: CrashGame, name: "JetX", nameBn: "জেটএক্স" },
  "spaceman": { component: CrashGame, name: "Spaceman", nameBn: "স্পেসম্যান" },
  "crash-x": { component: CrashGame, name: "Crash X", nameBn: "ক্র্যাশ এক্স" },
  "coin-flip": { component: CoinFlipGame, name: "Coin Flip", nameBn: "কয়েন ফ্লিপ" },
  "mines": { component: MinesGame, name: "Mines", nameBn: "মাইনস" },
  "dice": { component: DiceGame, name: "Dice", nameBn: "ডাইস" },
  "dice-roll": { component: DiceGame, name: "Dice Roll", nameBn: "ডাইস রোল" },
  "plinko": { component: DiceGame, name: "Plinko", nameBn: "প্লিংকো" },
  "rocket-blast": { component: CrashGame, name: "Rocket Blast", nameBn: "রকেট ব্লাস্ট" },
  "lucky-jet": { component: CrashGame, name: "Lucky Jet", nameBn: "লাকি জেট" },
  "thunder-crash": { component: CrashGame, name: "Thunder Crash", nameBn: "থান্ডার ক্র্যাশ" },
  "balloon": { component: CrashGame, name: "Balloon", nameBn: "বেলুন" },
  "zeppelin": { component: CrashGame, name: "Zeppelin", nameBn: "জেপেলিন" },
};

// Convert game name to slug
export const gameNameToSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};

export const isPlayable = (name: string): boolean => {
  return gameNameToSlug(name) in playableGames;
};

const GamePlayPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const bn = language === "bn";

  const game = slug ? playableGames[slug] : null;

  if (!game) {
    // Coming Soon page
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <Clock className="h-16 w-16 text-secondary mb-4" />
        <h1 className="font-display text-2xl font-bold text-secondary mb-2">
          {bn ? "শীঘ্রই আসছে" : "Coming Soon"}
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          {bn
            ? "এই গেমটি শীঘ্রই চালু হবে। অনুগ্রহ করে অপেক্ষা করুন!"
            : "This game will be available soon. Stay tuned!"}
        </p>
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> {bn ? "ফিরে যান" : "Go Back"}
        </Button>
      </div>
    );
  }

  const GameComponent = game.component;

  return (
    <div className="py-2">
      <div className="flex items-center gap-3 px-4 mb-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-display text-lg font-bold text-secondary">
          {bn ? game.nameBn : game.name}
        </h1>
      </div>
      <GameComponent />
    </div>
  );
};

export default GamePlayPage;

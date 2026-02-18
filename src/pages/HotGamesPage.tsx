import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Gamepad2 } from "lucide-react";

import imgSweetBonanza from "@/assets/games/sweet-bonanza.jpg";
import imgCrazyTime from "@/assets/games/crazy-time.jpg";
import imgAviator from "@/assets/games/aviator.jpg";
import imgGatesOfOlympus from "@/assets/games/gates-of-olympus.jpg";
import imgLightningRoulette from "@/assets/games/lightning-roulette.jpg";
import imgBigBass from "@/assets/games/big-bass.jpg";
import imgStarburst from "@/assets/games/starburst.jpg";
import imgPlinko from "@/assets/games/plinko.jpg";
import imgMines from "@/assets/games/mines.jpg";
import imgDice from "@/assets/games/dice.jpg";

const hotGames = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", image: imgSweetBonanza },
  { name: "Crazy Time", provider: "Evolution", image: imgCrazyTime },
  { name: "Aviator", provider: "Spribe", image: imgAviator },
  { name: "Gates of Olympus", provider: "Pragmatic Play", image: imgGatesOfOlympus },
  { name: "Lightning Roulette", provider: "Evolution", image: imgLightningRoulette },
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", image: imgBigBass },
  { name: "Starburst", provider: "NetEnt", image: imgStarburst },
  { name: "Plinko", provider: "Custom", image: imgPlinko },
  { name: "Mines", provider: "Custom", image: imgMines },
  { name: "Dice", provider: "Custom", image: imgDice },
];

const HotGamesPage = () => {
  const { language } = useLanguage();
  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="h-6 w-6 text-destructive" />
        <h1 className="font-display text-2xl font-black text-secondary neon-text-gold">
          {language === "bn" ? "হট গেমস" : "Hot Games"}
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {hotGames.map((game, i) => (
          <motion.div key={game.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
            <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Flame className="h-3 w-3" /> HOT
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
    </div>
  );
};

export default HotGamesPage;

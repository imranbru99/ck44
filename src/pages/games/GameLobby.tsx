import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Gamepad2, Flame, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameNameToSlug, isPlayable } from "./GamePlayPage";

interface GameLobbyProps {
  category: string;
  categoryBn: string;
  games: { name: string; provider: string; hot?: boolean; image?: string }[];
}

const GameLobby = ({ category, categoryBn, games }: GameLobbyProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-black text-secondary neon-text-gold">
          {language === "bn" ? categoryBn : category}
        </h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === "bn" ? "গেম খুঁজুন..." : "Search games..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((game, i) => (
          <motion.div
            key={game.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="cursor-pointer border-border hover:border-secondary/50 transition-all group overflow-hidden bg-card"
              onClick={() => navigate(`/play/${gameNameToSlug(game.name)}`)}>
              <div className="aspect-[4/3] relative overflow-hidden">
                {game.image ? (
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-muted to-card flex items-center justify-center">
                    <Gamepad2 className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                {game.hot && (
                  <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <Flame className="h-3 w-3" /> HOT
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
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          {language === "bn" ? "কোনো গেম পাওয়া যায়নি" : "No games found"}
        </div>
      )}
    </div>
  );
};

export default GameLobby;

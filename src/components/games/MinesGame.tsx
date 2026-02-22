import { useState, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Bomb, Gem } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const BET_AMOUNTS = [10, 20, 50, 100, 200, 500];
const GRID_SIZE = 25; // 5x5
const MINE_OPTIONS = [1, 3, 5, 7, 10];

// Multiplier table: based on mines count and tiles revealed
const getMultiplier = (mines: number, revealed: number): number => {
  if (revealed === 0) return 1;
  const safe = GRID_SIZE - mines;
  let mult = 1;
  for (let i = 0; i < revealed; i++) {
    mult *= (safe - i) / (GRID_SIZE - i);
  }
  return Math.floor((0.97 / mult) * 100) / 100; // 3% house edge
};

type TileState = "hidden" | "safe" | "mine";

const MinesGame = () => {
  const { language } = useLanguage();
  const { balance, updateBalance } = useWallet();
  const bn = language === "bn";

  const [betAmount, setBetAmount] = useState(10);
  const [customBet, setCustomBet] = useState("");
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle");
  const [tiles, setTiles] = useState<TileState[]>(Array(GRID_SIZE).fill("hidden"));
  const [minePositions, setMinePositions] = useState<Set<number>>(new Set());
  const [revealedCount, setRevealedCount] = useState(0);

  const finalBet = Number(customBet) || betAmount;
  const currentMultiplier = getMultiplier(mineCount, revealedCount);
  const nextMultiplier = getMultiplier(mineCount, revealedCount + 1);

  const startGame = async () => {
    if (finalBet > balance || finalBet < 1) {
      toast.error(bn ? "অপর্যাপ্ত ব্যালেন্স" : "Insufficient balance");
      return;
    }
    const success = await updateBalance(-finalBet);
    if (!success) return;

    // Place mines randomly
    const positions = new Set<number>();
    while (positions.size < mineCount) {
      positions.add(Math.floor(Math.random() * GRID_SIZE));
    }
    setMinePositions(positions);
    setTiles(Array(GRID_SIZE).fill("hidden"));
    setRevealedCount(0);
    setGameState("playing");
  };

  const revealTile = (index: number) => {
    if (gameState !== "playing" || tiles[index] !== "hidden") return;

    const newTiles = [...tiles];
    if (minePositions.has(index)) {
      // Hit mine - reveal all
      newTiles[index] = "mine";
      minePositions.forEach((pos) => { newTiles[pos] = "mine"; });
      setTiles(newTiles);
      setGameState("lost");
      toast.error(bn ? "মাইনে পড়েছেন!" : "You hit a mine!");
    } else {
      newTiles[index] = "safe";
      const newCount = revealedCount + 1;
      setTiles(newTiles);
      setRevealedCount(newCount);

      // Check if all safe tiles revealed
      if (newCount >= GRID_SIZE - mineCount) {
        cashOut(newCount);
      }
    }
  };

  const cashOut = async (count?: number) => {
    const c = count || revealedCount;
    if (c === 0) return;
    const mult = getMultiplier(mineCount, c);
    const winnings = Math.floor(finalBet * mult * 100) / 100;
    const profit = Math.floor((winnings - finalBet) * 100) / 100;
    await updateBalance(winnings);
    
    // Reveal all mines
    const newTiles = [...tiles];
    minePositions.forEach((pos) => { if (newTiles[pos] === "hidden") newTiles[pos] = "mine"; });
    setTiles(newTiles);
    
    setGameState("won");
    toast.success(`${bn ? "জিতেছেন" : "Won"} ৳${profit.toFixed(2)}!`);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="h-4 w-4 text-secondary" />
        <span>{bn ? "ব্যালেন্স" : "Balance"}: <span className="text-secondary font-bold">৳{balance.toFixed(2)}</span></span>
      </div>

      {/* Grid */}
      <Card className="border-border">
        <CardContent className="p-3">
          <div className="grid grid-cols-5 gap-1.5">
            {tiles.map((tile, i) => (
              <button
                key={i}
                onClick={() => revealTile(i)}
                disabled={gameState !== "playing" || tile !== "hidden"}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-lg font-bold transition-all",
                  tile === "hidden" && gameState === "playing" && "bg-muted hover:bg-muted/80 cursor-pointer hover:scale-105 active:scale-95",
                  tile === "hidden" && gameState !== "playing" && "bg-muted/50",
                  tile === "safe" && "bg-green-600/30 border border-green-500/50",
                  tile === "mine" && "bg-destructive/30 border border-destructive/50"
                )}
              >
                {tile === "safe" && <Gem className="h-5 w-5 text-green-400" />}
                {tile === "mine" && <Bomb className="h-5 w-5 text-destructive" />}
              </button>
            ))}
          </div>

          {gameState === "playing" && revealedCount > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {currentMultiplier.toFixed(2)}x → <span className="text-secondary">{nextMultiplier.toFixed(2)}x</span>
              </span>
              <Button onClick={() => cashOut()} size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold">
                {bn ? "ক্যাশ আউট" : "Cash Out"} ৳{(finalBet * currentMultiplier).toFixed(2)}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground shrink-0">{bn ? "মাইন:" : "Mines:"}</span>
            <div className="flex gap-1.5 flex-wrap">
              {MINE_OPTIONS.map((m) => (
                <Button key={m} variant={mineCount === m ? "default" : "outline"} size="sm"
                  className={mineCount === m ? "bg-destructive text-destructive-foreground" : ""}
                  onClick={() => setMineCount(m)} disabled={gameState === "playing"}>
                  {m}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {BET_AMOUNTS.map((a) => (
              <Button key={a} variant={betAmount === a && !customBet ? "default" : "outline"} size="sm"
                className={betAmount === a && !customBet ? "bg-secondary text-secondary-foreground" : ""}
                onClick={() => { setBetAmount(a); setCustomBet(""); }} disabled={gameState === "playing"}>
                ৳{a}
              </Button>
            ))}
          </div>
          <Input type="number" placeholder={bn ? "কাস্টম বাজি" : "Custom bet"} value={customBet}
            onChange={(e) => setCustomBet(e.target.value)} disabled={gameState === "playing"} className="bg-card" />
          <Button onClick={startGame} disabled={gameState === "playing" || finalBet < 1 || finalBet > balance}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-14">
            {gameState === "playing" ? (bn ? "খেলা চলছে..." : "Playing...") : `${bn ? "বাজি ধরুন" : "BET"} ৳${finalBet}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinesGame;

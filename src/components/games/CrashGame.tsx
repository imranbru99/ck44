import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const BET_AMOUNTS = [10, 20, 50, 100, 200, 500];

const CrashGame = () => {
  const { language } = useLanguage();
  const { balance, updateBalance } = useWallet();
  const bn = language === "bn";

  const [betAmount, setBetAmount] = useState(10);
  const [customBet, setCustomBet] = useState("");
  const [gameState, setGameState] = useState<"idle" | "running" | "crashed" | "cashed_out">("idle");
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashPoint, setCrashPoint] = useState(0);
  const [profit, setProfit] = useState(0);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  const generateCrashPoint = () => {
    // House edge ~3%: E = 0.97
    const r = Math.random();
    if (r < 0.03) return 1.0; // instant crash 3%
    return Math.max(1.0, Math.floor((0.97 / (1 - r)) * 100) / 100);
  };

  const finalBet = Number(customBet) || betAmount;

  const startGame = async () => {
    if (finalBet > balance) {
      toast.error(bn ? "অপর্যাপ্ত ব্যালেন্স" : "Insufficient balance");
      return;
    }
    if (finalBet < 1) return;

    const success = await updateBalance(-finalBet);
    if (!success) return;

    const cp = generateCrashPoint();
    setCrashPoint(cp);
    setMultiplier(1.0);
    setGameState("running");
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const currentMult = Math.pow(Math.E, 0.08 * elapsed);
      const rounded = Math.floor(currentMult * 100) / 100;

      if (rounded >= cp) {
        setMultiplier(cp);
        setGameState("crashed");
        return;
      }

      setMultiplier(rounded);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
  };

  const cashOut = async () => {
    if (gameState !== "running") return;
    cancelAnimationFrame(animRef.current);
    const winnings = Math.floor(finalBet * multiplier * 100) / 100;
    const p = Math.floor((winnings - finalBet) * 100) / 100;
    setProfit(p);
    await updateBalance(winnings);
    setGameState("cashed_out");
    toast.success(`${bn ? "জিতেছেন" : "Won"} ৳${p.toFixed(2)}!`);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const getMultiplierColor = () => {
    if (gameState === "crashed") return "text-destructive";
    if (gameState === "cashed_out") return "text-green-400";
    if (multiplier >= 5) return "text-green-400";
    if (multiplier >= 2) return "text-secondary";
    return "text-foreground";
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Balance */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="h-4 w-4 text-secondary" />
        <span>{bn ? "ব্যালেন্স" : "Balance"}: <span className="text-secondary font-bold">৳{balance.toFixed(2)}</span></span>
      </div>

      {/* Game display */}
      <Card className="border-border bg-gradient-to-b from-card to-background overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[250px] sm:h-[300px] flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]">
            <div className={`font-display text-6xl sm:text-8xl font-black transition-colors ${getMultiplierColor()}`}>
              {multiplier.toFixed(2)}x
            </div>
            {gameState === "crashed" && (
              <p className="text-destructive font-bold text-lg mt-2 animate-pulse">
                {bn ? "ক্র্যাশ হয়েছে!" : "CRASHED!"}
              </p>
            )}
            {gameState === "cashed_out" && (
              <p className="text-green-400 font-bold text-lg mt-2">
                +৳{profit.toFixed(2)}
              </p>
            )}
            {gameState === "idle" && (
              <p className="text-muted-foreground text-sm mt-4">
                {bn ? "বাজি ধরুন এবং শুরু করুন" : "Place your bet and start"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {BET_AMOUNTS.map((a) => (
              <Button
                key={a}
                variant={betAmount === a && !customBet ? "default" : "outline"}
                size="sm"
                className={betAmount === a && !customBet ? "bg-secondary text-secondary-foreground" : ""}
                onClick={() => { setBetAmount(a); setCustomBet(""); }}
                disabled={gameState === "running"}
              >
                ৳{a}
              </Button>
            ))}
          </div>
          <Input
            type="number"
            placeholder={bn ? "কাস্টম বাজি" : "Custom bet"}
            value={customBet}
            onChange={(e) => setCustomBet(e.target.value)}
            disabled={gameState === "running"}
            className="bg-card"
          />

          {gameState === "running" ? (
            <Button
              onClick={cashOut}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              {bn ? "ক্যাশ আউট" : "CASH OUT"} @ {multiplier.toFixed(2)}x
            </Button>
          ) : (
            <Button
              onClick={startGame}
              disabled={finalBet < 1 || finalBet > balance}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-14"
            >
              {bn ? "বাজি ধরুন" : "BET"} ৳{finalBet}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CrashGame;

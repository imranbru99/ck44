import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Wallet, Dice1 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const BET_AMOUNTS = [10, 20, 50, 100, 200, 500];

const DiceGame = () => {
  const { language } = useLanguage();
  const { balance, updateBalance } = useWallet();
  const bn = language === "bn";

  const [betAmount, setBetAmount] = useState(10);
  const [customBet, setCustomBet] = useState("");
  const [target, setTarget] = useState(50);
  const [betOver, setBetOver] = useState(true); // true = roll over, false = roll under
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const finalBet = Number(customBet) || betAmount;

  // Win chance and multiplier
  const winChance = betOver ? (100 - target) : target;
  const multiplier = Math.floor((97 / winChance) * 100) / 100; // 3% house edge

  const rollDice = async () => {
    if (finalBet > balance || finalBet < 1) {
      toast.error(bn ? "অপর্যাপ্ত ব্যালেন্স" : "Insufficient balance");
      return;
    }

    const success = await updateBalance(-finalBet);
    if (!success) return;

    setRolling(true);
    setResult(null);
    setLastWin(null);

    const diceResult = Math.floor(Math.random() * 10000) / 100; // 0.00 - 99.99

    setTimeout(async () => {
      setResult(diceResult);
      setRolling(false);

      const won = betOver ? diceResult > target : diceResult < target;

      if (won) {
        const winnings = Math.floor(finalBet * multiplier * 100) / 100;
        const profit = Math.floor((winnings - finalBet) * 100) / 100;
        await updateBalance(winnings);
        setLastWin(profit);
        toast.success(`${bn ? "জিতেছেন" : "Won"} ৳${profit.toFixed(2)}!`);
      } else {
        setLastWin(-finalBet);
        toast.error(bn ? "হেরে গেছেন!" : "You lost!");
      }
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="h-4 w-4 text-secondary" />
        <span>{bn ? "ব্যালেন্স" : "Balance"}: <span className="text-secondary font-bold">৳{balance.toFixed(2)}</span></span>
      </div>

      {/* Result display */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="h-[200px] flex flex-col items-center justify-center">
            <motion.div
              className={`text-6xl font-display font-black ${
                result === null ? "text-muted-foreground" :
                lastWin !== null && lastWin > 0 ? "text-green-400" : "text-destructive"
              }`}
              animate={rolling ? { rotateX: [0, 360, 720] } : {}}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {rolling ? "??" : result !== null ? result.toFixed(2) : "00.00"}
            </motion.div>
            {lastWin !== null && !rolling && (
              <p className={`mt-2 font-bold ${lastWin > 0 ? "text-green-400" : "text-destructive"}`}>
                {lastWin > 0 ? `+৳${lastWin.toFixed(2)}` : `-৳${Math.abs(lastWin).toFixed(2)}`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Target slider */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <Button variant={!betOver ? "default" : "outline"} size="sm" onClick={() => setBetOver(false)}
              className={!betOver ? "bg-secondary text-secondary-foreground" : ""} disabled={rolling}>
              {bn ? "নিচে রোল" : "Roll Under"}
            </Button>
            <span className="font-bold text-lg text-secondary">{target}</span>
            <Button variant={betOver ? "default" : "outline"} size="sm" onClick={() => setBetOver(true)}
              className={betOver ? "bg-secondary text-secondary-foreground" : ""} disabled={rolling}>
              {bn ? "উপরে রোল" : "Roll Over"}
            </Button>
          </div>

          <Slider
            value={[target]}
            onValueChange={([v]) => setTarget(v)}
            min={5}
            max={95}
            step={1}
            disabled={rolling}
          />

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-muted rounded-lg p-2">
              <p className="text-muted-foreground">{bn ? "সম্ভাবনা" : "Win Chance"}</p>
              <p className="font-bold text-foreground">{winChance.toFixed(1)}%</p>
            </div>
            <div className="bg-muted rounded-lg p-2">
              <p className="text-muted-foreground">{bn ? "গুণক" : "Multiplier"}</p>
              <p className="font-bold text-secondary">{multiplier.toFixed(2)}x</p>
            </div>
            <div className="bg-muted rounded-lg p-2">
              <p className="text-muted-foreground">{bn ? "জেতার পরিমাণ" : "Win Amount"}</p>
              <p className="font-bold text-green-400">৳{(finalBet * multiplier).toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bet controls */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {BET_AMOUNTS.map((a) => (
              <Button key={a} variant={betAmount === a && !customBet ? "default" : "outline"} size="sm"
                className={betAmount === a && !customBet ? "bg-secondary text-secondary-foreground" : ""}
                onClick={() => { setBetAmount(a); setCustomBet(""); }} disabled={rolling}>
                ৳{a}
              </Button>
            ))}
          </div>
          <Input type="number" placeholder={bn ? "কাস্টম বাজি" : "Custom bet"} value={customBet}
            onChange={(e) => setCustomBet(e.target.value)} disabled={rolling} className="bg-card" />
          <Button onClick={rollDice} disabled={rolling || finalBet < 1 || finalBet > balance}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-14">
            {rolling ? (bn ? "ঘুরছে..." : "Rolling...") : `${bn ? "রোল করুন" : "ROLL"} ৳${finalBet}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiceGame;

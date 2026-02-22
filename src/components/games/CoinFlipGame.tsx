import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const BET_AMOUNTS = [10, 20, 50, 100, 200, 500];

const CoinFlipGame = () => {
  const { language } = useLanguage();
  const { balance, updateBalance } = useWallet();
  const bn = language === "bn";

  const [betAmount, setBetAmount] = useState(10);
  const [customBet, setCustomBet] = useState("");
  const [choice, setChoice] = useState<"heads" | "tails">("heads");
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const finalBet = Number(customBet) || betAmount;
  const PAYOUT = 1.96;

  const flipCoin = async () => {
    if (finalBet > balance || finalBet < 1) {
      toast.error(bn ? "অপর্যাপ্ত ব্যালেন্স" : "Insufficient balance");
      return;
    }

    const success = await updateBalance(-finalBet);
    if (!success) return;

    setFlipping(true);
    setResult(null);
    setLastWin(null);

    // Determine result (48% heads, 48% tails, 4% house edge effectively via 1.96x payout)
    const coinResult: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails";

    setTimeout(async () => {
      setResult(coinResult);
      setFlipping(false);

      if (coinResult === choice) {
        const winnings = Math.floor(finalBet * PAYOUT * 100) / 100;
        const profit = Math.floor((winnings - finalBet) * 100) / 100;
        await updateBalance(winnings);
        setLastWin(profit);
        toast.success(`${bn ? "জিতেছেন" : "Won"} ৳${profit.toFixed(2)}!`);
      } else {
        setLastWin(-finalBet);
        toast.error(bn ? "হেরে গেছেন!" : "You lost!");
      }
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="h-4 w-4 text-secondary" />
        <span>{bn ? "ব্যালেন্স" : "Balance"}: <span className="text-secondary font-bold">৳{balance.toFixed(2)}</span></span>
      </div>

      {/* Coin display */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="h-[250px] flex flex-col items-center justify-center">
            <motion.div
              className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-black border-4 ${
                result === null
                  ? "border-secondary bg-secondary/20 text-secondary"
                  : result === choice
                  ? "border-green-500 bg-green-500/20 text-green-400"
                  : "border-destructive bg-destructive/20 text-destructive"
              }`}
              animate={flipping ? { rotateY: [0, 360, 720, 1080] } : { rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {flipping ? "?" : result ? (result === "heads" ? "H" : "T") : "?"}
            </motion.div>

            {lastWin !== null && !flipping && (
              <p className={`mt-4 font-bold text-lg ${lastWin > 0 ? "text-green-400" : "text-destructive"}`}>
                {lastWin > 0 ? `+৳${lastWin.toFixed(2)}` : `-৳${Math.abs(lastWin).toFixed(2)}`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Choice */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={choice === "heads" ? "default" : "outline"}
          className={choice === "heads" ? "bg-secondary text-secondary-foreground font-bold h-12" : "h-12"}
          onClick={() => setChoice("heads")}
          disabled={flipping}
        >
          {bn ? "হেডস" : "HEADS"}
        </Button>
        <Button
          variant={choice === "tails" ? "default" : "outline"}
          className={choice === "tails" ? "bg-secondary text-secondary-foreground font-bold h-12" : "h-12"}
          onClick={() => setChoice("tails")}
          disabled={flipping}
        >
          {bn ? "টেইলস" : "TAILS"}
        </Button>
      </div>

      {/* Bet */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {BET_AMOUNTS.map((a) => (
              <Button key={a} variant={betAmount === a && !customBet ? "default" : "outline"} size="sm"
                className={betAmount === a && !customBet ? "bg-secondary text-secondary-foreground" : ""}
                onClick={() => { setBetAmount(a); setCustomBet(""); }} disabled={flipping}
              >৳{a}</Button>
            ))}
          </div>
          <Input type="number" placeholder={bn ? "কাস্টম বাজি" : "Custom bet"} value={customBet}
            onChange={(e) => setCustomBet(e.target.value)} disabled={flipping} className="bg-card" />
          <p className="text-xs text-muted-foreground text-center">{bn ? "পেআউট" : "Payout"}: {PAYOUT}x</p>
          <Button onClick={flipCoin} disabled={flipping || finalBet < 1 || finalBet > balance}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-14">
            {flipping ? (bn ? "ঘুরছে..." : "Flipping...") : `${bn ? "ফ্লিপ করুন" : "FLIP"} ৳${finalBet}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoinFlipGame;

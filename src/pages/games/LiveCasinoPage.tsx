import GameLobby from "./GameLobby";
import imgCrazyTime from "@/assets/games/crazy-time.jpg";
import imgLightningRoulette from "@/assets/games/lightning-roulette.jpg";
import imgBlackjack from "@/assets/games/blackjack.jpg";
import imgBaccarat from "@/assets/games/baccarat.jpg";
import imgDreamCatcher from "@/assets/games/live-dream-catcher.jpg";
import imgMegaBall from "@/assets/games/live-mega-ball.jpg";
import imgSpeedBaccarat from "@/assets/games/live-speed-baccarat.jpg";
import imgAutoRoulette from "@/assets/games/live-auto-roulette.jpg";
import imgTeenPatti from "@/assets/games/live-teen-patti.jpg";
import imgAndarBahar from "@/assets/games/live-andar-bahar.jpg";
import imgMonopoly from "@/assets/games/live-monopoly.jpg";
import imgDealOrNoDeal from "@/assets/games/live-deal-or-no-deal.jpg";
import imgDragonTiger from "@/assets/games/live-dragon-tiger.jpg";
import imgSicBo from "@/assets/games/live-sic-bo.jpg";
import imgFanTan from "@/assets/games/live-fan-tan.jpg";
import imgCasinoHoldem from "@/assets/games/live-casino-holdem.jpg";
import imgLightningBlackjack from "@/assets/games/live-lightning-blackjack.jpg";
import imgLightningBaccarat from "@/assets/games/live-lightning-baccarat.jpg";
import imgImmersiveRoulette from "@/assets/games/live-immersive-roulette.jpg";
import imgCashOrCrash from "@/assets/games/live-cash-or-crash.jpg";

const games = [
  { name: "Crazy Time", provider: "Evolution", hot: true, image: imgCrazyTime },
  { name: "Lightning Roulette", provider: "Evolution", hot: true, image: imgLightningRoulette },
  { name: "Blackjack VIP", provider: "Evolution", hot: true, image: imgBlackjack },
  { name: "Baccarat Squeeze", provider: "Evolution", hot: true, image: imgBaccarat },
  { name: "Dream Catcher", provider: "Evolution", image: imgDreamCatcher },
  { name: "Mega Ball", provider: "Evolution", hot: true, image: imgMegaBall },
  { name: "Speed Baccarat", provider: "Evolution", image: imgSpeedBaccarat },
  { name: "Auto Roulette", provider: "Evolution", image: imgAutoRoulette },
  { name: "Teen Patti", provider: "Ezugi", hot: true, image: imgTeenPatti },
  { name: "Andar Bahar", provider: "Ezugi", image: imgAndarBahar },
  { name: "Monopoly Live", provider: "Evolution", hot: true, image: imgMonopoly },
  { name: "Deal or No Deal", provider: "Evolution", image: imgDealOrNoDeal },
  { name: "Dragon Tiger", provider: "Evolution", hot: true, image: imgDragonTiger },
  { name: "Sic Bo", provider: "Evolution", image: imgSicBo },
  { name: "Fan Tan", provider: "Evolution", image: imgFanTan },
  { name: "Casino Hold'em", provider: "Evolution", image: imgCasinoHoldem },
  { name: "Lightning Blackjack", provider: "Evolution", hot: true, image: imgLightningBlackjack },
  { name: "Lightning Baccarat", provider: "Evolution", image: imgLightningBaccarat },
  { name: "Immersive Roulette", provider: "Evolution", image: imgImmersiveRoulette },
  { name: "Cash or Crash", provider: "Evolution", hot: true, image: imgCashOrCrash },
];

const LiveCasinoPage = () => (
  <GameLobby category="Live Casino" categoryBn="লাইভ ক্যাসিনো" games={games} />
);

export default LiveCasinoPage;

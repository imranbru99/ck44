import GameLobby from "./GameLobby";
import imgSweetBonanza from "@/assets/games/sweet-bonanza.jpg";
import imgGatesOfOlympus from "@/assets/games/gates-of-olympus.jpg";
import imgBigBass from "@/assets/games/big-bass.jpg";
import imgStarburst from "@/assets/games/starburst.jpg";
import imgBookOfDead from "@/assets/games/book-of-dead.jpg";
import imgWolfGold from "@/assets/games/wolf-gold.jpg";
import imgFruitParty from "@/assets/games/fruit-party.jpg";
import imgMegaJoker from "@/assets/games/mega-joker.jpg";
import imgDragonsFortune from "@/assets/games/dragons-fortune.jpg";
import imgGoldenFish from "@/assets/games/golden-fish.jpg";
import imgTreasureHunt from "@/assets/games/treasure-hunt.jpg";
import imgOceanKing from "@/assets/games/ocean-king.jpg";
import imgGonzosQuest from "@/assets/games/gonzos-quest.jpg";
import imgReactoonz from "@/assets/games/reactoonz.jpg";
import imgBonanzaMegaways from "@/assets/games/bonanza-megaways.jpg";
import imgBuffaloKing from "@/assets/games/buffalo-king.jpg";
import imgFireJoker from "@/assets/games/fire-joker.jpg";
import imgDeadOrAlive2 from "@/assets/games/dead-or-alive-2.jpg";
import imgRiseOfMerlin from "@/assets/games/rise-of-merlin.jpg";
import imgLegacyOfDead from "@/assets/games/legacy-of-dead.jpg";

const games = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", hot: true, image: imgSweetBonanza },
  { name: "Gates of Olympus", provider: "Pragmatic Play", hot: true, image: imgGatesOfOlympus },
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", hot: true, image: imgBigBass },
  { name: "Book of Dead", provider: "Play'n GO", hot: true, image: imgBookOfDead },
  { name: "Starburst", provider: "NetEnt", hot: true, image: imgStarburst },
  { name: "Wolf Gold", provider: "Pragmatic Play", image: imgWolfGold },
  { name: "Gonzo's Quest", provider: "NetEnt", hot: true, image: imgGonzosQuest },
  { name: "Fire Joker", provider: "Play'n GO", image: imgFireJoker },
  { name: "Dead or Alive 2", provider: "NetEnt", hot: true, image: imgDeadOrAlive2 },
  { name: "Reactoonz", provider: "Play'n GO", hot: true, image: imgReactoonz },
  { name: "Bonanza Megaways", provider: "Big Time Gaming", image: imgBonanzaMegaways },
  { name: "Buffalo King", provider: "Pragmatic Play", image: imgBuffaloKing },
  { name: "Fruit Party", provider: "Pragmatic Play", image: imgFruitParty },
  { name: "Mega Joker", provider: "NetEnt", image: imgMegaJoker },
  { name: "Dragons Fortune", provider: "Microgaming", image: imgDragonsFortune },
  { name: "Golden Fish", provider: "Amatic", image: imgGoldenFish },
  { name: "Treasure Hunt", provider: "IGT", image: imgTreasureHunt },
  { name: "Ocean King", provider: "Playtech", image: imgOceanKing },
  { name: "Rise of Merlin", provider: "Play'n GO", image: imgRiseOfMerlin },
  { name: "Legacy of Dead", provider: "Play'n GO", hot: true, image: imgLegacyOfDead },
];

const SlotsPage = () => (
  <GameLobby category="Slots" categoryBn="স্লটস" games={games} />
);

export default SlotsPage;

import GameLobby from "./GameLobby";
import imgSweetBonanza from "@/assets/games/sweet-bonanza.jpg";
import imgGatesOfOlympus from "@/assets/games/gates-of-olympus.jpg";
import imgBigBass from "@/assets/games/big-bass.jpg";
import imgStarburst from "@/assets/games/starburst.jpg";

const games = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", hot: true, image: imgSweetBonanza },
  { name: "Gates of Olympus", provider: "Pragmatic Play", hot: true, image: imgGatesOfOlympus },
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", hot: true, image: imgBigBass },
  { name: "Book of Dead", provider: "Play'n GO" },
  { name: "Starburst", provider: "NetEnt", hot: true, image: imgStarburst },
  { name: "Wolf Gold", provider: "Pragmatic Play" },
  { name: "Gonzo's Quest", provider: "NetEnt", hot: true },
  { name: "Fire Joker", provider: "Play'n GO" },
  { name: "Dead or Alive 2", provider: "NetEnt" },
  { name: "Reactoonz", provider: "Play'n GO", hot: true },
  { name: "Bonanza Megaways", provider: "Big Time Gaming" },
  { name: "Buffalo King", provider: "Pragmatic Play" },
];

const SlotsPage = () => (
  <GameLobby category="Slots" categoryBn="স্লটস" games={games} />
);

export default SlotsPage;

import GameLobby from "./GameLobby";
import imgMines from "@/assets/games/mines.jpg";
import imgPlinko from "@/assets/games/plinko.jpg";
import imgDice from "@/assets/games/dice.jpg";

const games = [
  { name: "Mines", provider: "Custom", hot: true, image: imgMines },
  { name: "Plinko", provider: "Custom", hot: true, image: imgPlinko },
  { name: "Dice", provider: "Custom", image: imgDice },
  { name: "Hilo", provider: "Custom" },
  { name: "Keno", provider: "Custom", hot: true },
  { name: "Limbo", provider: "Custom" },
  { name: "Tower", provider: "Custom" },
  { name: "Wheel", provider: "Custom", hot: true },
];

const MiniGamesPage = () => (
  <GameLobby category="Mini Games" categoryBn="মিনি গেমস" games={games} />
);

export default MiniGamesPage;

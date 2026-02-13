import GameLobby from "./GameLobby";

const games = [
  { name: "Mines", provider: "Custom", hot: true },
  { name: "Plinko", provider: "Custom", hot: true },
  { name: "Dice", provider: "Custom" },
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

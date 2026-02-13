import GameLobby from "./GameLobby";

const games = [
  { name: "Crazy Time", provider: "Evolution", hot: true },
  { name: "Lightning Roulette", provider: "Evolution", hot: true },
  { name: "Blackjack VIP", provider: "Evolution" },
  { name: "Baccarat Squeeze", provider: "Evolution", hot: true },
  { name: "Dream Catcher", provider: "Evolution" },
  { name: "Mega Ball", provider: "Evolution", hot: true },
  { name: "Speed Baccarat", provider: "Evolution" },
  { name: "Auto Roulette", provider: "Evolution" },
  { name: "Teen Patti", provider: "Ezugi", hot: true },
  { name: "Andar Bahar", provider: "Ezugi" },
];

const LiveCasinoPage = () => (
  <GameLobby category="Live Casino" categoryBn="লাইভ ক্যাসিনো" games={games} />
);

export default LiveCasinoPage;

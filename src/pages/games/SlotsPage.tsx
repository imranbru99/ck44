import GameLobby from "./GameLobby";

const games = [
  { name: "Sweet Bonanza", provider: "Pragmatic Play", hot: true },
  { name: "Gates of Olympus", provider: "Pragmatic Play", hot: true },
  { name: "Big Bass Bonanza", provider: "Pragmatic Play", hot: true },
  { name: "Book of Dead", provider: "Play'n GO" },
  { name: "Starburst", provider: "NetEnt", hot: true },
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

import GameLobby from "./GameLobby";
import imgCricket from "@/assets/games/cricket.jpg";
import imgFootball from "@/assets/games/football.jpg";

const games = [
  { name: "Cricket Betting", provider: "BD678 Sports", hot: true, image: imgCricket },
  { name: "Football", provider: "BD678 Sports", hot: true, image: imgFootball },
  { name: "Basketball", provider: "BD678 Sports" },
  { name: "Tennis", provider: "BD678 Sports", hot: true },
  { name: "Kabaddi", provider: "BD678 Sports" },
  { name: "Esports", provider: "BD678 Sports", hot: true },
  { name: "Horse Racing", provider: "BD678 Sports" },
  { name: "Table Tennis", provider: "BD678 Sports" },
];

const SportsPage = () => (
  <GameLobby category="Sports Betting" categoryBn="স্পোর্টস বেটিং" games={games} />
);

export default SportsPage;

import GameLobby from "./GameLobby";
import imgCricket from "@/assets/games/cricket.jpg";
import imgFootball from "@/assets/games/football.jpg";

const games = [
  { name: "Cricket Betting", provider: "CK444 Sports", hot: true, image: imgCricket },
  { name: "Football", provider: "CK444 Sports", hot: true, image: imgFootball },
  { name: "Basketball", provider: "CK444 Sports" },
  { name: "Tennis", provider: "CK444 Sports", hot: true },
  { name: "Kabaddi", provider: "CK444 Sports" },
  { name: "Esports", provider: "CK444 Sports", hot: true },
  { name: "Horse Racing", provider: "CK444 Sports" },
  { name: "Table Tennis", provider: "CK444 Sports" },
];

const SportsPage = () => (
  <GameLobby category="Sports Betting" categoryBn="স্পোর্টস বেটিং" games={games} />
);

export default SportsPage;

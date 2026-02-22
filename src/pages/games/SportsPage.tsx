import GameLobby from "./GameLobby";
import imgCricket from "@/assets/games/cricket.jpg";
import imgFootball from "@/assets/games/football.jpg";
import imgBasketball from "@/assets/games/sports-basketball.jpg";
import imgTennis from "@/assets/games/sports-tennis.jpg";
import imgKabaddi from "@/assets/games/sports-kabaddi.jpg";
import imgEsports from "@/assets/games/sports-esports.jpg";
import imgHorseRacing from "@/assets/games/sports-horse-racing.jpg";
import imgTableTennis from "@/assets/games/sports-table-tennis.jpg";
import imgBoxing from "@/assets/games/sports-boxing.jpg";
import imgBaseball from "@/assets/games/sports-baseball.jpg";
import imgVolleyball from "@/assets/games/sports-volleyball.jpg";
import imgIceHockey from "@/assets/games/sports-ice-hockey.jpg";
import imgRugby from "@/assets/games/sports-rugby.jpg";
import imgGolf from "@/assets/games/sports-golf.jpg";
import imgMMA from "@/assets/games/sports-mma.jpg";
import imgBadminton from "@/assets/games/sports-badminton.jpg";
import imgF1Racing from "@/assets/games/sports-f1-racing.jpg";
import imgCycling from "@/assets/games/sports-cycling.jpg";
import imgHandball from "@/assets/games/sports-handball.jpg";
import imgDarts from "@/assets/games/sports-darts.jpg";

const games = [
  { name: "Cricket Betting", provider: "CK444 Sports", hot: true, image: imgCricket },
  { name: "Football", provider: "CK444 Sports", hot: true, image: imgFootball },
  { name: "Basketball", provider: "CK444 Sports", hot: true, image: imgBasketball },
  { name: "Tennis", provider: "CK444 Sports", hot: true, image: imgTennis },
  { name: "Kabaddi", provider: "CK444 Sports", image: imgKabaddi },
  { name: "Esports", provider: "CK444 Sports", hot: true, image: imgEsports },
  { name: "Horse Racing", provider: "CK444 Sports", image: imgHorseRacing },
  { name: "Table Tennis", provider: "CK444 Sports", image: imgTableTennis },
  { name: "Boxing", provider: "CK444 Sports", hot: true, image: imgBoxing },
  { name: "Baseball", provider: "CK444 Sports", image: imgBaseball },
  { name: "Volleyball", provider: "CK444 Sports", image: imgVolleyball },
  { name: "Ice Hockey", provider: "CK444 Sports", hot: true, image: imgIceHockey },
  { name: "Rugby", provider: "CK444 Sports", image: imgRugby },
  { name: "Golf", provider: "CK444 Sports", image: imgGolf },
  { name: "MMA / UFC", provider: "CK444 Sports", hot: true, image: imgMMA },
  { name: "Badminton", provider: "CK444 Sports", image: imgBadminton },
  { name: "F1 Racing", provider: "CK444 Sports", hot: true, image: imgF1Racing },
  { name: "Cycling", provider: "CK444 Sports", image: imgCycling },
  { name: "Handball", provider: "CK444 Sports", image: imgHandball },
  { name: "Darts", provider: "CK444 Sports", image: imgDarts },
];

const SportsPage = () => (
  <GameLobby category="Sports Betting" categoryBn="স্পোর্টস বেটিং" games={games} />
);

export default SportsPage;

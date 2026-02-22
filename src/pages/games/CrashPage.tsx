import GameLobby from "./GameLobby";
import imgAviator from "@/assets/games/aviator.jpg";
import imgJetX from "@/assets/games/crash-jetx.jpg";
import imgSpaceman from "@/assets/games/crash-spaceman.jpg";
import imgCashOrCrash from "@/assets/games/crash-cashorcrash.jpg";
import imgPilot from "@/assets/games/crash-pilot.jpg";
import imgCrashX from "@/assets/games/crash-crashx.jpg";
import imgBalloon from "@/assets/games/crash-balloon.jpg";
import imgRocketBlast from "@/assets/games/crash-rocketblast.jpg";
import imgLuckyJet from "@/assets/games/crash-luckyjet.jpg";
import imgSpeedCash from "@/assets/games/crash-speedcash.jpg";
import imgCappadocia from "@/assets/games/crash-cappadocia.jpg";
import imgMagnifyMan from "@/assets/games/crash-magnifyman.jpg";
import imgFootballX from "@/assets/games/crash-footballx.jpg";
import imgSpaceXY from "@/assets/games/crash-spacexy.jpg";
import imgThunderCrash from "@/assets/games/crash-thundercrash.jpg";
import imgCricketX from "@/assets/games/crash-cricketx.jpg";
import imgZeppelin from "@/assets/games/crash-zeppelin.jpg";
import imgFlyBonus from "@/assets/games/crash-flybonus.jpg";
import imgCometCrash from "@/assets/games/crash-cometcrash.jpg";
import imgRocketDice from "@/assets/games/crash-rocketdice.jpg";

const games = [
  { name: "Aviator", provider: "Spribe", hot: true, image: imgAviator },
  { name: "JetX", provider: "SmartSoft", hot: true, image: imgJetX },
  { name: "Spaceman", provider: "Pragmatic Play", hot: true, image: imgSpaceman },
  { name: "Cash or Crash", provider: "Evolution", hot: true, image: imgCashOrCrash },
  { name: "Pilot", provider: "Gamzix", image: imgPilot },
  { name: "Crash X", provider: "Turbo Games", hot: true, image: imgCrashX },
  { name: "Balloon", provider: "SmartSoft", image: imgBalloon },
  { name: "Rocket Blast", provider: "BGaming", hot: true, image: imgRocketBlast },
  { name: "Lucky Jet", provider: "1Play", image: imgLuckyJet },
  { name: "Speed & Cash", provider: "Evoplay", image: imgSpeedCash },
  { name: "Cappadocia", provider: "SmartSoft", image: imgCappadocia },
  { name: "Magnify Man", provider: "Fugaso", image: imgMagnifyMan },
  { name: "Football X", provider: "SmartSoft", hot: true, image: imgFootballX },
  { name: "Space XY", provider: "BGaming", image: imgSpaceXY },
  { name: "Thunder Crash", provider: "Evoplay", hot: true, image: imgThunderCrash },
  { name: "Cricket X", provider: "SmartSoft", image: imgCricketX },
  { name: "Zeppelin", provider: "BetSoft", image: imgZeppelin },
  { name: "Fly Bonus", provider: "Fugaso", image: imgFlyBonus },
  { name: "Comet Crash", provider: "Evoplay", image: imgCometCrash },
  { name: "Rocket Dice", provider: "BGaming", image: imgRocketDice },
];

const CrashPage = () => (
  <GameLobby category="Crash Games" categoryBn="ক্র্যাশ গেমস" games={games} />
);

export default CrashPage;

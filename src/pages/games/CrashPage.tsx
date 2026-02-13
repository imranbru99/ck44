import GameLobby from "./GameLobby";

const games = [
  { name: "Aviator", provider: "Spribe", hot: true },
  { name: "JetX", provider: "SmartSoft", hot: true },
  { name: "Spaceman", provider: "Pragmatic Play" },
  { name: "Cash or Crash", provider: "Evolution", hot: true },
  { name: "Pilot", provider: "Gamzix" },
  { name: "Crash X", provider: "Turbo Games" },
];

const CrashPage = () => (
  <GameLobby category="Crash Games" categoryBn="ক্র্যাশ গেমস" games={games} />
);

export default CrashPage;

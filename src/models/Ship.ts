import { FleetApi } from "@spacejunk/airlock";
import { config } from "../utils/config";
import { myShips } from "../fleet/ships";

class AustinShip extends FleetApi {
  nickname: string;
  cooldown: number;

  constructor(nickname: string) {
    super(config);
    this.nickname = nickname;
    this.cooldown = 0;
  }

  sayNickname() {
    console.log(`I'm a ship! my nickname is ${this.nickname}`);
  }
}

// const testShip = new Ship("shippy mcShipface");
// testShip.sayNickname();

async function logShipsFromShip() {
  //   const res = await testShip.getMyShips();
  //   console.log("my ships, as called from models/Ship.ts");
  //   console.log(res);

  const notResIWant = await myShips();
  console.log(
    "myShips, as called from models/Ship.ts imported from ./fleet/ships.ts"
  );
  console.log(notResIWant);
}

logShipsFromShip();

export { AustinShip };

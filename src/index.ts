import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";
import { myShips } from "./fleet/ships";
import { getShipsFromDb } from "./db/getShipsFromDb";
import { getMyAgent } from "./agent/agent";
import { addStarterShipsToDb } from "./db/addStarterShipsToDb";

const flagshipFrigate = new BaseShip("SPACEBOATS-1");
const surveryShip = new BaseShip("SPACEBOATS-2");
const miningShip = new BaseShip("SPACEBOATS-3");

const ships = ["SPACEBOATS-1", "SPACEBOATS-2", "SPACEBOATS-3"];

// getMyAgent()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// myShips().then((res) => {
//   console.log(res);
// });
// addStarterShipsToDb();
getShipsFromDb();
// flagshipFrigate.getStatus().then((res) => console.log(res));

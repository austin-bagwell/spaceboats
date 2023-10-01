import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";
import { myShips } from "./fleet/ships";
import { getShipsFromDb } from "./db/getShipsFromDb";

const flagshipFrigate = new BaseShip("SPACEBOATS-1");
const surveryShip = new BaseShip("SPACEBOATS-2");
const miningShip = new BaseShip("SPACEBOATS-3");

const ships = ["SPACEBOATS-1", "SPACEBOATS-2", "SPACEBOATS-3"];

myShips();
getShipsFromDb();
// flagshipFrigate.getStatus().then((res) => console.log(res));

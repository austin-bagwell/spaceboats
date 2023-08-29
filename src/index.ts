import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";
import { prisma } from "./db/prismaClient";
import { addShiptoDb } from "./db/addShipToDb";

async function getShipsFromDb() {
  const allShips = await prisma.ship.findMany();
  console.log(allShips);
}

const flagshipFrigate = new BaseShip("SPACEBOATS-1");
const surveryShip = new BaseShip("SPACEBOATS-2");
const miningShip = new BaseShip("SPACEBOATS-3");

const ships = ["SPACEBOATS-1", "SPACEBOATS-2", "SPACEBOATS-3"];

// ships.forEach(async (ship) => {
//   try {
//     await addShiptoDb(ship);
//   } catch (err) {
//     console.log(err);
//   }
// });

getShipsFromDb();
// flagshipFrigate.getStatus().then((res) => console.log(res));

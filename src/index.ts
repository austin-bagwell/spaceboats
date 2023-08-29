import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";
import { prisma } from "./db/prismaClient";
import { addShiptoDb } from "./db/addShipToDb";
import { fleet } from "./fleet/ships";

async function getShipsFromDb() {
  const allShips = await prisma.ship.findMany();
  console.log(allShips);
  return allShips;
}

const flagshipFrigate = new BaseShip("SPACEBOATS-1");
const surveryShip = new BaseShip("SPACEBOATS-2");
const miningShip = new BaseShip("SPACEBOATS-3");

const ships = ["SPACEBOATS-1", "SPACEBOATS-2", "SPACEBOATS-3"];

// uhhhh assumes that the table is empty?
async function addStarterShipsToDb() {
  const newShips = await fleet.getMyShips();

  const shipSymbols = newShips.data.map((ship) => ship.symbol);

  shipSymbols.forEach(async (ship) => {
    try {
      await addShiptoDb(ship);
    } catch (err) {
      console.log(err);
    }
  });
}

// addStarterShipsToDb();
getShipsFromDb();
// flagshipFrigate.getStatus().then((res) => console.log(res));

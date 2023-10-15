import * as dotenv from "dotenv";
dotenv.config();

import { getShipsFromDb } from "./db/fleet/getShipsFromDb";

let callCount = 0;
const intervalId = setInterval(pinger, 1000);

async function pinger() {
  await getShipsFromDb()
    .then((ships) => {
      console.log(`callCount: ${callCount}`);
      ships.forEach(async (ship) => {
        if (ship.routine === "PING") {
          console.log(`Hello from ${ship.symbol}!`);
        }
      });
    })
    .catch((err) => console.log(err));

  callCount++;
  if (callCount > 4) {
    clearInterval(intervalId);
  }
}

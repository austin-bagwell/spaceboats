import {
  sellAllGoods,
  orbitShip,
  dockShip,
  getShipStatusReport,
  getShipCargoHold,
  extractResources,
} from "../ships";
import { wait } from "../../utils/wait";

export async function automine(ship: string) {
  orbitShip(ship)
    .then(() => extractUntilFullCargoHold(ship))
    .then(() => dockShip(ship))
    .then(() => sellAllGoods(ship))
    .then(() => getShipStatusReport(ship))
    .catch((err) => console.log(err));
}

async function isCargoFull(ship: string) {
  const { capacity, units } = await getShipCargoHold(ship);
  return units === capacity;
}

async function extractUntilFullCargoHold(ship: string) {
  let fullHold = false;
  while (!fullHold) {
    const { cooldown, extraction, cargo } = await extractResources(ship);
    fullHold = await isCargoFull(ship);
    const { symbol, units } = extraction._yield;
    const { capacity, units: cargoUnits } = cargo;
    console.log(`extracted ${units} of ${symbol}`);
    console.log(`${ship} cargo hold at ${cargoUnits} of ${capacity}`);
    if (fullHold) {
      return 0;
    }
    await wait(cooldown.remainingSeconds);
  }

  return 0;
}

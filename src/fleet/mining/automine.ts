import {
  sellAllGoods,
  orbitShip,
  dockShip,
  getShipStatusReport,
  getShipCargoHold,
  extractResources,
} from "../ships";
import { wait } from "../../utils/wait";
// TODO some ideas for infinitely looping the miner
// https://www.reddit.com/r/node/comments/d1v8vb/how_to_implement_an_endless_loop_of_promises/
export async function automine(ship: string) {
  try {
    await orbitShip(ship);
    await extractUntilFullCargoHold(ship);
    await dockShip(ship);
    await sellAllGoods(ship);
    await wait(5);
  } catch (err) {
    const {
      response: { status, headers },
    } = err;
    console.log(`error status: ${status}`);
    console.log(headers);
  }
  // .then(() => )
  // .then(() => dockShip(ship))
  // .then(() => sellAllGoods(ship))
  // .then(() => wait(5))
  // .catch((err) => {
  //   const {
  //     response: { status, headers },
  //   } = err;
  //   console.log(`error status: ${status}`);
  //   console.log(headers);
  // });
}

async function isCargoFull(ship: string, percentFull?: number) {
  const { capacity, units } = await getShipCargoHold(ship);

  const percent = Math.ceil((units / capacity) * 100);
  console.log(`${ship} hold is ${percent}% full`);
  // if optional percentFull is passed, return true if cargo capacity % is >= the passed %
  return percentFull ? percent >= percentFull : units === capacity;
}

async function extractUntilFullCargoHold(ship: string) {
  let fullHold = false;
  while (!fullHold) {
    const { cooldown, extraction, cargo } = await extractResources(ship);
    // temporarily setting to 25% for faster testing turnaround
    fullHold = await isCargoFull(ship, 10);
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

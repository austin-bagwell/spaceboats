import * as dotenv from "dotenv";
dotenv.config();
import {
  getShipStatusReport,
  dockShip,
  sellAllGoods,
  navigateShip,
  purchaseMiningDrone,
  myShips,
  refuelShip,
} from "./fleet/ships";
import {
  getVisibleSystems,
  getSystemWaypoints,
  getWaypointsOfType,
  getWaypointTraits,
  findWaypointWithShipyard,
  getShipsForSale,
} from "./systems/systems";
import { getMyAgent } from "./agent/agent";
import { automine } from "./fleet/mining/automine";
import { NavigateShipRequest } from "@spacejunk/airlock";
import { wait } from "./utils/wait";

const hqSystem = "X1-HQ18";
const hqPlant = "X1-HQ18-11700D";
const planet = "PLANET";
const asteroidField = "ASTEROID_FIELD";
const asteroidFieldWaypoint = "X1-HQ18-98695F";
const shipyardWaypoint = "X1-HQ18-60817D";
const frigateSymbol = "JITSUJAMMER-1";
const surveryDrone = "JITSUJAMMER-2";
const miningDrone = "JITSUJAMMER-3";

const shipyardReq = {
  systemSymbol: hqSystem,
  waypointSymbol: shipyardWaypoint,
};

// myShips()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// findWaypointWithShipyard(hqSystem)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// getShipsForSale(shipyardReq)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// purchaseMiningDrone(shipyardWaypoint)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// getWaypointsOfType(hqSystem, "ASTEROID_FIELD")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// navigateShip(miningDrone, { waypointSymbol: asteroidFieldWaypoint })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

refuelShip(miningDrone)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// getShipStatusReport(frigateSymbol)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// getShipStatusReport(surveryDrone)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// getShipStatusReport(miningDrone)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// getShipsForSale(shipyardReq)
//   .then((res) => console.table(res))
//   .catch((err) => console.log(err));
// dockShip(miningDrone).then(() => sellAllGoods(miningDrone));

// automine(miningDrone);
// nope
// async function loop() {
//   try {
//     await automine(miningDrone);
//     loop();
//   } catch (e) {
//     await wait(5).then(() => console.log(e));
//   }
// }
// loop();

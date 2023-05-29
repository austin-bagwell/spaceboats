import * as dotenv from "dotenv";
dotenv.config();
import {
  myShips,
  getShipLocation,
  getShipStatusReport,
  navigateShip,
  purchaseMiningDrone,
  dockShip,
  refuelShip,
  extractResources,
  orbitShip,
  getShipCargoHold,
  sellAllGoods,
} from "./fleet/ships";
import {
  getVisibleSystems,
  getSystemWaypoints,
  getWaypointsOfType,
  getWaypointTraits,
  findWaypointWithShipyard,
  getShipsForSale,
} from "./systems/systems";
import { automine } from "./fleet/mining/automine";
import { NavigateShipRequest } from "@spacejunk/airlock";
import { error } from "console";

const hqSystem = "X1-VS75";
const planet = "PLANET";
const asteroidField = "ASTEROID_FIELD";
const asteroidFieldWaypoint = "X1-VS75-67965Z";
const shipyardWaypoint = "X1-VS75-97637F";
const frigateSymbol = "JITSUJAMMER-1";
const miningDrone = "JITSUJAMMER-2";

const shipyardReq = {
  systemSymbol: hqSystem,
  waypointSymbol: shipyardWaypoint,
};

// getShipStatusReport(miningDrone).then((res) => console.log(res));
// automine(miningDrone);
// dockShip(miningDrone).then(() => sellAllGoods(miningDrone));

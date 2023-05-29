import * as dotenv from "dotenv";
dotenv.config();
import { getShipStatusReport } from "./fleet/ships";
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

// getMyAgent()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
getShipStatusReport(miningDrone).then((res) => console.log(res));
// automine(miningDrone);
// dockShip(miningDrone).then(() => sellAllGoods(miningDrone));

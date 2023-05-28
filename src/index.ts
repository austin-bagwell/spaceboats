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
} from "./fleet/ships";
import {
  getVisibleSystems,
  getSystemWaypoints,
  getWaypointsOfType,
  getWaypointTraits,
  findWaypointWithShipyard,
  getShipsForSale,
} from "./systems/systems";

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

// purchaseMiningDrone(shipyardWaypoint)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
refuelShip(miningDrone)
  .then(() => getShipStatusReport(miningDrone))
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// myShips();
// getVisibleSystems();
// getSystemWaypoints(hqSystem);
// getWaypointsOfType(hqSystem, asteroidField);
// getWaypointTraits(hqSystem);
// findWaypointWithShipyard(hqSystem);
// navigateShip(miningDrone, { waypointSymbol: asteroidFieldWaypoint })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// testNav();

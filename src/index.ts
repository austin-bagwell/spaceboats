import * as dotenv from "dotenv";
dotenv.config();
import {
  myShips,
  getShipLocation,
  getShipStatusReport,
  navigateShip,
  testNav,
} from "./fleet/ships";
import {
  getVisibleSystems,
  getSystemWaypoints,
  getWaypointsOfType,
  getWaypointTraits,
  findWaypointWithShipyard,
} from "./systems/systems";

import { NavigateShipRequest } from "@spacejunk/airlock";
import { error } from "console";

const hqSystem = "X1-VS75";
const planet = "PLANET";
const shipyardWaypoint = "X1-VS75-97637F";
const frigateSymbol = "JITSUJAMMER-1";
getShipStatusReport(frigateSymbol)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// getShipLocation(frigateSymbol);
// myShips();
// getVisibleSystems();
// getSystemWaypoints(hqSystem);
// getWaypointsOfType(hqSystem, planet);
// getWaypointTraits(hqSystem);
// findWaypointWithShipyard(hqSystem);
// navigateShip(frigateSymbol, shipyardWaypoint);
// testNav();

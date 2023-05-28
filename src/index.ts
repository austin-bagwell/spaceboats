import * as dotenv from "dotenv";
dotenv.config();
import { myShips } from "./fleet/ships";
import { getVisibleSystems } from "./systems/systems";

// myShips();
getVisibleSystems();

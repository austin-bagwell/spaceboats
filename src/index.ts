import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";

const myCoolShip = new BaseShip("JITSUJAMMER-1");

// myCoolShip.getStatus();
// myCoolShip.dock();
myCoolShip.getStatus();

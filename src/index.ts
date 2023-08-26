import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";

const myCoolShip = new BaseShip(`austin's ship`, "JITSUJAMMER-1");

myCoolShip.getStatus();

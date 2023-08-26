import * as dotenv from "dotenv";
dotenv.config();

import { BaseShip } from "./models/Ship";

const flagshipFrigate = new BaseShip("SPACEBOATS-1");
const miningShip = new BaseShip("SPACEBOATS-3");

const surveryShip = new BaseShip("SPACEBOATS-2");

flagshipFrigate.getStatus().then((res) => console.log(res));

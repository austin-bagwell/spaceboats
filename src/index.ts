import * as dotenv from "dotenv";
dotenv.config();

import { getMyAgent } from "./agent/agent";
import { getShipsFromDb } from "./db/getShipsFromDb";
import { startGame } from "./cli/startGame";

startGame();
// getMyAgent()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// myShips().then((res) => {
//   console.log(res);
// });
// addStarterShipsToDb();
// getShipsFromDb();
// flagshipFrigate.getStatus().then((res) => console.log(res));

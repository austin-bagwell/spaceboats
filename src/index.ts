import * as dotenv from "dotenv";
dotenv.config();
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GetMyShips200Response, Ship } from "@spacejunk/airlock";
import { getMyAgent } from "./agent/agent";
import { myShips } from "./fleet/ships";
import { getShipsFromDb } from "./db/getShipsFromDb";

const rl = readline.createInterface({ input, output });

let game = true;
async function startGame() {
  while (game) {
    const input = await rl.question(
      "===* SPACEBOATS *===\nEnter a command, help, or quit: "
    );

    if (input.toLowerCase() === "quit" || input.toLowerCase() === "q") {
      console.log(`Thanks for playing spaceboats`);
      rl.close();
      game = false;
    }

    if (input.toLowerCase() === "help" || input.toLowerCase() === "h") {
      console.log(`type f or fleet to see fleet details`);
    }

    if (input.toLowerCase() === "fleet" || input.toLowerCase() === "f") {
      const { data, meta } = await myShips();

      const shipNames = data.map((ship: Ship) => {
        const {
          symbol,
          registration: { role },
          nav: { waypointSymbol, status },
        } = ship;
        return { symbol, role, status, waypointSymbol };
      });
      console.log("=== FLEET ===");
      console.table(shipNames);

      // TODO - get data from API or database?
      //   const db = await getShipsFromDb();
      //   const dbShips = db.map((ship: any) => {
      //     const { pk, symbol, role, navStatus, waypointSymbol } = ship;
      //     return { pk, symbol, role, navStatus, waypointSymbol };
      //   });
    }
  }
}

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

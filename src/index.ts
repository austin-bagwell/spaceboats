import * as dotenv from "dotenv";
dotenv.config();
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GetMyShips200Response, Ship } from "@spacejunk/airlock";
import { myShips } from "./fleet/ships";

const rl = readline.createInterface({ input, output });

let game = true;
async function startGame() {
  while (game) {
    const input = await rl.question(
      "SPACEBOATS\nEnter a command, help, or quit: "
    );

    if (input.toLowerCase() === "quit" || input.toLowerCase() === "q") {
      console.log(`Thanks for playing spaceboats`);
      rl.close();
      game = false;
    }

    if (input.toLowerCase() === "help" || input.toLowerCase() === "h") {
      console.log(`no help yet, trying quitting instead`);
    }

    if (input.toLowerCase() === "fleet" || input.toLowerCase() === "f") {
      console.log("fleet goes here");
      const response = await myShips();
      console.log(response.data);
      //   ships.data.forEach((ship: Ship) => console.log(ship.symbol));
      //   console.log(ships);

      //   ships.forEach((ship: Ship) => {
      //     console.log(ship.symbol);
      //   });
      //   const names = ships.map((ship: Ship) => ship.symbol);
      //   console.log(ships);
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

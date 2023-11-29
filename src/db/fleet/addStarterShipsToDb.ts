import { Ship } from "spacetraders-fetch-api";
import { fleet } from "../../fleet/ships";
import { addShipToDb } from "./create";

async function addStarterShipsToDb() {
  await fleet
    .getMyShips()
    .then((res: Ship) => {
      const ships = res.data;
      if (!ships) {
        throw new Error(`Didn't find any ships on the server... uh oh. `);
      }
      ships.forEach((ship: Ship) => addShipToDb(ship));
      console.log(`Added ${ships.length} ships to the database`);
    })
    .catch((err: any) => console.log(err));
}

export { addStarterShipsToDb };

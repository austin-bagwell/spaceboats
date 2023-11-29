import { Ship, GetMyShips200Response } from "spacetraders-fetch-api";
import { FleetApi } from "spacetraders-fetch-api";
import { config } from "../../utils/config";
import { addShipToDb } from "./create";

const fleet = new FleetApi(config);

async function addStarterShipsToDb() {
  await fleet
    .getMyShips()
    .then((res: GetMyShips200Response) => {
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

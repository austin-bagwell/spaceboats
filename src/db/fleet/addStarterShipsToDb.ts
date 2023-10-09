import { fleet } from "../../fleet/ships";
import { addShiptoDb } from "./addShipToDb";

async function addStarterShipsToDb() {
  await fleet
    .getMyShips()
    .then((res) => {
      const ships = res.data;
      if (!ships) {
        throw new Error(`Didn't find any ships on the server... uh oh. `);
      }
      ships.forEach((ship) => addShiptoDb(ship));
      console.log(`Added ${ships.length} ships to the database`);
    })
    .catch((err) => console.log(err));
}

export { addStarterShipsToDb };
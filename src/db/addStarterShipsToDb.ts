import { fleet } from "../fleet/ships";
import { addShiptoDb } from "./addShipToDb";

async function addStarterShipsToDb() {
  await fleet
    .getMyShips()
    .then((res) => {
      res.data.forEach((ship) => addShiptoDb(ship));
    })
    .catch((err) => console.log(err));
}

export { addStarterShipsToDb };

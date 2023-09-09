import { fleet } from "../fleet/ships";
import { addShiptoDb } from "./addShipToDb";

async function addStarterShipsToDb() {
  const newShips = await fleet.getMyShips();

  const shipSymbols = newShips.data.map((ship) => ship.symbol);

  shipSymbols.forEach(async (ship) => {
    try {
      await addShiptoDb(ship);
    } catch (err) {
      console.log(err);
    }
  });
}

export { addStarterShipsToDb };

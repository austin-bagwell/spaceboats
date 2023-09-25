import { fleet } from "../fleet/ships";
import { addShiptoDb } from "./addShipToDb";

async function addStarterShipsToDb() {
  const newShips = await fleet.getMyShips();

  const ships = newShips.data.map((ship) => {
    const {
      symbol: shipSymbol,
      nav: { systemSymbol, waypointSymbol, status: navStatus },
      fuel: { capacity: fuelCapacity, current: fuelCurrent },
      cargo: { capacity: cargoCapacity, units: cargoOnboard },
    } = ship;

    return {
      shipSymbol,
      systemSymbol,
      waypointSymbol,
      navStatus,
      fuelCapacity,
      fuelCurrent,
      cargoCapacity,
      cargoOnboard,
    };
  });

  ships.forEach(async (ship) => {
    try {
      await addShiptoDb(ship);
    } catch (err) {
      console.log(err);
    }
  });
}

export { addStarterShipsToDb };

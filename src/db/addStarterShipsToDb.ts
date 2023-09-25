import { fleet } from "../fleet/ships";
import { addShiptoDb } from "./addShipToDb";

// export interface ShipPropsDB {
//   shipSymbol: string;
//   systemSymbol: string;
//   waypointSymbol: string;
//   navStatus: string;
//   fuelCurrent: number;
//   fuelCapacity: number;
//   cargoCapacity: number;
//   cargoOnboard: number;
// }

async function addStarterShipsToDb() {
  const newShips = await fleet.getMyShips();

  // const shipSymbols = newShips.data.map((ship) => ship.symbol);
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

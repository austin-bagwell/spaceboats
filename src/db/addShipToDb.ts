import { prisma } from "./prismaClient";
import { Ship } from "@spacejunk/airlock";

async function addShiptoDb(ship: Ship) {
  const {
    symbol,
    nav: { waypointSymbol, systemSymbol, status: navStatus },
    fuel: { capacity: fuelCapacity, current: fuelCurrent },
    cargo: { capacity: cargoCapacity, units: cargoCurrent },
  } = ship;

  const dbShip = await prisma.ship.create({
    data: {
      symbol,
      waypointSymbol,
      systemSymbol,
      navStatus,
      fuelCapacity,
      fuelCurrent,
      cargoCapacity,
      cargoCurrent,

    },
  });

  if (!dbShip) {
    throw new Error(`Couldn't add ${ship.symbol} to the database`);
  }

  return ship;
}

export { addShiptoDb };

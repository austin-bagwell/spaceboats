import { prisma } from "./prismaClient";
import { Ship } from "@spacejunk/airlock";

async function addShiptoDb(ship: Ship) {
  const {
    symbol: shipSymbol,
    nav: { waypointSymbol, systemSymbol, status: navStatus },
    fuel: { capacity: fuelCapacity, current: fuelCurrent },
    cargo: { capacity: cargoCapacity, units: cargoOnboard },
  } = ship;

  const dbShip = await prisma.ship.create({
    data: {
      shipSymbol,
      waypointSymbol,
      systemSymbol,
      navStatus,
      fuelCapacity,
      fuelCurrent,
      cargoCapacity,
      cargoOnboard,
      cooldown: 0,
      routine: "",
    },
  });

  if (!dbShip) {
    throw new Error(`Couldn't add ${ship.symbol} to the database`);
  }

  return ship;
}

export { addShiptoDb };

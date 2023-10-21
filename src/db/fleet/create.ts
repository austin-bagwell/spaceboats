import { prisma } from "../prismaClient";
import { Ship } from "@spacejunk/airlock";

async function addShipToDb(ship: Ship) {
  const {
    symbol,

    registration: { role },
    nav: { waypointSymbol, systemSymbol, status: navStatus },
    fuel: { capacity: fuelCapacity, current: fuelCurrent },
    cargo: { capacity: cargoCapacity, units: cargoCurrent },
  } = ship;

  const dbShip = await prisma.ship.create({
    data: {
      symbol,
      role,
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

async function addShipstoDb(ships: Ship[]) {
  const dbShips = ships.map((ship) => {
    const {
      symbol,
      registration: { role },
      nav: { waypointSymbol, systemSymbol, status: navStatus },
      fuel: { capacity: fuelCapacity, current: fuelCurrent },
      cargo: { capacity: cargoCapacity, units: cargoCurrent },
    } = ship;

    return {
      symbol,
      role,
      waypointSymbol,
      systemSymbol,
      navStatus,
      fuelCapacity,
      fuelCurrent,
      cargoCapacity,
      cargoCurrent,
    };
  });

  const newShips = await prisma.ship.createMany({
    data: dbShips,
    skipDuplicates: true,
  });

  if (!newShips) {
    throw new Error(`Couldn't add ${ships.length} new ships to the database`);
  }

  return newShips;
}

export { addShipToDb, addShipstoDb };

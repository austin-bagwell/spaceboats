import { prisma } from "./prismaClient";

interface ShipPropsDB {
  shipSymbol: string;
  systemSymbol: string;
  waypointSymbol: string;
  navStatus: string;
  fuelCurrent: number;
  fuelCapacity: number;
  cargoCapacity: number;
  cargoOnboard: number;
}

async function addShiptoDb(ship: ShipPropsDB) {
  const dbShip = await prisma.ship.create({
    data: ship,
  });

  if (!dbShip) {
    throw new Error(`Couldn't add ${ship.shipSymbol} to the database`);
  }

  // can use return value of ship to log/use info about the ship that was just created
  // return ship;
}

export { addShiptoDb };

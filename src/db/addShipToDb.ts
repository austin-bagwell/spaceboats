import { prisma } from "./prismaClient";

export interface ShipPropsDB {
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

  return ship;
}

export { addShiptoDb };

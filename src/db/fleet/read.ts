import { prisma } from "../prismaClient";

async function getShipFromDb({ symbol }: { symbol: string }) {
  const ship = await prisma.ship.findFirst({
    where: {
      symbol,
    },
  });

  if (!ship) {
    throw new Error(`Didn't find ship ${symbol} in the database`);
  }

  return ship;
}

async function getShipsFromDb() {
  const allShips = await prisma.ship.findMany();
  return allShips;
}

export { getShipFromDb, getShipsFromDb };

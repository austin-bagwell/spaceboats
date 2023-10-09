import { prisma } from "../prismaClient";

async function getShipsFromDb() {
  const allShips = await prisma.ship.findMany();
  return allShips;
}

export { getShipsFromDb };

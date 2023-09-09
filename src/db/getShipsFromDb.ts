import { prisma } from "./prismaClient";

async function getShipsFromDb() {
  const allShips = await prisma.ship.findMany();
  console.log(allShips);
  return allShips;
}

export { getShipsFromDb };

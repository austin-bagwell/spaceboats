import { prisma } from "./prismaClient";

export async function removeAllShips() {
  const allShips = await prisma.ship.findMany();

  if (!allShips || allShips.length === 0) {
    throw new Error(`no ships found in the database`);
  }

  allShips.forEach(async (ship) => {
    console.log(`removing ship ${ship.symbol}`);
    await prisma.ship.delete({
      where: {
        symbol: ship.symbol,
      },
    });
  });
}

import { prisma } from "./prismaClient";

export async function removeAllShips() {
  const allShips = await prisma.ship.findMany();
  allShips.forEach(async (ship) => {
    console.log(`removing ship ${ship.ship_symbol}`);
    await prisma.ship.delete({
      where: {
        ship_symbol: ship.ship_symbol,
      },
    });
  });
}

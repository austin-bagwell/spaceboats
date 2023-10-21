import { Ship } from "@prisma/client";
import { prisma } from "../prismaClient";

async function removeOneShip(shipSymbol: string): Promise<Ship> {
  const ship = await prisma.ship.delete({
    where: {
      symbol: shipSymbol,
    },
  });

  if (!ship) {
    throw new Error(`Ship ${shipSymbol} found in the database`);
  }

  return ship;
}

// FIXME this is silly
async function removeAllShips(): Promise<number | void> {
  const allShips = await prisma.ship.findMany();

  if (!allShips || allShips.length === 0) {
    // throw new Error(`no ships found in the database`);
    console.log(`no ships found in the database`);
    return 0;
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

export { removeOneShip, removeAllShips };

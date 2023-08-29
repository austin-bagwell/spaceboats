import { prisma } from "./prismaClient";

async function addShiptoDb(shipSymbol: string) {
  const ship = await prisma.ship.create({
    data: {
      ship_symbol: shipSymbol,
    },
  });

  if (!ship) {
    throw new Error(`Couldn't add ${shipSymbol} to the database`);
  }
}

export { addShiptoDb };

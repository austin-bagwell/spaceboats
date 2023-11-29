import { prisma } from "../prismaClient";
import { System } from "spacetraders-fetch-api";

async function addSystem(system: System) {
  const {
    symbol,
    sectorSymbol,
    type,
    x: xCoord,
    y: yCoord,
    waypoints,
    factions,
  } = system;

  //   TODO
  //   need to get the typing correct for prisma... that is for another day
  //   const typedWaypoints = addSystemWaypoints(waypoints)

  const newSystem = prisma.system.create({
    data: {
      symbol,
      type,
      sectorSymbol,
      xCoord,
      yCoord,
      waypoints,
      factions,
    },
  });

  if (!newSystem) {
    throw new Error(`Couldn't add ${system.symbol} to the database`);
  }

  return newSystem;
}

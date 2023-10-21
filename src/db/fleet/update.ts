import { prisma } from "../prismaClient";

export type ShipRoutines = "IDLE" | "MINE" | "EXPLORE" | "PING";

type UpdateRoutineArgs = {
  shipSymbol: string;
  routine: ShipRoutines;
};

async function updateRoutine({ shipSymbol, routine }: UpdateRoutineArgs) {
  try {
    const ship = prisma.ship.update({
      where: {
        symbol: shipSymbol,
      },
      data: {
        routine,
      },
    });
    return ship;
  } catch (err: any) {
    console.log(err);
  }
}

export { updateRoutine };

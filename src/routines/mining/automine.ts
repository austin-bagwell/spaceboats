import { prisma } from "../../db/prismaClient";
import { getShipFromDb } from "../../db/fleet/read";
import { FleetApi } from "@spacejunk/airlock";
import { config } from "../../utils/config";
import { wait } from "../../utils/wait";

const fleet = new FleetApi(config);

type AutomineProps = {
  shipSymbol: string;
  asteroidWaypoint: string;
  contract?: any;
};

export async function automine({
  shipSymbol,
  asteroidWaypoint,
}: AutomineProps) {
  const { waypointSymbol, navStatus, cargoCurrent, cargoCapacity } =
    await getShipFromDb({
      symbol: shipSymbol,
    });

  // FIXME - need to make sure db model is being updated anytime a ship is navigated. or when literally anything happens I guess
  // if ship isn't where it needs to be, send it there
  // just throw an error for now
  if (waypointSymbol !== asteroidWaypoint) {
    throw new Error(
      `You need to navigate ${shipSymbol} to an asteroid belt first`
    );
  }

  // pretty sure you have to be in orbit to extract
  if (navStatus !== "IN_ORBIT") {
    await fleet.orbitShip(shipSymbol);
    // db.ship.update(shipSymbol, { navStatus: "IN_ORBIT" })
  }

  let capacityPercentage = Math.round((cargoCurrent / cargoCapacity) * 100);
  while (capacityPercentage < 80) {
    const {
      data: {
        cargo: { units },
        extraction,
        cooldown,
      },
    } = await fleet.extractResources(shipSymbol);
    console.log(`${shipSymbol} extracted: ${extraction}`);

    capacityPercentage = Math.round((units / cargoCapacity) * 100);
    prisma.ship.update({
      where: {
        symbol: shipSymbol,
      },
      data: {
        cargoCurrent: units,
      },
    });

    await wait(cooldown.remainingSeconds);
  }

  console.log(
    `${shipSymbol} did the damn automine thing. Cargo hold is mosly full!`
  );
}

/*
async function miningRoutine(ship: Ship): Promise<MiningResponse> {
    if (ship.navStatus === 'DOCKED') {
        await FleetAPI.orbitShip(ship.shipSymbol)
    }
  
    if (!ship.waypointType === "ASTEROID_BELT") {
        // could maybe be pulled from db systems data to avoid hitting API?
        const miningZone = 
        await findNearestAsteroids(ship.currentWaypoint)
        
        await FleetAPI.orbitShip(ship.shipSymbol)  
        
        const { cooldown } = 
        await FleetAPI.navigateShip(ship.shipSymbol, miningZone)  
        ship.cooldown = cooldown;
    }
    // math - current/capacity, +/- some % of not quite full
    let notFull = ship.isCargoFull;
    while (notFull)
          // gets fuzzy with not remembering how the cooldowns work exactly
          setTimeout(async () => {
              const res = await FleetAPI.extract(...args)
              // updates ship state
              ship.updateCargo(res);
              notFull = ship.isCargoFull;
              
              // update db row of ship on each iteration?
              ship.save()
          },
          cooldown);
  
    // log stuff, implement a return value that summarizes the mining run?
  }
*/

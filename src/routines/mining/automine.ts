import { getShipsFromDb } from "../../db/getShipsFromDb";

const ships = await getShipsFromDb();

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

import { config } from "../utils/config";
import {
  SystemsApi,
  GetSystemWaypoints200ResponseToJSON,
  WaypointTrait,
  GetShipyardRequest,
  GetShipyard200Response,
  GetWaypointRequest,
} from "spacetraders-fetch-api";

import { Waypoint } from "spacetraders-fetch-api";

const systems = new SystemsApi(config);

export async function getShipsForSale({
  systemSymbol,
  waypointSymbol,
}: GetWaypointRequest) {
  const shipyard = (await systems.getShipyard(systemSymbol, waypointSymbol))
    .data.ships;

  if (shipyard) {
    const ships = [];
    for (let ship of shipyard) {
      const { type, name, description, purchasePrice } = ship;
      const shipDetails = `${name} Price: ${purchasePrice} Type: ${type} `;
      ships.push({ type, name, purchasePrice });
    }
    return ships;
  }
  return shipyard;
}

export function getVisibleSystems() {
  systems
    .getSystems()
    .then((res) => console.table(res.data))
    .catch((err) => console.log(err));
}

export async function seeWaypointsAtSystem(system: string) {}

export async function getSystemWaypoints(system: string) {
  try {
    const waypoints = (await systems.getSystemWaypoints(system)).data;
    return waypoints;
  } catch (err) {
    console.log(err);
  }
}

export async function getWaypointsOfType(system: string, type: string) {
  const waypoints = (await systems.getSystemWaypoints(system)).data;

  if (waypoints) {
    try {
      const waypointsOfType = waypoints.filter(
        (waypoint) => waypoint.type === type.toUpperCase()
      );
      console.log(waypointsOfType);
      return waypointsOfType;
    } catch (err) {
      console.log(err);
    }
  } else {
    return "something funky happned";
  }
}

export async function getWaypointTraits(system: string) {
  const waypoints = await getSystemWaypoints(system);

  const traits: Array<Waypoint> = [];
  if (waypoints) {
    for (const waypoint of waypoints) {
      const symbol = waypoint.symbol;
      const traits = waypoint.traits;
      const deets = { symbol, traits };
      traits.push(deets);
    }
  }

  return traits;
}

export async function findWaypointWithShipyard(system: string) {
  const systemWaypoints = await getSystemWaypoints(system);

  const shipyards: Array<Waypoint> = [];
  if (systemWaypoints) {
    for (const waypoint of systemWaypoints) {
      const traits = waypoint.traits;
      traits.forEach((trait: WaypointTrait) => {
        if (trait.symbol === "SHIPYARD") {
          console.log(`waypoint ${waypoint.symbol} has a shipyard`);
          shipyards.push(waypoint);
        }
      });
    }
  }

  return shipyards;
}

import { config } from "../utils/config";
import {
  SystemsApi,
  GetSystemWaypoints200ResponseToJSON,
  WaypointTrait,
  GetShipyardRequest,
} from "@spacejunk/airlock";

const systems = new SystemsApi(config);

export async function getShipsForSale(request: GetShipyardRequest) {
  const { systemSymbol, waypointSymbol } = request;
  const shipyard = (await systems.getShipyard(systemSymbol, waypointSymbol))
    .data.shipTypes;
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

  const list = [];
  for (const waypoint of waypoints) {
    const symbol = waypoint.symbol;
    const traits = waypoint.traits;
    const deets = { symbol, traits };
    list.push(deets);
  }

  console.table(list);
}

export async function findWaypointWithShipyard(system: string) {
  const systemWaypoints = await getSystemWaypoints(system);

  for (const waypoint of systemWaypoints) {
    const traits = waypoint.traits;
    traits.forEach((trait: WaypointTrait) => {
      if (trait.symbol === "SHIPYARD") {
        console.log(`waypoint ${waypoint.symbol} has a shipyard`);
      }
    });
  }
}

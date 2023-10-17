import {
  SystemsApi,
  Waypoint,
  WaypointType,
  WaypointTraitSymbolEnum,
} from "@spacejunk/airlock";
import { config } from "../utils/config";

const systems = new SystemsApi(config);

type FindNearestWaypointArgs = {
  type?: WaypointType;
  system: string;
  traitSymbol?: WaypointTraitSymbolEnum;
  lookOutsideSystem?: boolean;
};

export async function findWaypointWithOptions({
  type,
  system,
  traitSymbol,
  lookOutsideSystem = false,
}: FindNearestWaypointArgs): Promise<Waypoint[] | undefined> {
  const waypoints = await systems.getSystemWaypoints(system);

  if (!waypoints.data) {
    throw new Error(`Didn't find any waypoints in system ${system}`);
  }

  if (type && traitSymbol) {
    return waypoints.data.filter((waypoint) => {
      const hasTrait =
        waypoint.traits.filter((trait) => trait.symbol === traitSymbol).length >
        0;
      return waypoint.type === type && hasTrait;
    });
  }

  if (type) {
    return waypoints.data.filter((waypoint) => {
      return waypoint.type === type;
    });
  }

  if (traitSymbol) {
    const hasTrait = waypoints.data.filter((waypoint) => {
      const traits = waypoint.traits;
      const hasTrait = traits.filter((trait) => trait.symbol === traitSymbol);
      return hasTrait.length > 0;
    });

    return hasTrait;
  }
}

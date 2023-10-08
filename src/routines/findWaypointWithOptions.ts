import {
  SystemsApi,
  Waypoint,
  WaypointType,
  WaypointTraitSymbolEnum,
} from "@spacejunk/airlock";
import { config } from "../utils/config";

const systems = new SystemsApi(config);

type FindNearestWaypointArgs = {
  type: WaypointType;
  system: string;
  traitSymbol?: WaypointTraitSymbolEnum;
  lookOutsideSystem?: boolean;
};
// rename... findWaypointInSystemWithOptions ???
// FIXME - not returning what I want it to return
export async function findWaypointWithOptions({
  type,
  system,
  traitSymbol,
  lookOutsideSystem = false,
}: FindNearestWaypointArgs): Promise<Waypoint[] | string> {
  const waypoints = await systems.getSystemWaypoints(system);

  const waypointsOfType = waypoints.data.filter((waypoint) => {
    return waypoint.type === type;
  });

  if (traitSymbol) {
    const waypointsWithTrait = waypointsOfType.filter((waypoint) => {
      const traits = waypoint.traits;
      const hasTraits = traits.filter((trait) => trait.symbol === traitSymbol);
      return hasTraits.length > 0;
    });

    return waypointsWithTrait.length > 0
      ? waypointsWithTrait
      : `No waypoint found with trait ${traitSymbol}`;
  }

  return waypointsOfType.length > 0
    ? waypointsOfType
    : `didn't find waypoint of type ${type}`;
}

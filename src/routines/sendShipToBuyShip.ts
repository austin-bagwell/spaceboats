import { addShiptoDb } from "../db/fleet/addShipToDb";
import { getShipFromDb } from "../db/fleet/getShipsFromDb";
import { wait } from "../utils/wait";
import { findWaypointWithOptions } from "./findWaypointWithOptions";
import { FleetApi, ShipType } from "@spacejunk/airlock";
import { config } from "../utils/config";

const fleet = new FleetApi(config);

type SendSendToBuyShipProps = {
  waypointSymbol?: string;
  sendShip: string;
  shipType: ShipType;
};

export async function sendSendToBuyShip({
  waypointSymbol,
  sendShip,
  shipType,
}: SendSendToBuyShipProps) {
  // extract system from waypointSymbol
  //    const system = props.waypointSymbol?.split()
  const system = "X1-CS80";

  //   need to rewrite this to findWaypointWithTrait, maybe? or allow for no type
  const waypoint = waypointSymbol
    ? waypointSymbol
    : await findWaypointWithOptions({
        type: "PLANET",
        system,
        traitSymbol: "SHIPYARD",
      });

  if (!waypoint) {
    throw new Error(`Could't find a waypoint with a shipyard`);
  }

  const {
    waypointSymbol: currentLocation,
    navStatus,
    cooldown,
  } = await getShipFromDb({
    symbol: sendShip,
  });

  //   if ship is present at purchase location and has no cooldown buy the damn ship
  if (currentLocation === waypoint) {
    if (cooldown > 0) {
      await wait(cooldown);
    }

    const purchasedShip = await fleet.purchaseShip({
      waypointSymbol: waypoint,
      shipType,
    });
    return purchasedShip;
  }

  //   if ship is not at a either the designated waypoint or the closest with a shipyard
  if (currentLocation != waypoint) {
    if (cooldown > 0) {
      await wait(cooldown);
    }

    if (navStatus === "DOCKED") {
      await fleet.orbitShip(sendShip);
    }

    // wait until the ship has travelled to it's desination
    // may want to set the cd on the db model instead or in addition to?
    const closestWaypoint = waypoint[0].toString();
    const {
      data: {
        nav: {
          route: { departureTime, arrival },
        },
      },
    } = await fleet.navigateShip(sendShip, {
      waypointSymbol: closestWaypoint,
    });
    // TODO how to extract arrive tile
    // const navCooldown = parseTime(arrival - departureTime)
    const navCooldown = 120;
    await wait(navCooldown);

    // once buying ship arrives, buy the new ship
    const purchasedShip = await fleet.purchaseShip({
      waypointSymbol: closestWaypoint,
      shipType,
    });

    // be sure to store the newly acquired ship
    // but response from purchaseShip is different than plain ole ship I think
    // addShiptoDb(purchasedShip);

    // useful to have ship as return value?
    return purchasedShip;
  }
}

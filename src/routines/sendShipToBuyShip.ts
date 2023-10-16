import { addShiptoDb } from "../db/fleet/addShipToDb";
import { getShipFromDb } from "../db/fleet/getShipsFromDb";
import { findWaypointWithOptions } from "./findWaypointWithOptions";

type SendSendToBuyShipProps = {
  waypointSymbol?: string;
  sendShip: string;
  buyShip: string;
};

export async function sendSendToBuyShip({
  waypointSymbol,
  sendShip,
  buyShip,
}: SendSendToBuyShipProps) {
  // extract system from waypointSymbol
  //    const system = props.waypointSymbol?.split()
  const system = "X1-CS80";

  const waypoint =
    waypointSymbol ||
    findWaypointWithOptions({
      type: "PLANET",
      system,
      traitSymbol: "SHIPYARD",
    });

  const {
    waypointSymbol: currentLocation,
    navStatus,
    cooldown,
  } = await getShipFromDb({
    symbol: buyShip,
  });

  //   if ship is present at purchase location and has no cooldown buy the damn ship
  if (currentLocation === waypoint) {
    if (cooldown > 0) {
      await sleep(cooldown);
    }

    const purchasedShip = await fleet.purchaseShip({
      buyer: sendShip,
      shipType: buyShip,
    });
    return purchasedShip;
  }

  //   if ship isn't already at location
  if (currentLocation != waypoint || cooldown > 0) {
    // if cooldown, wait for cooldown
    if (cooldown > 0) {
      await sleep(cooldown);
    }
    // if docked per db model, orbit ship
    if (navStatus === "DOCKED") {
      await fleet.orbitShip(buyShip);
    }

    // wait until the ship has travelled to it's desination
    // may want to set the cd on the db model instead or in addition to?
    const { cooldown } = await fleet.navShip({
      shipSymbol: buyShip,
      goTo: waypointSymbol,
    });
    await sleep(cooldown);

    // once buying ship arrives, buy the new ship
    const purchasedShip = await fleet.purchaseShip({
      buyer: sendShip,
      shipType: buyShip,
    });

    // be sure to store the newly acquired ship
    addShiptoDb(purchasedShip);

    // useful to have ship as return value?
    return purchasedShip;
  }
}

import { addShipToDb } from "../db/fleet/create";
import { getShipFromDb } from "../db/fleet/read";
import { FleetApi, ShipType } from "spacetraders-fetch-api";
import { wait } from "../utils/wait";
import { getDelta } from "../utils/getDelta";
import { config } from "../utils/config";

const fleet = new FleetApi(config);

type SendSendToBuyShipProps = {
  waypointSymbol: string;
  sendShip: string;
  shipType: ShipType;
};

export async function sendSendToBuyShip({
  waypointSymbol,
  sendShip,
  shipType,
}: SendSendToBuyShipProps) {
  const {
    waypointSymbol: currentLocation,
    navStatus,
    cooldown,
  } = await getShipFromDb({
    symbol: sendShip,
  });

  //   if ship is present at purchase location and has no cooldown buy the damn ship
  if (currentLocation === waypointSymbol) {
    if (cooldown > 0) {
      await wait(cooldown);
    }

    // once buying ship arrives, buy the new ship
    const {
      data: { ship },
    } = await fleet.purchaseShip({
      waypointSymbol,
      shipType,
    });
    addShipToDb(ship);

    return ship;
  }

  //   if ship is not at a either the designated waypointSymbol or the closest with a shipyard
  if (currentLocation != waypointSymbol) {
    if (cooldown > 0) {
      await wait(cooldown);
    }

    if (navStatus === "DOCKED") {
      await fleet.orbitShip(sendShip);
    }

    const {
      data: {
        nav: {
          route: { departureTime, arrival },
        },
      },
    } = await fleet.navigateShip(sendShip, {
      waypointSymbol,
    });

    const navCooldown =
      getDelta({
        mode: "date",
        input1: arrival,
        input2: departureTime,
      }) || 0;

    await wait(navCooldown);

    // once buying ship arrives, buy the new ship
    const {
      data: { ship },
    } = await fleet.purchaseShip({
      waypointSymbol,
      shipType,
    });

    addShipToDb(ship);

    return ship;
  }
}

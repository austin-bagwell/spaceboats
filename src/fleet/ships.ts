import { config } from "../utils/config";
import {
  FleetApi,
  NavigateShipRequest,
  PurchaseShipRequest,
  SellCargoRequest,
  SellCargo201ResponseData,
} from "@spacejunk/airlock";

export const fleet = new FleetApi(config);

export async function myShips() {
  try {
    const ships = (await fleet.getMyShips()).data;
    return ships;
  } catch (err) {
    return err;
  }
}

export async function sellOneGood(
  ship: string,
  cargo: SellCargoRequest
): Promise<SellCargo201ResponseData> {
  const sale = (await fleet.sellCargo(ship, cargo)).data;
  return sale;
}

export async function sellAllGoods(ship: string) {
  const { inventory } = (await fleet.getMyShipCargo(ship)).data;

  for (let item of inventory) {
    const { symbol, units } = item;
    const sale = await sellOneGood(ship, { symbol, units });
    console.log(
      `sold ${sale.transaction.units} ${sale.transaction.tradeSymbol} for ${sale.transaction.totalPrice} credits`
    );
  }

  return 0;
}

export async function getShipCargoHold(ship: string) {
  const cargo = (await fleet.getMyShipCargo(ship)).data;
  return cargo;
}

export async function dockShip(ship: string) {
  const res = (await fleet.dockShip(ship)).data;
  return res;
}

export async function refuelShip(ship: string) {
  const res = (await fleet.refuelShip(ship)).data;
  return res;
}

export async function orbitShip(ship: string) {
  const res = (await fleet.orbitShip(ship)).data;
  return res;
}

export async function extractResources(ship: string) {
  const res = (await fleet.extractResources(ship)).data;
  return res;
}

export async function purchaseMiningDrone(waypoint: string) {
  const request: PurchaseShipRequest = {
    shipType: "SHIP_MINING_DRONE",
    waypointSymbol: waypoint,
  };
  const res = (await fleet.purchaseShip(request)).data;
  return res;
}

export async function getShipLocation(shipSymbol: string) {
  const ship = await fleet.getMyShip(shipSymbol);
  console.log(
    `ship ${shipSymbol} is at waypoint: ${ship.data.nav.waypointSymbol}`
  );
  console.log(ship);
}

export async function getShipStatusReport(shipSymbol: string): Promise<string> {
  const ship = (await fleet.getMyShip(shipSymbol)).data;

  const {
    symbol,
    registration: { role },
    nav: { waypointSymbol, status },
    cargo: { capacity: cargoCapacity, units },
    fuel: { current, capacity: fuelCapacity },
  } = ship;

  const transitStatus = status === "IN_TRANSIT" ? "to" : "at";
  const shipStatus = `ship ${symbol} (${role})
==> ${status} ${transitStatus} waypoint: ${waypointSymbol}
==> cargo: ${units} units of ${cargoCapacity}
==> fuel: ${current} units of ${fuelCapacity}
  `;
  return shipStatus;
}

export async function navigateShip(
  shipSymbol: string,
  waypointSymbol: NavigateShipRequest
) {
  try {
    const res = (await fleet.navigateShip(shipSymbol, waypointSymbol)).data;
    return res;
  } catch (err) {
    console.log("ya goofed. status:  ");
    console.log(err);
  }
}

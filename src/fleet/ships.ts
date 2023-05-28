import { config } from "../config";
import {
  FleetApi,
  NavigateShipRequest,
  PurchaseShipRequest,
} from "@spacejunk/airlock";

const fleet = new FleetApi(config);

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

export async function myShips() {
  fleet
    .getMyShips()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export async function getShipLocation(shipSymbol: string) {
  const ship = await fleet.getMyShip(shipSymbol);
  console.log(
    `ship ${shipSymbol} is at waypoint: ${ship.data.nav.waypointSymbol}`
  );
  console.log(ship);
}

export async function getShipStatusReport(shipSymbol: string) {
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
    console.log(err.response.status);
  }
}

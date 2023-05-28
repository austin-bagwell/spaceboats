import { config } from "../config";
import { FleetApi, NavigateShipRequest } from "@spacejunk/airlock";

const fleet = new FleetApi(config);

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
    nav: { waypointSymbol, status },
    cargo: { capacity: cargoCapacity, units },
    fuel: { current, capacity: fuelCapacity },
  } = ship;

  const shipStatus = `ship ${symbol} 
${status} at waypoint: ${waypointSymbol}
cargo: ${units} units of ${cargoCapacity}
fuel: ${current} units of ${fuelCapacity}
  `;
  return shipStatus;
}

export async function navigateShip(
  shipSymbol: string,
  destination: NavigateShipRequest
) {
  try {
    await fleet.navigateShip(shipSymbol, destination);
  } catch (err) {
    console.log("ya goofed. status:  ");
    console.log(err.response.status);
  }
}

export async function testNav() {
  const frigateSymbol = "JITSUJAMMER-1";
  const shipyardWaypoint: NavigateShipRequest = {
    waypointSymbol: "X1-VS75-97637F",
  };

  const request = {
    shipSymbol: frigateSymbol,
    navigateShipRequest: shipyardWaypoint,
  };

  fleet
    .navigateShipRaw(request)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

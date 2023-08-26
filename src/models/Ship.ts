import {
  FleetApi,
  InitOverrideFunction,
  NavigateShip200Response,
  NavigateShipRequest,
  ShipFuel,
} from "@spacejunk/airlock";
import { config } from "../utils/config";

class BaseShip extends FleetApi {
  symbol: string;
  navStatus: string;
  cooldown: number;
  fuel: ShipFuel;

  // nav status? inTransit, etc.
  // docked status?
  // fuel tank?
  // cargo details?

  // when a new ship is bought, what is returned?
  // could possible pass in cargo, fuel, etc. from the buyShip() response into the constructor
  // if that is an option
  // that way the ship is intantiated with the correct basic details
  // looks like spacejunk has a Ship interface that is the 201 purchase response from purchaseShip
  // thats probaby the ticket right there
  constructor(symbol: string) {
    super(config);
    this.symbol = symbol;
    this.cooldown = 0;
    this.navStatus = "";
    this.fuel = {
      capacity: 0,
      current: 0,
      consumed: { amount: 0, timestamp: "" },
    };
  }

  async getStatus() {
    const status = await this.getMyShip(this.symbol);
    console.log("getStatus called from BaseShip class");
    // it does make sense to update all relevant ship details
    // when I'm checking it's status, right?
    // so then...do I return the API response, or the values stored on the instance?
    // could provide args for specific things
    // getStatus(['fuel', 'cargo']) returns just that
    // no args returns all available data?
    if (status.data) {
      const { nav, cargo, fuel } = status.data;
      this.navStatus = nav.status;
      this.fuel = fuel;
    }
    return status;
  }

  async dock() {
    await super.dockShip(this.symbol);
  }

  async orbit() {
    await super.orbitShip(this.symbol);
  }

  async refuel() {
    await super.refuelShip(this.symbol);
  }

  async navigateTo(waypoint: NavigateShipRequest) {
    const res = await this.navigateShip(this.symbol, waypoint);
    console.log(res);
    // if res.data
    // update nav status
    // update fuel
    // uhhhh transit time?
  }
}

export { BaseShip };

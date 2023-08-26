import {
  FleetApi,
  InitOverrideFunction,
  NavigateShip200Response,
  NavigateShipRequest,
} from "@spacejunk/airlock";
import { config } from "../utils/config";

class BaseShip extends FleetApi {
  symbol: string;
  cooldown: number;

  constructor(symbol: string) {
    super(config);
    this.symbol = symbol;
    this.cooldown = 0;
  }

  async getStatus() {
    const status = await this.getMyShip(this.symbol);
    return status;
  }

  async dock() {
    await this.dockShip(this.symbol);
  }

  async orbit() {
    await this.orbitShip(this.symbol);
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

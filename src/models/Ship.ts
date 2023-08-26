import { FleetApi } from "@spacejunk/airlock";
import { config } from "../utils/config";

class BaseShip extends FleetApi {
  cooldown: number;
  symbol: string;

  constructor(symbol: string) {
    super(config);
    this.symbol = symbol;
    this.cooldown = 0;
  }

  async getStatus() {
    const res = await this.getMyShip(this.symbol);
    console.log(res);
  }

  async dock() {
    await this.dockShip(this.symbol);
  }

  async orbit() {
    await this.orbitShip(this.symbol);
  }
}

export { BaseShip };

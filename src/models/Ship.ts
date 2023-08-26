import { FleetApi } from "@spacejunk/airlock";
import { config } from "../utils/config";

class AustinShip extends FleetApi {
  nickname: string;
  cooldown: number;
  symbol: string;

  constructor(nickname: string, symbol: string) {
    super(config);
    this.symbol = symbol;
    this.nickname = nickname;
    this.cooldown = 0;
  }

  sayNickname() {
    console.log(`I'm a ship! my nickname is ${this.nickname}`);
  }

  async getStatus() {
    const res = await this.getMyShip(this.symbol);
    console.log(res);
  }
}

export { AustinShip };

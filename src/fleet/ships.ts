import { config } from "../config";
import { FleetApi } from "@spacejunk/airlock";

const fleet = new FleetApi(config);

export function myShips() {
  fleet
    .getMyShips()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

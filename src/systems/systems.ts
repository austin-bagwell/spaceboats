import { config } from "../config";
import { SystemsApi } from "@spacejunk/airlock";

const systems = new SystemsApi(config);

export function getVisibleSystems() {
  systems
    .getSystems()
    .then((res) => console.table(res.data))
    .catch((err) => console.log(err));
}

import * as dotenv from "dotenv";
dotenv.config();
import { Configuration } from "@spacejunk/airlock";
import { FleetApi } from "@spacejunk/airlock";

const token = process.env.TOKEN;
const config = new Configuration({
  accessToken: token,
});

const fleet = new FleetApi(config);

fleet
  .getMyShips()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

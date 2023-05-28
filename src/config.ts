import { Configuration } from "@spacejunk/airlock";
const token = process.env.TOKEN;

export const config = new Configuration({
  accessToken: token,
});

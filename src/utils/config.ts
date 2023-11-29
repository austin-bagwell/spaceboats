import { Configuration } from "spacetraders-fetch-api";
const token = process.env.TOKEN;

export const config = new Configuration({
  accessToken: token,
});

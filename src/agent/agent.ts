import { config } from "../utils/config";
import {
  AgentsApi,
  GetMyAgent200Response,
  GetMyAgent200ResponseToJSON,
} from "@spacejunk/airlock";

const agent = new AgentsApi(config);

export async function getMyAgent(): Promise<GetMyAgent200Response> {
  const data = await agent.getMyAgent();
  return data;
}

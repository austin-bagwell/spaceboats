import * as fs from "fs/promises";

interface EnvironmentVariable {
  key: string;
  value: string;
}

async function getEnvironmentVariables(): Promise<Array<EnvironmentVariable>> {
  const path = "/Users/austin/projects/spaceboats/.env";
  const envFile = await fs.readFile(path, {
    encoding: "utf8",
  });
  const variables = envFile.split("\n").map((variable) => {
    const [key, value] = variable.split("=");
    return { key, value };
  });
  return variables;
}

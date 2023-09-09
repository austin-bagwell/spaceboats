import * as fs from "fs";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    symbol: "SPACEBOATS",
    faction: "COSMIC",
  }),
};

fetch("https://api.spacetraders.io/v2/register", options)
  .then((response) => response.json())
  .then((response) => {
    const token = response.data.token;
    if (token) {
      console.log(`new token:`);
      console.log(`${token}`);
      updateApiToken(`"${token}"`);
    } else {
      console.log(`couldn't update token`);
      console.log(response);
    }
  })
  .catch((err) => console.error(err));

interface EnvironmentVariable {
  key: string;
  value: string;
}

// boy howdy this is kinda ugly
function updateApiToken(token: string): void {
  const path = "/Users/austin/projects/spaceboats/.env";

  const envFile = fs.readFileSync(path, {
    encoding: "utf8",
  });

  const environment: Array<EnvironmentVariable> = envFile
    .split("\n")
    .map((variable) => {
      const [key, value] = variable.split("=");
      return { key, value };
    });

  // TODO
  // why yes this is me assuming the token will always be [0]
  // i'll fix handling for multiple variables later
  // like after i set up a db connect etc.
  const apiToken = environment[0];

  Object.assign(apiToken, { key: "TOKEN", value: token });
  environment[0] = apiToken;

  fs.writeFileSync(path, convertToString(environment));
}

function convertToString(environmentVariables: Array<EnvironmentVariable>) {
  const string = environmentVariables.map(
    (variable) => `${variable.key}=${variable.value.toString()}`
  );
  return string.join("\n");
}

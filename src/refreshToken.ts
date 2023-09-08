import * as fs from "fs";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    symbol: "JITSUJAMMER",
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
      updateApiToken(token);
    } else {
      console.log(`couldn't update token`);
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

  const environment = envFile.split("\n").map((variable) => {
    const [key, value] = variable.split("=");
    return { key, value };
  });

  // TODO
  // why yes this is me assuming the token will always be [0]
  // i'll fix handling for multiple variables later
  // like after i set up a db connect etc.
  const environmentToken = environment[0];

  Object.assign(environmentToken, { key: "TOKEN", value: token });

  function convertToString(environmentVar: EnvironmentVariable) {
    return `${environmentVar.key}="${environmentVar.value.toString()}"`;
  }

  fs.writeFileSync(path, convertToString(environmentToken));
}

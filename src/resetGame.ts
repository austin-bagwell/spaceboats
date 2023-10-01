import { updateApiToken } from "./refreshToken";
import { removeAllShips } from "./db/removeAllShips";
import { addStarterShipsToDb } from "./db/addStarterShipsToDb";
import { createInterface } from "node:readline/promises";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function confirmReset() {
  const userInput = await rl.question(
    `Enter 'y' to confirm reset or 'n' to cancel: `
  );
  const res = userInput.trim().toUpperCase();

  if (res === "Y" || res === "YES") {
    console.log("Gonna reset your shit now...\n");
    resetGame();
    rl.close();
  } else if (res === "N" || res === "NO") {
    console.log(
      "Okay, I get it.\nYou thought you wanted to reset your game, but you were wrong.\nI'm not mad, I'm just disappointed."
    );
    rl.close();
  } else {
    console.log('Invalid input. Please enter "y" or "n".');
    confirmReset();
  }
}

async function resetGame() {
  console.log(
    `reseting the game will update the API token and remove any existing ships from the database`
  );
  console.log(`Agent symbol defaults to JITSUJAMMER for now because I'm lazy.`);
  try {
    await updateApiToken({ symbol: "JITSUJAMMER" });
    await removeAllShips();
    await addStarterShipsToDb();
  } catch (err) {
    console.log(err);
  }
}

confirmReset();

import { updateApiToken } from "./refreshToken";
import { removeAllShips } from "./db/removeAllShips";
import { addStarterShipsToDb } from "./db/addStarterShipsToDb";

async function resetGame() {
  console.log(
    `reseting the game will update the API token and remove any existing ships from the database`
  );

  try {
    await updateApiToken();
    await removeAllShips();
    await addStarterShipsToDb();
  } catch (err) {
    console.log(err);
  }
}

resetGame();

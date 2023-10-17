import * as dotenv from "dotenv";
dotenv.config();

import { startGame } from "./cli/startGame";
import { findWaypointWithOptions } from "./routines/findWaypointWithOptions";
import { sendSendToBuyShip } from "./routines/sendShipToBuyShip";
import { getShipsFromDb } from "./db/fleet/getShipsFromDb";
import { addStarterShipsToDb } from "./db/fleet/addStarterShipsToDb";
// startGame();
// findWaypointWithOptions({
//   type: "ORBITAL_STATION",
//   //   traitSymbol: "SHIPYARD",
//   system: "X1-CS80",
// })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

/*
Purchased a ship with JAMMER-2, which was already at the shipyard. Wasn't working for my other ship at a different waypoint. Travel to mechanic seems to be broken.
Need to write a way to get a PuchaseShip201 ship into the database as a part of this routine
{
  data: {
    agent: {
      accountId: 'clnrmlhic3xtws60cqejsplqr',
      symbol: 'JITSUJAMMER',
      headquarters: 'X1-CS80-80120F',
      credits: 64651,
      startingFaction: 'COSMIC'
    },
    ship: {
      symbol: 'JITSUJAMMER-3',
      registration: [Object],
      nav: [Object],
      crew: [Object],
      frame: [Object],
      reactor: [Object],
      engine: [Object],
      modules: [Array],
      mounts: [Array],
      cargo: [Object],
      fuel: [Object]
    },
    transaction: {
      waypointSymbol: 'X1-CS80-57647D',
      shipSymbol: 'SHIP_MINING_DRONE',
      price: 85349,
      agentSymbol: 'JITSUJAMMER',
      timestamp: '2023-10-17T00:22:19.003Z'
    }
  }
}
*/

sendSendToBuyShip({
  waypointSymbol: "X1-CS80-57647D",
  sendShip: "JITSUJAMMER-2",
  shipType: "SHIP_MINING_DRONE",
})
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
    console.log(err.response);
  });

// addStarterShipsToDb()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// getShipsFromDb()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

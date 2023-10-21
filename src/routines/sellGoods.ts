import { prisma } from "../db/prismaClient";
import {
  FleetApi,
  MarketTransaction,
  SellCargo201ResponseData,
} from "@spacejunk/airlock";
import { config } from "../utils/config";
import { SellCargoRequest } from "@spacejunk/airlock";
import { AssertionError } from "assert";

const fleet = new FleetApi(config);

// TODO
// put MarketTransaction into db
async function sellGood(
  shipSymbol: string,
  cargo: SellCargoRequest
): Promise<SellCargo201ResponseData> {
  const { data } = await fleet.sellCargo(shipSymbol, cargo);

  if (!data) {
    throw new Error(`${shipSymbol} could sell cargo ${cargo}`);
  }

  await prisma.ship.update({
    where: {
      symbol: shipSymbol,
    },
    data: {
      cargoCurrent: data.cargo.units,
    },
  });

  return data;
}

async function sellAllGoods(shipSymbol: string): Promise<MarketTransaction[]> {
  const { data } = await fleet.getMyShipCargo(shipSymbol);

  const saleRecord: MarketTransaction[] = [];
  for (let item of data.inventory) {
    const { symbol, units } = item;

    try {
      const { data } = await fleet.sellCargo(shipSymbol, { symbol, units });
      saleRecord.push(data.transaction);
    } catch (err: any) {
      console.log(err);
    }
  }

  try {
    await prisma.ship.update({
      where: {
        symbol: shipSymbol,
      },
      data: {
        cargoCurrent: 0,
      },
    });
  } catch (err: any) {
    console.log(err);
  }

  //   TODO - add sales records to db
  return saleRecord;
}

export { sellGood, sellAllGoods };

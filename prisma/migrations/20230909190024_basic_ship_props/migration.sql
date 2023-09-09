-- CreateTable
CREATE TABLE "ship" (
    "pk" SERIAL NOT NULL,
    "shipSymbol" TEXT NOT NULL,
    "systemSymbol" TEXT NOT NULL,
    "waypointSymbol" TEXT NOT NULL,
    "navStatus" TEXT NOT NULL,
    "fuelCurrent" INTEGER NOT NULL,
    "fuelCapacity" INTEGER NOT NULL,
    "cargoCapacity" INTEGER NOT NULL,
    "cargoOnboard" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ship_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "ship_shipSymbol_key" ON "ship"("shipSymbol");

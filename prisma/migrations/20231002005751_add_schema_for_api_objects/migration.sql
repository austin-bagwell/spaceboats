/*
  Warnings:

  - You are about to drop the `ship` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ShipType" AS ENUM ('SHIP_PROBE', 'SHIP_MINING_DRONE', 'SHIP_INTERCEPTOR', 'SHIP_LIGHT_HAULER', 'SHIP_COMMAND_FRIGATE', 'SHIP_EXPLORER', 'SHIP_HEAVY_FREIGHTER', 'SHIP_LIGHT_SHUTTLE', 'SHIP_ORE_HOUND', 'SHIP_REFINING_FREIGHTER');

-- CreateEnum
CREATE TYPE "ShipFrame" AS ENUM ('FRAME_PROBE', 'FRAME_DRONE', 'FRAME_INTERCEPTOR', 'FRAME_RACER', 'FRAME_FIGHTER', 'FRAME_FRIGATE', 'FRAME_SHUTTLE', 'FRAME_EXPLORER', 'FRAME_MINER', 'FRAME_LIGHT_FREIGHTER', 'FRAME_HEAVY_FREIGHTER', 'FRAME_TRANSPORT', 'FRAME_DESTROYER', 'FRAME_CRUISER', 'FRAME_CARRIER');

-- CreateEnum
CREATE TYPE "SystemType" AS ENUM ('NEUTRON_STAR', 'RED_STAR', 'ORANGE_STAR', 'BLUE_STAR', 'YOUNG_STAR', 'WHITE_DWARF', 'BLACK_HOLE', 'HYPERGIANT', 'NEBULA', 'UNSTABLE');

-- CreateEnum
CREATE TYPE "WaypointType" AS ENUM ('PLANET', 'GAS_GIANT', 'MOON', 'ORBITAL_STATION', 'JUMP_GATE', 'ASTEROID_FIELD', 'NEBULA', 'DEBRIS_FIELD', 'GRAVITY_WELL');

-- CreateEnum
CREATE TYPE "FactionType" AS ENUM ('COSMIC', 'VOID', 'GALACTIC', 'QUANTUM', 'DOMINION', 'ASTRO', 'CORSAIRS', 'OBSIDIAN', 'AEGIS', 'UNITED', 'SOLITARY', 'COBALT', 'OMEGA', 'ECHO', 'LORDS', 'CULT', 'ANCIENTS', 'SHADOW', 'ETHEREAL');

-- DropTable
DROP TABLE "ship";

-- CreateTable
CREATE TABLE "Ship" (
    "pk" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "systemSymbol" TEXT NOT NULL,
    "waypointSymbol" TEXT NOT NULL,
    "navStatus" TEXT NOT NULL,
    "fuelCurrent" INTEGER NOT NULL,
    "fuelCapacity" INTEGER NOT NULL,
    "cargoCapacity" INTEGER NOT NULL,
    "cargoCurrent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "System" (
    "pk" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "type" "SystemType" NOT NULL,
    "sectorSymbol" TEXT NOT NULL,
    "xCoord" INTEGER NOT NULL,
    "yCoord" INTEGER NOT NULL,
    "jumpGatePk" INTEGER,

    CONSTRAINT "System_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Waypoint" (
    "pk" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "type" "WaypointType" NOT NULL,
    "xCoord" INTEGER NOT NULL,
    "yCoord" INTEGER NOT NULL,
    "orbits" TEXT,
    "systemPk" INTEGER,
    "factionPk" INTEGER NOT NULL,

    CONSTRAINT "Waypoint_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Shipyard" (
    "pk" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "modificationsFee" INTEGER NOT NULL,

    CONSTRAINT "Shipyard_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "JumpGate" (
    "pk" SERIAL NOT NULL,
    "jumpRange" INTEGER NOT NULL,
    "factionSymbol" "FactionType" NOT NULL,

    CONSTRAINT "JumpGate_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Chart" (
    "pk" SERIAL NOT NULL,
    "waypointSymbol" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "submittedOn" TIMESTAMP(3) NOT NULL,
    "waypointPk" INTEGER NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Faction" (
    "pk" SERIAL NOT NULL,
    "symbol" "FactionType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "headquarters" TEXT NOT NULL,
    "isRecruiting" BOOLEAN NOT NULL,
    "systemPk" INTEGER,

    CONSTRAINT "Faction_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "Trait" (
    "pk" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factionPk" INTEGER,
    "waypointPk" INTEGER,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ship_symbol_key" ON "Ship"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "System_symbol_key" ON "System"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Waypoint_symbol_key" ON "Waypoint"("symbol");

-- AddForeignKey
ALTER TABLE "System" ADD CONSTRAINT "System_jumpGatePk_fkey" FOREIGN KEY ("jumpGatePk") REFERENCES "JumpGate"("pk") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waypoint" ADD CONSTRAINT "Waypoint_systemPk_fkey" FOREIGN KEY ("systemPk") REFERENCES "System"("pk") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waypoint" ADD CONSTRAINT "Waypoint_factionPk_fkey" FOREIGN KEY ("factionPk") REFERENCES "Faction"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_waypointPk_fkey" FOREIGN KEY ("waypointPk") REFERENCES "Waypoint"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faction" ADD CONSTRAINT "Faction_systemPk_fkey" FOREIGN KEY ("systemPk") REFERENCES "System"("pk") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_factionPk_fkey" FOREIGN KEY ("factionPk") REFERENCES "Faction"("pk") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_waypointPk_fkey" FOREIGN KEY ("waypointPk") REFERENCES "Waypoint"("pk") ON DELETE SET NULL ON UPDATE CASCADE;
